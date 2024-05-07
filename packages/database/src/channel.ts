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
  temp?: Universal.TwoWayList<Universal.Message>
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

  insert(data: Message[], options: Pick<Span, 'prev' | 'next' | 'prevTemp' | 'nextTemp'> = {}, forced: Span.PrevNext<boolean> = {}) {
    if (!data.length && !options.prev && !options.next) {
      throw new Error('unexpected empty span')
    }
    const back: Span.Endpoint = [data.at(0)!.sid, data.at(0)!.id]
    const front: Span.Endpoint = [data.at(-1)!.sid, data.at(-1)!.id]
    const span = new Span(this, Span.Type.LOCAL, front, back, data)
    const index = this.binarySearch(back[0])
    this._spans.splice(index, 0, span)
    span.prevTemp = options.prevTemp
    span.link('before', options.prev)
    span.merge('before')
    span.nextTemp = options.nextTemp
    span.link('after', options.next)
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
    const beforeTask = dir === 'after' ? Promise.resolve([]) : this.extend(span, message, limit, 'before')
    const afterTask = dir === 'before' ? Promise.resolve([]) : this.extend(span, message, limit, 'after')
    const [before, after] = await Promise.all([beforeTask, afterTask])
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
        const data = w.slice(result.data, i + w.inc)
        if (data.length) {
          span[w.temp] = { [w.next]: result[w.next], data }
        }
        return { span }
      }
      data[w.push](Message.from(result.data[i], this.bot.platform, dir, data.at(w.last)?.sid))
    }
    return { temp: { data: [], [w.next]: result[w.next] } }
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
    const result = await this.getMessageList(id, dir, limit)
    if (dir === 'around') {
      index = result.data.findIndex(item => item.id === id)
      if (index === -1) throw new Error('malformed message list')
      message = Message.from(result.data[index], this.bot.platform)
      data.push(message as Message)
    }

    const { span: prev, temp: prevTemp } = this.collect(result, 'before', data, index)
    const { span: next, temp: nextTemp } = this.collect(result, 'after', data, index)

    if (data.length || prev && next) {
      span = this.insert(data, { prev, next })
    } else if (prev || next) {
      span = prev || next!
    } else {
      if (dir === 'before') this.hasEarliest = true
      return
    }

    span.prevTemp = prevTemp
    span.nextTemp = nextTemp
    if (dir === 'before') {
      message = { sid: span.front[0] }
    } else if (dir === 'after') {
      message = { sid: span.back[0] }
    }
    return [span, message!]
  }

  private async extend(span: Span, message: MessageLike, limit: number, dir: Span.Direction) {
    const buffer: Message[] = []
    const w = Span.words[dir]

    while (true) {
      const data = await span.collect(message, dir, limit - buffer.length)
      buffer[w.push](...data)
      if (buffer.length >= limit) {
        delete span[w.temp]
        break
      }

      let result = span[w.temp]
      if (result) {
        let i = dir === 'before' ? result.data.length - 1 : 0
        for (; i >= 0 && i < result.data.length; i += w.inc) {
          if (!data.some(item => item.id === result!.data[i].id)) break
        }
        result.data = w.slice(result.data, i)
        if (!result.data.length) result = undefined
        delete span[w.temp]
      }

      const next = span[w.next] ?? await (span[w.task] ??= span.extend(dir, limit - buffer.length, result))
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
