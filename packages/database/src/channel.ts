import { Bot, Context, Logger, Session, Universal } from '@satorijs/satori'
import { Flatten, Query } from 'minato'
import { Message, SyncFlag } from '.'
import { Span } from './span'

const logger = new Logger('sync')

export enum SyncStatus {
  INIT,
  READY,
  FAILED,
}

export class SyncChannel {
  public spans: Span[] = []

  private _status = SyncStatus.INIT

  private _initTask?: Promise<void>
  private _hasLatest = false
  private _baseQuery: Query.Expr<Flatten<Message>>

  constructor(public ctx: Context, public bot: Bot, public guildId: string, public channelId: string) {
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
      const front: Span.Endpoint = [frontUid, frontId]
      if (syncFlag === SyncFlag.BOTH) {
        this.spans.push(new Span(this, Span.Type.REMOTE, front, front))
      } else if (syncFlag === SyncFlag.FRONT) {
        const { syncFlag, id, uid } = data.pop()!
        if (syncFlag === SyncFlag.BACK) {
          this.spans.push(new Span(this, Span.Type.REMOTE, front, [uid, id]))
        } else {
          throw new Error('malformed sync flag')
        }
      } else {
        throw new Error('malformed sync flag')
      }
    }
  }

  private createSpan(data: Message[], index?: number) {
    const back: Span.Endpoint = [data[0].uid, data[0].id]
    const front: Span.Endpoint = [data[data.length - 1].uid, data[data.length - 1].id]
    const span = new Span(this, Span.Type.LOCAL, front, back, data)
    if (typeof index !== 'number') {
      index = 0
      let right = this.spans.length
      while (index < right) {
        const mid = Math.floor((index + right) / 2)
        if (this.spans[mid].front[0] < front[0]) {
          right = mid
        } else {
          index = mid
        }
      }
    }
    this.spans.splice(index, 0, span)
    return span
  }

  async queue(session: Session) {
    const message = Message.from(session.event.message!, session.platform)
    const span = this.createSpan([message], 0)
    if (this._hasLatest) {
      span.prev = this.spans[1]
      this.spans[1].next = span
    }
    this._hasLatest = true
    await this._initTask
    if (this._status === SyncStatus.FAILED) return
    try {
      await this.spans[0].flush()
    } catch (error) {
      logger.warn(error)
      this._status = SyncStatus.FAILED
    }
  }

  async getMessageList(id: string, direction: Universal.Direction, limit: number) {
    let span: Span | undefined, message: Message | undefined

    // condition 1: message in local
    for (span of this.spans) {
      message = span.data?.find(message => message.id === id)
      if (message) break
    }

    // condition 2: message in database
    if (!message) {
      const data = await this.ctx.database
        .select('satori.message')
        .where({ ...this._baseQuery, id })
        .execute()
      if (data[0]) {
        message = data[0]
        span = this.spans.find(span => span.front[0] <= data[0].uid && data[0].uid <= span.back[0])
        if (!span) throw new Error('malformed sync span')
      }
    }

    // condition 3: message not found
    if (!message) {
      const result = await this.bot.getMessageList(this.channelId, id, 'around')
      const index = result.data.findIndex(item => item.id === id)
      if (index === -1) throw new Error('malformed message list')
      message = Message.from(result.data[index], this.bot.platform)
      const data = [message]
      let prev: Span | undefined, next: Span | undefined
      for (let i = index - 1; i >= 0; i--) {
        prev = this.spans.find(span => span.front[1] === result.data[i].id)
        if (prev) break
        data.unshift(Message.from(result.data[i], this.bot.platform))
      }
      for (let i = index + 1; i < result.data.length; i++) {
        next = this.spans.find(span => span.back[1] === result.data[i].id)
        if (next) break
        data.push(Message.from(result.data[i], this.bot.platform))
      }
      span = this.createSpan(data)
      span.prev = prev
      span.next = next
      this.spans.push(span)
    }

    if (direction === 'around') {
      limit = Math.floor(limit / 2)
    }
    const beforeTask = direction === 'after' ? Promise.resolve([]) : this.syncHistory(span!, message, limit + 1, 'before')
    const afterTask = direction === 'before' ? Promise.resolve([]) : this.syncHistory(span!, message, limit + 1, 'after')
    const [before, after] = await Promise.all([beforeTask, afterTask])
    after.shift()
    before.shift()
    before.reverse()
    if (direction === 'after') return after
    if (direction === 'before') return before
    return [...before, message, ...after]
  }

  private async syncHistory(next: Span, message: Message | { uid: bigint }, limit: number, direction: 'before' | 'after') {
    const local: Message[] = []
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
      if (next.data) {
        const index = next.data.findIndex(item => item.uid === message.uid)
        if (direction === 'before') {
          local.push(...next.data.slice(0, index + 1).reverse())
        } else {
          local.push(...next.data.slice(index))
        }
      } else if ('id' in message && next[dir.front][0] === message.uid) {
        local.push(message)
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
          .limit(limit - local.length)
          .execute()
        local.push(...before)
      }
      if (local.length >= limit) return local.slice(0, limit)

      let token = next[dir.back][1]
      const data: Message[] = []
      while (token) {
        const result = await this.bot.getMessageList(this.channelId, token, direction)
        if (direction === 'before') result.data.reverse()
        for (const item of result.data) {
          const prev = this.spans.find(span => span[dir.front][1] === item.id)
          if (prev) {
            const _span = this.createSpan(data) // FIXME reverse
            _span[dir.next] = next
            _span[dir.prev] = prev
            this.spans.push(_span)
            _span.flush()
            next = prev
            message = { uid: prev[dir.front][0] }
            continue outer
          }
          data.push(Message.from(item, this.bot.platform))
        }
        if (data.length + local.length >= limit) {
          local.push(...data)
          break
        }
        token = result.next!
      }
      const _span = this.createSpan(data) // FIXME reverse
      _span[dir.next] = next
      this.spans.push(_span)
      _span.flush()
      return local.slice(0, limit)
    }
  }
}
