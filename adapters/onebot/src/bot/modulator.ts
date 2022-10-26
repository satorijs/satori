import { Modulator, segment } from '@satorijs/satori'
import { BaseBot } from './base'
import { CQCode } from './cqcode'

export interface Message extends CQCode {
  type: 'message' | 'forward'
  children: CQCode[]
}

export class OneBotModulator extends Modulator<BaseBot> {
  stack: ('message' | 'forward')[] = []
  data: any = {}
  children: CQCode[] = []
  buffer: Message

  private async forward() {
    if (!this.buffer.children.length) return
    const session = this.bot.session(this.session)
    session.messageId = this.guildId
      ? '' + await this.bot.internal.sendGroupForwardMsg(this.guildId, this.buffer.children)
      : '' + await this.bot.internal.sendPrivateForwardMsg(this.channelId.slice(8), this.buffer.children)
    session.app.emit(session, 'send', session)
    this.results.push(session)
    this.stack.shift()
    this.buffer = null
    return
  }

  async flush() {
    // trim start
    while (true) {
      const first = this.children[0]
      if (first?.type !== 'text') break
      first.data.text = first.data.text.trimStart()
      if (first.data.text) break
      this.children.shift()
    }

    // trim end
    while (true) {
      const last = this.children[this.children.length - 1]
      if (last?.type !== 'text') break
      last.data.text = last.data.text.trimEnd()
      if (last.data.text) break
      this.children.pop()
    }

    // flush
    if (!this.children.length) return
    if (this.buffer) {
      this.buffer.children.push({
        type: 'node',
        data: this.data.id ? { id: this.data.id } : {
          name: this.data.nickname || this.bot.nickname || this.bot.username,
          uin: this.data.userId || this.bot.userId,
          content: this.children as any,
        },
      })
      this.children = []
      return
    }

    const session = this.bot.session(this.session)
    session.messageId = this.bot.parent
      ? '' + await this.bot.internal.sendGuildChannelMsg(this.guildId, this.channelId, this.children)
      : this.guildId
        ? '' + await this.bot.internal.sendGroupMsg(this.guildId, this.children)
        : '' + await this.bot.internal.sendPrivateMsg(this.channelId.slice(8), this.children)
    session.app.emit(session, 'send', session)
    this.results.push(session)
    this.children = []
  }

  private text(text: string) {
    this.children.push({ type: 'text', data: { text } })
  }

  async visit(element: segment) {
    let { type, attrs, children } = element
    if (type === 'text') {
      this.text(attrs.content)
    } else if (type === 'p') {
      await this.render(children)
      this.text('\n')
    } else if (type === 'at') {
      if (attrs.type === 'all') {
        this.children.push({ type: 'at', data: { qq: 'all' } })
      } else {
        this.children.push({ type: 'at', data: { qq: attrs.id } })
      }
    } else if (type === 'sharp') {
      if (attrs.id) this.text(attrs.id)
    } else if (type === 'a') {
      await this.render(children)
      if (attrs.href) this.text(` (${attrs.href}) `)
    } else if (['video', 'audio', 'image'].includes(type)) {
      if (type === 'audio') type = 'record'
      attrs = { ...attrs }
      attrs.file = attrs.url
      delete attrs.url
      const cap = /^data:([\w/-]+);base64,/.exec(attrs.file)
      if (cap) attrs.file = 'base64://' + attrs.file.slice(cap[0].length)
      this.children.push({ type, data: attrs })
    } else if (type === 'figure') {
      await this.flush()
      this.buffer = { type: 'forward', data: {}, children: [] }
      await this.render(children)
      await this.forward()
    } else if (type === 'quote') {
      await this.flush()
      this.children.push({ type: 'reply', data: attrs })
    } else if (type === 'message') {
      await this.flush()
      // qqguild does not support forward messages
      if ('forward' in attrs && !this.bot.parent) {
        this.buffer = { type: 'forward', data: {}, children: [] }
        await this.render(children)
        await this.forward()
      } else {
        this.data = attrs
        Object.assign(this.data, attrs)
        await this.render(children)
        await this.flush()
        this.data = {}
      }
    } else {
      await this.render(children)
    }
  }
}
