import { Context, Logger, Session, Universal } from '@satorijs/satori'
import { Flatten, Query } from 'minato'
import { Message, SyncFlag } from '.'

const logger = new Logger('sync')

export enum SyncStatus {
  INIT,
  SYNCED,
  FAILED,
}

interface Span {
  front: SpanID
  back: SpanID
  queue?: boolean
}

type SpanID = [bigint, string]

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
      const front: SpanID = [frontUid, frontId]
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

  private async flush() {
    while (this._buffer.length) {
      const data = this._buffer.splice(0)
      if (this._spans[0]?.queue) {
        const { front, back } = this._spans[0]
        const last = data.pop()!
        await this.ctx.database.upsert('satori.message', [
          { uid: front, syncFlag: front === back ? SyncFlag.BACK : SyncFlag.NONE },
          ...data,
          { ...last, syncFlag: SyncFlag.FRONT },
        ])
        this._spans[0].front = [last.uid, last.id]
      } else {
        const last = data.pop()!
        const first = data.shift()
        if (first) {
          await this.ctx.database.upsert('satori.message', [
            { ...first, syncFlag: SyncFlag.BACK },
            ...data,
            { ...last, syncFlag: SyncFlag.FRONT },
          ])
        } else {
          await this.ctx.database.upsert('satori.message', [
            { ...last, syncFlag: SyncFlag.BOTH },
          ])
        }
      }
    }
  }

  async getMessageList(id: string, count: number, direction: Universal.Direction) {
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
        const beforeTask = direction === 'after' ? Promise.resolve([]) : this.syncHistory(span, message, count, 'before')
        const afterTask = direction === 'before' ? Promise.resolve([]) : this.syncHistory(span, message, count, 'after')
        const [before, after] = await Promise.all([beforeTask, afterTask])
        after.shift()
        before.shift()
        before.reverse()
        if (direction === 'after') return after
        if (direction === 'before') return before
        return [...before, message, ...after]
      }
    }
  }

  private async syncHistory(span: Span, message: Message | { uid: bigint }, count: number, direction: 'before' | 'after') {
    const buffer: Message[] = []
    const { channelId, platform, assignee } = this.data
    const bot = this.ctx.bots[`${platform}:${assignee}`]
    const dir = ({
      before: {
        front: 'front',
        back: 'back',
        desc: 'desc',
        $lte: '$lte',
        $gte: '$gte',
      },
      after: {
        front: 'back',
        back: 'front',
        desc: 'asc',
        $lte: '$gte',
        $gte: '$lte',
      },
    } as const)[direction]
    outer: while (true) {
      if ('id' in message && span[dir.front][0] === message.uid) {
        buffer.push(message)
      } else {
        const before = await this.ctx.database
          .select('satori.message')
          .where({
            ...this._baseQuery,
            uid: {
              [dir.$lte]: message.uid,
              [dir.$gte]: span[dir.front][0],
            },
          })
          .orderBy('uid', dir.desc)
          .limit(count - buffer.length)
          .execute()
        buffer.push(...before)
      }
      if (buffer.length >= count) return buffer
      let next = span[dir.front][1]
      while (true) {
        const result = await bot.getMessageList(channelId, next, direction)
        next = result.next!
        for (let index = result.data.length - 1; index >= 0; index--) {
          const prevSpan = this._spans.find(span => span[dir.back][1] === result.data[index].id)
          if (prevSpan) {
            span = prevSpan
            message = { uid: prevSpan[dir.back][0] }
            continue outer
          }
          buffer.push(Message.from(result.data[index], platform))
          if (buffer.length >= count) return buffer
        }
      }
    }
  }

  toJSON(): SyncChannel.Data {
    return this.data
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
