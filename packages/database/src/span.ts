import { clone, remove, Universal } from '@satorijs/core'
import { $, Update } from 'minato'
import { Message } from './types'
import { SyncChannel } from './channel'

export class Span {
  prev?: Span
  prevTask?: Promise<Span | undefined>
  prevTemp?: Universal.TwoWayList<Universal.Message>
  next?: Span
  nextTask?: Promise<Span | undefined>
  nextTemp?: Universal.TwoWayList<Universal.Message>
  syncTask?: Promise<void>

  constructor(
    public channel: SyncChannel,
    public type: Span.Type,
    public front: Span.Endpoint,
    public back: Span.Endpoint,
    public data?: Message[],
  ) {}

  link(dir: Span.Direction, span?: Span) {
    const w = Span.words[dir]
    this[w.next] = span
    if (span) span[w.prev] = this
  }

  merge(dir: Span.Direction) {
    const w = Span.words[dir]
    const next = this[w.next]
    if (next?.type !== this.type) return false
    remove(this.channel._spans, next)
    this.data?.[w.push](...next.data!)
    this[w.front] = next[w.front]
    this[w.temp] = next[w.temp]
    this[w.task] = next[w.task]
    this.link(dir, next[w.next])
    return true
  }

  async flush(forced: Span.PrevNext<boolean> = {}) {
    if (this.type !== Span.Type.LOCAL) throw new Error('expect local span')
    if (!forced.prev && !this.prev && !(this === this.channel._spans.at(0) && this.channel.hasEarliest)) return
    if (!forced.next && !this.next && !(this === this.channel._spans.at(-1) && this.channel.hasLatest)) return
    await Promise.all([this.prev?.syncTask, this.next?.syncTask])
    if (!this.channel._spans.includes(this)) return
    return this.syncTask ||= this.sync()
  }

  private async sync() {
    this.type = Span.Type.SYNC
    await this.channel.ctx.database.upsert('satori.message', (row) => {
      const data: Update<Message>[] = clone(this.data!)
      if (this.next?.type === Span.Type.REMOTE) {
        data.push({
          ...this.channel._query,
          sid: this.next.back[0],
          flag: $.bitAnd(row.flag, $.bitNot(Message.Flag.BACK)),
        })
      } else {
        data.at(-1)!.flag |= Message.Flag.FRONT
      }
      if (this.prev?.type === Span.Type.REMOTE) {
        data.unshift({
          ...this.channel._query,
          sid: this.prev.front[0],
          flag: $.bitAnd(row.flag, $.bitNot(Message.Flag.FRONT)),
        })
      } else {
        data.at(0)!.flag |= Message.Flag.BACK
      }
      return data
    }, ['sid', 'channel.id', 'platform'])
    this.type = Span.Type.REMOTE
    delete this.data
    this.merge('after')
    this.merge('before')
  }

  async collect(message: Message | { sid: bigint }, dir: Span.Direction, limit: number) {
    const w = Span.words[dir]
    if (this.data) {
      const index = this.data.findIndex(item => item.sid === message.sid)
      return w.slice(this.data, index)
    } else if ('id' in message && this[w.front][0] === message.sid) {
      return [message]
    } else {
      const data = await this.channel.ctx.database
        .select('satori.message')
        .where({
          ...this.channel._query,
          sid: {
            [w.$gte]: message.sid,
            [w.$lte]: this[w.front][0],
          },
        })
        .orderBy('sid', w.order)
        .limit(limit)
        .execute()
      if (dir === 'before') data.reverse()
      return data
    }
  }

  async extend(dir: Span.Direction, limit: number, result?: Universal.TwoWayList<Universal.Message>) {
    const w = Span.words[dir]
    result ??= await this.channel.getMessageList(this[w.front][1], dir, limit)
    const data: Message[] = []
    const { span, temp } = this.channel.collect(result, dir, data)
    if (!span && dir === 'before' && !result[w.next]) this.channel.hasEarliest = true
    if (data.length || span) {
      return this.channel.insert(data, {
        [w.prev]: this,
        [w.next]: span,
        [w.temp]: temp,
      })
    }
  }
}

export namespace Span {
  export type Direction = 'before' | 'after'
  export type Endpoint = [bigint, string]

  export enum Type {
    LOCAL,
    SYNC,
    REMOTE,
  }

  export interface PrevNext<T> {
    prev?: T
    next?: T
  }

  export const words = {
    before: {
      prev: 'next',
      next: 'prev',
      push: 'unshift',
      front: 'back',
      back: 'front',
      task: 'prevTask',
      temp: 'prevTemp',
      order: 'desc',
      $lte: '$gte',
      $gte: '$lte',
      inc: -1,
      last: 0,
      slice: <T>(arr: T[], index: number) => arr.slice(0, index + 1),
    },
    after: {
      prev: 'prev',
      next: 'next',
      push: 'push',
      front: 'front',
      back: 'back',
      task: 'nextTask',
      temp: 'nextTemp',
      order: 'asc',
      $lte: '$lte',
      $gte: '$gte',
      inc: 1,
      last: -1,
      slice: <T>(arr: T[], index: number) => arr.slice(index),
    },
  } as const
}
