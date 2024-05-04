import { Context, Logger, remove, Session, Universal } from '@satorijs/satori'
import { Flatten, Query } from 'minato'
import { Message, SyncFlag } from '.'

const logger = new Logger('sync')

export enum SyncStatus {
  INIT,
  SYNCED,
  FAILED,
}

interface Span {
  front: Endpoint
  back: Endpoint
  prev?: Span
  next?: Span
  data?: Message[]
  task?: Promise<void>
  latest?: boolean
}

namespace Span {
  export function from(data: Message[], reverse: boolean) {
    if (reverse) data.reverse()
    const span = { data } as Span
    span.back = [data[0].uid, data[0].id]
    span.front = [data[data.length - 1].uid, data[data.length - 1].id]
    return span
  }
}

type Endpoint = [bigint, string]

export class SyncChannel {
  public data: SyncChannel.Data
  /** 消息同步区间，倒序存放 */
  public _spans: Span[] = []
  public status = SyncStatus.INIT

  private _buffer: Message[] = []
  private _initTask?: Promise<void>
  private _queueTask = Promise.resolve()

  private _baseQuery: Query.Expr<Flatten<Message>>

  constructor(private ctx: Context, platform: string, guildId: string, channelId: string) {
    this.data = { platform, guildId, channelId }
    this._baseQuery = {
      platform,
      'channel.id': channelId,
    }
  }

  private async init() {
    logger.debug('init channel %s %s %s', this.data.platform, this.data.guildId, this.data.channelId)
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
        this._spans.push({ front, back: front })
      } else if (syncFlag === SyncFlag.FRONT) {
        const { syncFlag, id, uid } = data.pop()!
        if (syncFlag === SyncFlag.BACK) {
          this._spans.push({ front, back: [uid, id] })
        } else {
          throw new Error('malformed sync flag')
        }
      } else {
        throw new Error('malformed sync flag')
      }
    }
    this.status = SyncStatus.SYNCED
  }

  accept(session: Session) {
    if (!this.data.assignee) {
      this.data.assignee = session.selfId
    } else if (this.data.assignee !== session.selfId) {
      return true
    }

    if (session.event.channel?.name) {
      this.data.channelName = session.event.channel.name
    }
  }

  async queue(session: Session) {
    if (this.accept(session)) return
    this._buffer.push(Message.from(session.event.message!, session.platform))
    try {
      if (this.status === SyncStatus.INIT) {
        await (this._initTask ||= this.init())
      }
      if (this.status === SyncStatus.SYNCED) {
        return this._queueTask = this._queueTask.then(() => this.flush())
      }
    } catch (error) {
      logger.warn(error)
      this.status = SyncStatus.FAILED
    }
  }

  private async flushSpan(span: Span) {
    if (!span.data) return
    return span.task ||= this._flushSpan(span)
  }

  private async _flushSpan(span: Span) {
    if (!span.data) return
    const data: Partial<Message>[] = span.data.slice()
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
    }
    delete span.data
    delete span.prev
    delete span.next
  }

  private async flush() {
    while (this._buffer.length) {
      const data = this._buffer.splice(0)
      if (this._spans[0]?.latest) {
        const { front, back } = this._spans[0]
        const last = data.pop()!
        await this.ctx.database.upsert('satori.message', [
          { uid: front, syncFlag: front === back ? SyncFlag.BACK : SyncFlag.NONE },
          ...data,
          { ...last, syncFlag: SyncFlag.FRONT },
        ])
        this._spans[0].front = [last.uid, last.id]
      } else {
        const back = data.pop()!
        let front = data.shift()
        if (front) {
          await this.ctx.database.upsert('satori.message', [
            { ...front, syncFlag: SyncFlag.BACK },
            ...data,
            { ...back, syncFlag: SyncFlag.FRONT },
          ])
        } else {
          front = back
          await this.ctx.database.upsert('satori.message', [
            { ...back, syncFlag: SyncFlag.BOTH },
          ])
        }
        this._spans.unshift({
          front: [front.uid, front.id],
          back: [back.uid, back.id],
          latest: true,
        })
      }
    }
  }

  async getMessageList(id: string, direction: Universal.Direction, limit: number) {
    if (this._buffer.some(message => message.id === id)) {
      // TODO
    } else {
      const [message] = await this.ctx.database
        .select('satori.message')
        .where({ ...this._baseQuery, id })
        .execute()
      if (message) {
        const span = this._spans.find(span => span.front[0] <= message.uid && message.uid <= span.back[0])
        if (!span) throw new Error('malformed sync span')
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
      } else {
        const { channelId, platform, assignee } = this.data
        const bot = this.ctx.bots[`${platform}:${assignee}`]
        const result = await bot.getMessageList(channelId, id, 'around')
      }
    }
  }

  private async syncHistory(next: Span, message: Message | { uid: bigint }, limit: number, direction: 'before' | 'after') {
    const buffer: Message[] = []
    const { channelId, platform, assignee } = this.data
    const bot = this.ctx.bots[`${platform}:${assignee}`]
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
        const result = await bot.getMessageList(channelId, token, direction)
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
          data.push(Message.from(item, platform))
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

export namespace SyncChannel {
  export interface Data {
    platform: string
    guildId: string
    channelId: string
    assignee?: string
    guildName?: string
    channelName?: string
    avatar?: string
  }
}
