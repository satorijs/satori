import { Context, h, MessageEncoder, Schema } from '@satorijs/satori'
import { KookBot } from './bot'
import * as Kook from './types'

export function isDirectChannel(channelId: string) {
  return channelId.length > 30
}

export class KookMessageEncoder<C extends Context = Context> extends MessageEncoder<C, KookBot<C>> {
  private path: string
  private params = {} as Partial<Kook.MessageParams>
  private additional = {} as Partial<Kook.MessageParams>
  private textBuffer: string = ''
  private cardBuffer: Kook.Card = {
    type: 'card',
    modules: [],
  }

  async prepare() {
    if (isDirectChannel(this.session.channelId)) {
      this.session.isDirect = true
      this.params.chat_code = this.session.channelId
      this.path = '/user-chat/create-msg'
    } else {
      this.session.isDirect = false
      this.params.target_id = this.session.channelId
      this.path = '/message/create'
    }
  }

  async post(type: Kook.Type, content: string) {
    try {
      const params = { ...this.params, ...this.additional, type, content }
      const result = await this.bot.request('POST', this.path, params)
      if (!result.msg_id) return
      const session = this.bot.session()
      session.type = 'send'
      // https://github.com/satorijs/satori/issues/202
      // KOOK does not return the message content in the response
      session.content = ''
      session.messageId = result.msg_id
      session.timestamp = result.timestamp
      this.results.push(session.event.message)
      session.app.emit(session, 'send', session)
    } catch (e) {
      this.errors.push(e)
    }
  }

  private async transformUrl({ type, attrs }: h) {
    const src = attrs.src || attrs.url
    if (await this.bot.http.isLocal(src)) {
      const payload = new FormData()
      const result = await this.bot.http.file(src, attrs)
      payload.append('file', new Blob([result.data], { type: result.mime }), attrs.file || result.filename)
      const { data: { url } } = await this.bot.http.post('/asset/create', payload)
      return url
    } else if (!src.includes('kookapp.cn')) {
      const { data, headers } = await this.bot.ctx.http<ArrayBuffer>('GET', src, {
        headers: { accept: type + '/*' },
        responseType: 'arraybuffer',
        timeout: +attrs.timeout || undefined,
      })
      const payload = new FormData()
      payload.append('file', new Blob([data], { type: headers.get('Content-Type') }), 'file')
      const { data: { url } } = await this.bot.http.post('/asset/create', payload)
      return url
    } else {
      return src
    }
  }

  flushText() {
    const content = this.textBuffer.trim()
    if (!content) return
    this.textBuffer = ''
    this.cardBuffer.modules.push({
      type: 'section',
      text: {
        type: 'kmarkdown',
        content,
      },
    })
  }

