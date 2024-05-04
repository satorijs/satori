import { Context, Logger, pick, Session } from '@satorijs/satori'
import { Message, SyncFlag } from '.'

const logger = new Logger('sync')

export enum SyncStatus {
  INIT,
  SYNCED,
  FAILED,
}

interface Interval {
  front: bigint
  back: bigint
  queue?: boolean
}

export class SyncChannel {
  public data: SyncChannel.Data
  /** 消息同步区间，倒序存放 */
  public _spans: Interval[] = []
  public status = SyncStatus.INIT

  private _buffer: Message[] = []
  private _initTask?: Promise<void>
  private _queueTask = Promise.resolve()

  constructor(private ctx: Context, platform: string, guildId: string, channelId: string) {
    this.data = { platform, guildId, channelId }
  }

  private async init() {
    logger.debug('init channel %s %s %s', this.data.platform, this.data.guildId, this.data.channelId)
    const data = await this.ctx.database
      .select('satori.message')
      .where({
        'platform': this.data.platform,
        'channel.id': this.data.channelId,
        'syncFlag': { $gt: 0 },
      })
      .orderBy('uid', 'asc')
      .project(['uid', 'syncFlag'])
      .execute()
    while (data.length) {
      const { syncFlag, uid: front } = data.pop()!
      if (syncFlag === SyncFlag.BOTH) {
        this._spans.push({ front, back: front })
      } else if (syncFlag === SyncFlag.FRONT) {
        const { syncFlag, uid: back } = data.pop()!
        if (syncFlag === SyncFlag.BACK) {
          this._spans.push({ front, back })
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
        this._spans[0].front = last.uid
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
