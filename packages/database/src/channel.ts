import { Bot, Context, Logger, remove, Session, Universal } from '@satorijs/satori'
import { Flatten, Query } from 'minato'
import { Message, SyncFlag } from '.'

const logger = new Logger('sync')

export enum SyncStatus {
  INIT,
  READY,
  FAILED,
}

interface Span {
  type: 'synced' | 'syncing' | 'buffer'
  front: Endpoint
  back: Endpoint
  prev?: Span
  prevTask?: Promise<void>
  next?: Span
  nextTask?: Promise<void>
  data?: Message[]
  dataTask?: Promise<void>
}

namespace Span {
  export function from(data: Message[], reverse: boolean) {
    if (reverse) data.reverse()
    const span = { data, type: 'buffer' } as Span
    span.back = [data[0].uid, data[0].id]
    span.front = [data[data.length - 1].uid, data[data.length - 1].id]
    return span
  }
}

type Endpoint = [bigint, string]

export class SyncChannel {
  private _spans: Span[] = []
  private _status = SyncStatus.INIT

  private _initTask?: Promise<void>
  private _queueTask = Promise.resolve()

  private _hasLatest = false
  private _baseQuery: Query.Expr<Flatten<Message>>

  constructor(private ctx: Context, public bot: Bot, public guildId: string, public channelId: string) {
    this._baseQuery = { platform: bot.platform, 'channel.id': channelId }
    this._initTask ||= this._init().then(() => {
      this._status = SyncStatus.READY
    }, (error) => {
      logger.warn(error)
      this._status = SyncStatus.FAILED
    })
  }

  private async _init() {
    logger.debug('init channel %s %s %s', this.bot.platform, this.guildId, this.channelId)
    const data = await this.ctx.database
      .select('satori.message')
      .where({
        ...this._baseQuery,
        syncFlag: { $gt: 0 },
      })
      .orderBy('uid', 'asc')
      .project(['id', 'uid', 'syncFlag'])
      .execute()
    while (data.length) {
      const { syncFlag, id: frontId, uid: frontUid } = data.pop()!
      const front: Endpoint = [frontUid, frontId]
      if (syncFlag === SyncFlag.BOTH) {
        this._spans.push({ front, back: front, type: 'synced' })
      } else if (syncFlag === SyncFlag.FRONT) {
        const { syncFlag, id, uid } = data.pop()!
        if (syncFlag === SyncFlag.BACK) {
          this._spans.push({ front, back: [uid, id], type: 'synced' })
        } else {
          throw new Error('malformed sync flag')
        }
      } else {
        throw new Error('malformed sync flag')
      }
    }
  }

  async queue(session: Session) {
    const message = Message.from(session.event.message!, session.platform)
    if (this._hasLatest && this._spans[0]?.type === 'buffer') {
      this._spans[0].data!.push(message)
    } else {
      this._spans.unshift({
        type: 'buffer',
        front: [message.uid, message.id],
        back: [message.uid, message.id],
        data: [message],
        prev: this._hasLatest ? this._spans[0] : undefined,
      })
    }
    this._hasLatest = true
    await this._initTask
    if (this._status === SyncStatus.FAILED) return
    try {
      await (this._queueTask = this._queueTask.then(async () => {
        await this._flushSpan(this._spans[0], true)
      }))
    } catch (error) {
      logger.warn(error)
      this._status = SyncStatus.FAILED
    }
  }

  private async flushSpan(span: Span) {
    if (!span.data) return
    return span.dataTask ||= this._flushSpan(span)
  }

