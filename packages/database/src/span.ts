import { clone, remove } from '@satorijs/satori'
import { Message, SyncFlag } from '.'
import { SyncChannel } from './channel'
import { $, Update } from 'minato'

export class Span {
  prev?: Span
  prevTask?: Promise<void>
  next?: Span
  nextTask?: Promise<void>
  syncTask?: Promise<void>

  constructor(
    public channel: SyncChannel,
    public type: Span.Type,
    public front: Span.Endpoint,
    public back: Span.Endpoint,
    public data?: Message[],
  ) {}

  mergeNext() {
    if (!this.next) return
    if (this.next.type !== this.type) throw new Error('malformed span type')
    remove(this.channel.spans, this.next)
    this.data?.push(...this.next.data!)
    this.front = this.next.front
    this.next = this.next.next
    if (this.next) this.next.prev = this
  }

  mergePrev() {
    if (!this.prev) return
    if (this.prev.type !== this.type) throw new Error('malformed span type')
    remove(this.channel.spans, this.prev)
    this.data?.unshift(...this.prev.data!)
    this.back = this.prev.back
    this.prev = this.prev.prev
    if (this.prev) this.prev.next = this
  }

  flush() {
    if (this.type !== Span.Type.LOCAL) throw new Error('expect local span')
    while (this.next?.type === Span.Type.LOCAL) {
      this.mergeNext()
    }
    while (this.prev?.type === Span.Type.LOCAL) {
      this.mergePrev()
    }
    this.type = Span.Type.SYNC
    return this.syncTask ||= this.sync()
  }

  async sync() {
    await Promise.all([this.prev?.syncTask, this.next?.syncTask])
    await this.channel.ctx.database.upsert('satori.message', (row) => {
      const data: Update<Message>[] = clone(this.data!)
      if (this.next) {
        data.push({
          uid: this.next.back[0],
          syncFlag: $.bitAnd(row.syncFlag, $.bitNot(SyncFlag.BACK)),
        })
      } else {
        data[data.length - 1].syncFlag |= SyncFlag.FRONT
      }
      if (this.prev) {
        data.unshift({
          uid: this.prev.front[0],
          syncFlag: $.bitAnd(row.syncFlag, $.bitNot(SyncFlag.FRONT)),
        })
      } else {
        data[0].syncFlag |= SyncFlag.BACK
      }
      return data
    })
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
