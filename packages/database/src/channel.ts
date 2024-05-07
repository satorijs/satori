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

type LocateResult = [Span, MessageLike]

interface CollectResult {
  rest?: [Universal.Message[], string?]
  span?: Span
}

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
    const back: Span.Endpoint = [data.at(0)!.sid, data.at(0)!.id]
    const front: Span.Endpoint = [data.at(-1)!.sid, data.at(-1)!.id]
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

  getMessageList(id: string, dir?: Universal.Direction, limit?: number) {
    return this.bot.getMessageList(this.channelId, id, dir, limit, 'asc')
  }

  // TODO handle default limit
  async list(id: string, dir: Universal.Direction, limit: number) {
    await (this._initTask ||= this.init())
    const result = await this.locate(id, dir, limit)
    if (!result) return []
    const [span, message] = result
    if (dir === 'around') limit = Math.floor(limit / 2) + 1
    const beforeTask = dir === 'after' ? Promise.resolve([]) : this.getHistory(span, message, limit, 'before')
    const afterTask = dir === 'before' ? Promise.resolve([]) : this.getHistory(span, message, limit, 'after')
    const [before, after] = await Promise.all([beforeTask, afterTask])
    before.reverse()
    if (dir === 'after') return after
    if (dir === 'before') return before
    return [...before.slice(0, -1), message, ...after.slice(1)]
  }

  collect(result: Universal.TwoWayList<Universal.Message>, dir: Span.Direction, data: Message[], index?: number): CollectResult {
    const w = Span.words[dir]
    index ??= dir === 'after' ? -1 : result.data.length
    for (let i = index + w.inc; i >= 0 && i < result.data.length; i += w.inc) {
      const span = this._spans.find(span => span[w.back][1] === result.data[i].id)
      if (span) {
        const rest = dir === 'after'
          ? result.data.slice(i + 1)
          : result.data.slice(0, i).reverse()
        span[w.data] = [rest, result[w.next]]
        return { span }
      }
      data[w.push](Message.from(result.data[i], this.bot.platform, dir, data.at(w.last)?.sid))
    }
    return { rest: [[], result[w.next]] }
  }

  private async locate(id: string, dir: Universal.Direction, limit?: number): Promise<LocateResult | undefined> {
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
    let index: number | undefined
    // TODO handle special case
    // 1. data length = 0
    // 2. next undefined (final)
    const result = await this.getMessageList(id, dir, limit)
    if (dir === 'around') {
      index = result.data.findIndex(item => item.id === id)
      if (index === -1) throw new Error('malformed message list')
      message = Message.from(result.data[index], this.bot.platform)
      data.push(message as Message)
    }

    const { span: prev, rest: prevData } = this.collect(result, 'before', data, index)
    const { span: next, rest: nextData } = this.collect(result, 'after', data, index)

    if (data.length || prev && next) {
      span = this.insert(data, { prev, next })
    } else if (prev || next) {
      span = prev || next!
    } else {
      if (dir === 'before') this.hasEarliest = true
      return
    }

    span.prevData = prevData
    span.nextData = nextData

    if (dir === 'before') {
      message = { sid: span.front[0] }
    } else if (dir === 'after') {
      message = { sid: span.back[0] }
    }

    return [span, message!]
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