  private async _flushSpan(span: Span, isLastest = false) {
    if (!span.data) return
    do {
      const data: Partial<Message>[] = isLastest ? span.data.splice(0) : span.data.slice()
      if (span.next) {
        data.unshift({
          uid: span.next.front[0],
          syncFlag: span.next.front[0] === span.next.back[0] ? SyncFlag.FRONT : SyncFlag.NONE,
        })
      } else {
        span.data[span.data.length - 1].syncFlag = SyncFlag.FRONT
      }
      if (span.prev) {
        data.unshift({
          uid: span.prev.back[0],
          syncFlag: span.prev.front[0] === span.prev.back[0] ? SyncFlag.BACK : SyncFlag.NONE,
        })
      } else {
        span.data[0].syncFlag = span.data[0].syncFlag ? SyncFlag.BOTH : SyncFlag.BACK
      }
      await this.ctx.database.upsert('satori.message', data)
      // eslint-disable-next-line no-unmodified-loop-condition
    } while (isLastest && span.data.length)
    if (span.prev && span.next) {
      remove(this._spans, span)
      remove(this._spans, span.next)
      span.prev.front = span.next.front
    } else if (span.prev) {
      remove(this._spans, span)
      span.prev.front = span.front
    } else if (span.next) {
      remove(this._spans, span)
      span.next.back = span.back
    } else {
      span.type = 'synced'
      delete span.data
      delete span.prev
      delete span.next
    }
  }

  async getMessageList(id: string, direction: Universal.Direction, limit: number) {
    let span: Span | undefined, message: Message | undefined
    for (span of this._spans) {
      message = span.data?.find(message => message.id === id)
      if (message) break
    }
    if (!message) {
      const data = await this.ctx.database
        .select('satori.message')
        .where({ ...this._baseQuery, id })
        .execute()
      if (data[0]) {
        message = data[0]
        span = this._spans.find(span => span.front[0] <= data[0].uid && data[0].uid <= span.back[0])
        if (!span) throw new Error('malformed sync span')
      }
    }
    if (!span || !message) {
      const result = await this.bot.getMessageList(this.channelId, id, 'around')
      const data = result.data.map(item => Message.from(item, this.bot.platform))
      span = Span.from(data, direction === 'before')
      message = data.find(message => message.id === id)!
    }
    if (direction === 'around') {
      limit = Math.floor(limit / 2) + 1
    }
    const beforeTask = direction === 'after' ? Promise.resolve([]) : this.syncHistory(span, message, limit, 'before')
    const afterTask = direction === 'before' ? Promise.resolve([]) : this.syncHistory(span, message, limit, 'after')
    const [before, after] = await Promise.all([beforeTask, afterTask])
    after.shift()
    before.shift()
    before.reverse()
    if (direction === 'after') return after
    if (direction === 'before') return before
    return [...before, message, ...after]
  }

  private async syncHistory(next: Span, message: Message | { uid: bigint }, limit: number, direction: 'before' | 'after') {
    const buffer: Message[] = []
    const dir = ({
      before: {
        front: 'front',
        back: 'back',
        prev: 'prev',
        next: 'next',
        desc: 'desc',
        $lte: '$lte',
        $gte: '$gte',
      },
      after: {
        front: 'back',
        back: 'front',
        prev: 'next',
        next: 'prev',
        desc: 'asc',
        $lte: '$gte',
        $gte: '$lte',
      },
    } as const)[direction]
    outer: while (true) {
      if ('id' in message && next[dir.front][0] === message.uid) {
        buffer.push(message)
      } else {
        const before = await this.ctx.database
          .select('satori.message')
          .where({
            ...this._baseQuery,
            uid: {
              [dir.$lte]: message.uid,
              [dir.$gte]: next[dir.front][0],
            },
          })
          .orderBy('uid', dir.desc)
          .limit(limit - buffer.length)
          .execute()
        buffer.push(...before)
      }
      if (buffer.length >= limit) return buffer
      let token = next[dir.back][1]
      const data: Message[] = []
      while (token) {
        const result = await this.bot.getMessageList(this.channelId, token, direction)
        if (direction === 'before') result.data.reverse()
        for (const item of result.data) {
          const prev = this._spans.find(span => span[dir.front][1] === item.id)
          if (prev) {
            const _span = Span.from(data, direction === 'before')
            _span[dir.next] = next
            _span[dir.prev] = prev
            this._spans.push(_span)
            this.flushSpan(_span)
            next = prev
            message = { uid: prev[dir.front][0] }
            continue outer
          }
          data.push(Message.from(item, this.bot.platform))
        }
        if (data.length + buffer.length >= limit) {
          buffer.push(...data)
          break
        }
        token = result.next!
      }
      const _span = Span.from(data, direction === 'before')
      _span[dir.next] = next
      this._spans.push(_span)
      this.flushSpan(_span)
      return buffer.slice(0, limit)
    }
  }
}
