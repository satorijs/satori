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

  public hasLatest = false
  public hasEarliest = false

  private _initTask?: Promise<void>

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
      if (this._spans[mid].back[0] <= sid) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }

  insert(data: Message[], links: Span.PrevNext<Span> = {}, forced: Span.PrevNext<boolean> = {}) {
    if (!data.length && !links.prev && !links.next) {
      throw new Error('unexpected empty span')
    }
    const back: Span.Endpoint = [data[0].sid, data[0].id]
    const front: Span.Endpoint = [data[data.length - 1].sid, data[data.length - 1].id]
    const span = new Span(this, Span.Type.LOCAL, front, back, data)
    const index = this.binarySearch(back[0])
    this._spans.splice(index, 0, span)
    span.link('before', links.prev)
    span.merge('before')
    span.link('after', links.next)
    span.merge('after')
    span.flush(forced)
    return span
  }

  async queue(session: Session) {
    const prev = this.hasLatest ? this._spans[0] : undefined
    const message = Message.from(session.event.message!, session.platform, 'after', prev?.front[0])
    this.hasLatest = true
    this.insert([message], { prev }, { prev: true, next: true })
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
      const { sid } = data[0]
      const span = this._spans[this.binarySearch(sid)]
      if (!span || span.back[0] > sid || span.front[0] < sid) throw new Error('malformed sync span')
      return [span, data[0]]
    }

    // condition 3: message not cached, request from adapter
    let span: Span
    let message: MessageLike
    let exclusive = false
    let index: number
    // TODO handle special case
    // 1. data length = 0
    // 2. next undefined (final)
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
      span = this.insert(data, { prev, next })
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

  private async getHistory(span: Span, message: MessageLike, limit: number, dir: Span.Direction) {
    const buffer: Message[] = []
    const w = Span.words[dir]

    while (true) {
      if (span.data) {
        const index = span.data.findIndex(item => item.sid === message.sid)
        if (dir === 'before') {
          buffer.unshift(...span.data.slice(0, index + 1))
        } else {
          buffer.push(...span.data.slice(index))
        }
      } else if ('id' in message && span[w.front][0] === message.sid) {
        buffer[w.push](message)
      } else {
        const before = await this.ctx.database
          .select('satori.message')
          .where({
            ...this._query,
            sid: {
              [w.$gte]: message.sid,
              [w.$lte]: span[w.front][0],
            },
          })
          .orderBy('sid', w.order)
          .limit(limit - buffer.length)
          .execute()
        if (dir === 'before') before.reverse()
        buffer[w.push](...before)
      }
      if (buffer.length >= limit) break

      const next = span[w.next] ?? await (span[`${w.next}Task`] ??= span.extend(dir, limit - buffer.length))

      if (!next) break
      span = next
      message = { sid: span[w.back][0] }
    }

    if (dir === 'before') {
      return buffer.slice(-limit)
    } else {
      return buffer.slice(0, limit)
    }
  }
}
