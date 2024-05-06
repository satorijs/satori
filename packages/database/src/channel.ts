import { Bot, Context, Logger, Session, Universal } from '@satorijs/satori'
import { Message } from './types'
import { Span } from './span'

const logger = new Logger('sync')

export enum SyncStatus {
  INIT,
  READY,
  FAILED,
}

type MessageLike = Message | { sid: bigint }

export class SyncChannel {
  public _spans: Span[] = []
  public _query: { platform: string; 'channel.id': string }

  private _initTask?: Promise<void>
  private _hasLatest = false

  constructor(public ctx: Context, public bot: Bot, public guildId: string, public channelId: string) {
    this._query = { platform: bot.platform, 'channel.id': channelId }
  }

  private async init() {
    logger.debug('init channel %s %s %s', this.bot.platform, this.guildId, this.channelId)
    const data = await this.ctx.database
      .select('satori.message')
      .where({
        ...this._query,
        flag: { $bitsAnySet: Message.Flag.FRONT | Message.Flag.BACK },
      })
      .orderBy('sid', 'asc')
      .project(['id', 'sid', 'flag'])
      .execute()
    while (data.length) {
      const { flag, id: frontId, sid: frontUid } = data.pop()!
      const front: Span.Endpoint = [frontUid, frontId]
      if (!(flag & Message.Flag.FRONT)) {
        throw new Error('malformed sync flag')
      } else if (flag & Message.Flag.BACK) {
        this._spans.push(new Span(this, Span.Type.REMOTE, front, front))
      } else {
        const { flag, id, sid } = data.pop()!
        if (flag & Message.Flag.BACK) {
          this._spans.push(new Span(this, Span.Type.REMOTE, front, [sid, id]))
        } else {
          throw new Error('malformed sync flag')
        }
      }
    }
  }