  async flush(forceCard = false) {
    if (this.cardBuffer.modules.length || forceCard) {
      this.flushText()
      await this.post(Kook.Type.card, JSON.stringify([this.cardBuffer]))
      this.cardBuffer = {
        type: 'card',
        modules: [],
      }
    } else {
      const content = this.textBuffer.trim()
      if (!content) return
      this.textBuffer = ''
      await this.post(Kook.Type.kmarkdown, content)
    }
    this.additional = {}
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      // https://github.com/satorijs/satori/issues/51
      this.textBuffer += attrs.content.replace(/[\\*`~()]/g, '\\$&')
    } else if (type === 'b' || type === 'strong') {
      this.textBuffer += '**'
      await this.render(children)
      this.textBuffer += '**'
    } else if (type === 'i' || type === 'em') {
      this.textBuffer += '*'
      await this.render(children)
      this.textBuffer += '*'
    } else if (type === 'u' || type === 'ins') {
      this.textBuffer += '(ins)'
      await this.render(children)
      this.textBuffer += '(ins)'
    } else if (type === 's' || type === 'del') {
      this.textBuffer += '~~'
      await this.render(children)
      this.textBuffer += '~~'
    } else if (type === 'spl') {
      this.textBuffer += '(spl)'
      await this.render(children)
      this.textBuffer += '(spl)'
    } else if (type === 'code') {
      this.textBuffer += '`'
      await this.render(children)
      this.textBuffer += '`'
    } else if (type === 'a') {
      this.textBuffer += `[`
      await this.render(children)
      this.textBuffer += `](${attrs.href})`
    } else if (type === 'br') {
      this.textBuffer += '\n'
    } else if (type === 'p') {
      if (!this.textBuffer.endsWith('\n')) this.textBuffer += '\n'
      await this.render(children)
      if (!this.textBuffer.endsWith('\n')) this.textBuffer += '\n'
    } else if (type === 'at') {
      if (attrs.id) {
        this.textBuffer += `(met)${attrs.id}(met)`
      } else if (attrs.type === 'all') {
        this.textBuffer += `(met)all(met)`
      } else if (attrs.type === 'here') {
        this.textBuffer += `(met)here(met)`
      } else if (attrs.role) {
        this.textBuffer += `(rol)${attrs.role}(rol)`
      }
    } else if (type === 'code') {
      this.textBuffer += `\`${element.toString(true)}\``
    } else if (type === 'sharp') {
      this.textBuffer += `(chn)${attrs.id}(chn)`
    } else if (['video', 'audio', 'file', 'kook:video', 'kook:audio', 'kook:file'].includes(type)) {
      this.flushText()
      this.cardBuffer.modules.push({
        type: (type.startsWith('kook:') ? type.slice(5) : type) as never,
        src: await this.transformUrl(element),
        title: attrs.title,
        cover: attrs.poster,
      })
    } else if (type === 'img' || type === 'image' || type === 'kook:image') {
      this.flushText()
      this.cardBuffer.modules.push({
        type: 'container',
        elements: [{
          type: 'image',
          src: await this.transformUrl(element),
        }],
      })
    } else if (type === 'kook:image-group') {
      this.flushText()
      const elements = await Promise.all(element.children.map<Promise<Kook.Card.Image>>(async (child: h) => ({
        type: 'image',
        src: await this.transformUrl(child),
        title: child.attrs.title,
      })))
      while (elements.length) {
        this.cardBuffer.modules.push({
          type: 'image-group',
          elements: elements.splice(0, 9),
        })
      }
    } else if (type === 'button' || type === 'kook:button') {
      this.flushText()
      this.cardBuffer.modules.push({
        type: 'action-group',
        elements: [encodeButton(element)],
      })
    } else if (type === 'button-group' || type === 'kook:action-group') {
      this.flushText()
      const elements = element.children.map(encodeButton)
      while (elements.length) {
        this.cardBuffer.modules.push({
          type: 'action-group',
          elements: elements.splice(0, 4),
        })
      }
    } else if (type === 'hr' || type === 'kook:divider') {
      this.flushText()
      this.cardBuffer.modules.push({
        type: 'divider',
      })
    } else if (type === 'kook:header') {
      this.flushText()
      this.cardBuffer.modules.push({
        type: 'header',
        text: {
          type: attrs.type,
          content: attrs.content,
        },
      })
    } else if (type === 'kook:countdown') {
      this.flushText()
      this.cardBuffer.modules.push({
        type: 'countdown',
        startTime: +attrs.startTime,
        endTime: +attrs.endTime,
        mode: attrs.mode,
      })
    } else if (type === 'kook:invite') {
      this.flushText()
      this.cardBuffer.modules.push({
        type: 'invite',
        code: attrs.code,
      })
    } else if (type === 'kook:card') {
      await this.flush()
      this.cardBuffer.theme = attrs['kook:theme'] ?? (Kook.Card.Theme.includes(attrs.class) ? attrs.class : 'primary')
      this.cardBuffer.size = attrs['kook:size']
      await this.render(children)
      await this.flush(true)
    } else if (type === 'quote') {
      await this.flush()
      this.additional.quote = attrs.id
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else {
      await this.render(children)
    }
  }
}

export namespace KookMessageEncoder {
  export type HandleMixedContent = 'card' | 'separate' | 'mixed'

  export interface Config {
    handleMixedContent?: HandleMixedContent
  }

  export const Config: Schema<KookMessageEncoder.Config> = Schema.object({
    handleMixedContent: Schema.union([
      Schema.const('separate').description('将每个不同形式的内容分开发送'),
      Schema.const('card').description('使用卡片发送内容'),
      Schema.const('mixed').description('使用混合模式发送内容'),
    ]).role('radio').description('发送图文等混合内容时采用的方式。').default('separate'),
  }).description('发送设置')
}

function encodeButton({ attrs, children }: h): Kook.Card.Button {
  let theme: Kook.Card.Button.Theme = 'primary'
  if (attrs.class === 'secondary') theme = 'info'
  if (attrs.class === 'warning') theme = 'warning'
  if (attrs.class === 'danger') theme = 'danger'
  if (attrs.class === 'success') theme = 'success'
  return {
    type: 'button',
    theme,
    value: attrs.type === 'link' ? attrs.href : attrs.id,
    click: attrs.type === 'link' ? 'link' : 'return-val',
    text: {
      type: 'kmarkdown',
      content: encodeMarkdown(children),
    },
  }
}

function encodeMarkdown(children: h[]): string {
  let content = ''
  for (const element of children) {
    const { type, attrs, children } = element
    if (type === 'text') {
      content += attrs.content.replace(/[\\*`~()]/g, '\\$&')
    } else if (type === 'b' || type === 'strong') {
      content += '**' + encodeMarkdown(children) + '**'
    } else if (type === 'i' || type === 'em') {
      content += '*' + encodeMarkdown(children) + '*'
    } else if (type === 'u' || type === 'ins') {
      content += '(ins)' + encodeMarkdown(children) + '(ins)'
    } else if (type === 's' || type === 'del') {
      content += '~~' + encodeMarkdown(children) + '~~'
    } else if (type === 'spl') {
      content += '(spl)' + encodeMarkdown(children) + '(spl)'
    } else if (type === 'code') {
      content += '`' + element.toString(true) + '`'
    } else if (type === 'a') {
      content += `[${encodeMarkdown(children)}](${attrs.href})`
    }
  }
  return content
}
