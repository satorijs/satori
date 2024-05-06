import { clone, remove } from '@satorijs/satori'
import { $, Update } from 'minato'
import { Message } from './types'
import { SyncChannel } from './channel'

export class Span {
  prev?: Span
  prevTask?: Promise<Span>
  next?: Span
  nextTask?: Promise<Span>
  syncTask?: Promise<void>

  constructor(
    public channel: SyncChannel,
    public type: Span.Type,
    public front: Span.Endpoint,
    public back: Span.Endpoint,
    public data?: Message[],
  ) {}

  link(dir: 'prev' | 'next', span?: Span) {
    this[dir] = span
    if (span) span[dir === 'prev' ? 'next' : 'prev'] = this
  }

  mergeNext() {
    if (this.next?.type !== this.type) return false
    remove(this.channel._spans, this.next)
    this.data?.push(...this.next.data!)
    this.front = this.next.front
    this.nextTask = this.next.nextTask
    this.link('next', this.next.next)
    return true
  }

  mergePrev() {
    if (this.prev?.type !== this.type) return false
    remove(this.channel._spans, this.prev)
    this.data?.unshift(...this.prev.data!)
    this.back = this.prev.back
    this.prevTask = this.prev.prevTask
    this.link('prev', this.prev.prev)
    return true
  }

  async flush() {
    if (this.type !== Span.Type.LOCAL) throw new Error('expect local span')
    while (this.mergeNext());
    while (this.mergePrev());
    await Promise.all([this.prev?.syncTask, this.next?.syncTask])
    if (!this.channel._spans.includes(this)) return
    return this.syncTask ||= this.sync()
  }

  async sync() {
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
        data[data.length - 1].flag |= Message.Flag.FRONT
      }
      if (this.prev?.type === Span.Type.REMOTE) {
        data.unshift({
          ...this.channel._query,
          sid: this.prev.front[0],
          flag: $.bitAnd(row.flag, $.bitNot(Message.Flag.FRONT)),
        })
      } else {
        data[0].flag |= Message.Flag.BACK
      }
      return data
    }, ['sid', 'channel.id', 'platform'])
    this.type = Span.Type.REMOTE
    delete this.data
    this.mergeNext()
    this.mergePrev()
  }
}

export namespace Span {
  export type Endpoint = [bigint, string]

  export enum Type {
    LOCAL,
    SYNC,
    REMOTE,
  }
}