  private binarySearch(sid: bigint) {
    let left = 0
    let right = this._spans.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (this._spans[mid].front[0] < sid) {
        right = mid
      } else {
        left = mid
      }
    }
    return left
  }

  private insert(data: Message[], index?: number) {
    const back: Span.Endpoint = [data[0].sid, data[0].id]
    const front: Span.Endpoint = [data[data.length - 1].sid, data[data.length - 1].id]
    const span = new Span(this, Span.Type.LOCAL, front, back, data)
    if (typeof index !== 'number') {
      index = this.binarySearch(front[0])
    }
    this._spans.splice(index, 0, span)
    return span
  }

  async queue(session: Session) {
    const prev = this._hasLatest ? this._spans[0] : undefined
    const message = Message.from(session.event.message!, session.platform, 'after', prev?.front[0])
    const span = this.insert([message], 0)
    span.link('prev', prev)
    this._hasLatest = true
    span.flush()
  }

  // TODO handle default limit
  async getMessageList(id: string, direction: Universal.Direction, limit: number) {
    await (this._initTask ||= this.init())
    const [span, message, exclusive] = await this.locate(id, direction, limit)
    if (direction === 'around') limit = Math.floor(limit / 2)
    if (!exclusive) limit++
    const beforeTask = direction === 'after' ? Promise.resolve([]) : this.getHistory(span!, message, limit, 'before')
    const afterTask = direction === 'before' ? Promise.resolve([]) : this.getHistory(span!, message, limit, 'after')
    const [before, after] = await Promise.all([beforeTask, afterTask])
    if (!exclusive) after.shift()
    if (!exclusive) before.shift()
    if (direction === 'after') return after
    if (direction === 'before') return before
    return [...before, message, ...after]
  }

  private async locate(id: string, direction: Universal.Direction, limit?: number): Promise<[Span, MessageLike, boolean?]> {
    // condition 1: message in memory
    for (const span of this._spans) {
      const message = span.data?.find(message => message.id === id)
      if (message) return [span, message]
    }

    // condition 2: message in database
    const data = await this.ctx.database
      .select('satori.message')
      .where({ ...this._query, id })
      .execute()
    if (data[0]) {
      const span = this._spans.find(span => span.front[0] <= data[0].sid && data[0].sid <= span.back[0])
      if (!span) throw new Error('malformed sync span')
      return [span, data[0]]
    }

    // condition 3: message not cached, request from adapter
    let span: Span
    let message: MessageLike
    let exclusive = false
    let index: number
    // TODO handle special case
    // 1. data length = 0
    // 2. next undefined
    const result = await this.bot.getMessageList(this.channelId, id, direction, limit, 'asc')
    if (direction === 'around') {
      index = result.data.findIndex(item => item.id === id)
      if (index === -1) throw new Error('malformed message list')
      message = Message.from(result.data[index], this.bot.platform)
      data.push(message as Message)
    } else {
      exclusive = true
      index = direction === 'before' ? result.data.length : -1
    }

    let prev: Span | undefined
    for (let i = index - 1; i >= 0; i--) {
      prev = this._spans.find(span => span.front[1] === result.data[i].id)
      if (prev) break
      // @ts-ignore
      data.unshift(Message.from(result.data[i], this.bot.platform, 'before', data[0]?.sid))
    }

    let next: Span | undefined
    for (let i = index + 1; i < result.data.length; i++) {
      next = this._spans.find(span => span.back[1] === result.data[i].id)
      if (next) break
      data.push(Message.from(result.data[i], this.bot.platform, 'after', data[data.length - 1]?.sid))
    }

    if (data.length) {
      span = this.insert(data)
      span.prev = prev
      if (span.prev) span.prev.next = span
      span.next = next
      if (span.next) span.next.prev = span
    } else {
      span = prev ?? next!
    }

    if (direction === 'before') {
      message = { sid: span.front[0] }
    } else if (direction === 'after') {
      message = { sid: span.back[0] }
    }

    return [span, message!, exclusive]
  }

  private async getHistory(span: Span, message: MessageLike, limit: number, direction: 'before' | 'after') {
    const buffer: Message[] = []
    const dir = ({
      before: {
        front: 'back',
        back: 'front',
        prev: 'next',
        next: 'prev',
        asc: 'desc',
        push: 'unshift',
        $lte: '$gte',
        $gte: '$lte',
      },
      after: {
        front: 'front',
        back: 'back',
        prev: 'prev',
        next: 'next',
        asc: 'asc',
        push: 'push',
        $lte: '$lte',
        $gte: '$gte',
      },
    } as const)[direction]

    while (true) {
      if (span.data) {
        const index = span.data.findIndex(item => item.sid === message.sid)
        if (direction === 'before') {
          buffer.unshift(...span.data.slice(0, index + 1))
        } else {
          buffer.push(...span.data.slice(index))
        }
      } else if ('id' in message && span[dir.front][0] === message.sid) {
        buffer[dir.push](message)
      } else {
        const before = await this.ctx.database
          .select('satori.message')
          .where({
            ...this._query,
            sid: {
              [dir.$gte]: message.sid,
              [dir.$lte]: span[dir.front][0],
            },
          })
          .orderBy('sid', dir.asc)
          .limit(limit - buffer.length)
          .execute()
        if (direction === 'before') before.reverse()
        buffer[dir.push](...before)
      }
      if (buffer.length >= limit) break

      span[dir.next] ??= await (span[`${dir.next}Task`] ??= (async (prev: Span) => {
        const data: Message[] = []
        const result = await this.bot.getMessageList(this.channelId, prev[dir.front][1], direction, limit - buffer.length, dir.asc)
        let next: Span | undefined, last: Message | undefined
        for (const item of result.data) {
          next = this._spans.find(span => span[dir.back][1] === item.id)
          if (next) break
          last = Message.from(item, this.bot.platform, direction, last?.sid)
          data[dir.push](last)
        }
        if (data.length) {
          // TODO sync new span
          const span = this.insert(data)
          span.link(dir.prev, prev)
          span.link(dir.next, next)
          return span
        } else {
          // FIXME sync edge case?
          return next!
        }
      })(span))

      if (!span[dir.next]) break
      span = span[dir.next]!
      message = { sid: span[dir.back][0] }
    }

    if (direction === 'before') {
      return buffer.slice(-limit)
    } else {
      return buffer.slice(0, limit)
    }
  }
}
