import { Context, Dict, h, MessageEncoder } from '@satorijs/core'
import { LarkBot } from './bot'
import { Im, Message } from './types'
import { EventPayload, extractIdType } from './utils'
import { MessageContent } from './content'

export class LarkMessageEncoder<C extends Context = Context> extends MessageEncoder<C, LarkBot<C>> {
  declare referrer?: EventPayload

  private quote: Dict | undefined
  private textContent = ''
  private richContent: MessageContent.RichText.Paragraph[] = []
  private card: MessageContent.Card | undefined
  private elements: MessageContent.Card.Element[] = []
  private inline = false

  public editMessageIds: string[] | undefined

  async post(data?: any) {
    try {
      let resp: Message
      let quote = this.quote
      if (!quote && this.referrer) {
        if (this.referrer.type === 'im.message.receive_v1' && this.referrer.event.message.thread_id) {
          quote = {
            id: this.referrer.event.message.message_id,
            replyInThread: true,
          }
        } else if (this.referrer.type === 'card.action.trigger') {
          // cannot determine whether the card is in thread or not
          const { items: [message] } = await this.bot.internal.im.message.get(this.referrer.event.context.open_message_id)
          if (message?.thread_id) {
            quote = {
              id: this.referrer.event.context.open_message_id,
              replyInThread: true,
            }
          }
        }
      }
      if (this.editMessageIds) {
        const messageId = this.editMessageIds.pop()
        if (!messageId) throw new Error('No message to edit')
        if (data.msg_type === 'interactive') {
          delete data.msg_type
          await this.bot.internal.im.message.patch(messageId, data)
        } else {
          await this.bot.internal.im.message.update(messageId, data)
        }
      } else if (quote?.id) {
        resp = await this.bot.internal.im.message.reply(quote.id, {
          ...data,
          reply_in_thread: quote.replyInThread,
        })
      } else {
        data.receive_id = this.channelId
        resp = await this.bot.internal.im.message.create(data, {
          receive_id_type: extractIdType(this.channelId),
        })
      }
      if (!resp) return
      const session = this.bot.session()
      session.messageId = resp.message_id
      session.timestamp = Number(resp.create_time) * 1000
      session.userId = resp.sender.id
      session.channelId = this.session.channelId
      session.guildId = this.session.guildId
      session.app.emit(session, 'send', session)
      this.results.push(session.event.message)
    } catch (e) {
      // try to extract error message from Lark API
      if (this.bot.http.isError(e)) {
        if (e.response?.data?.code) {
          const generalErrorMsg = `Check error code at https://open.larksuite.com/document/server-docs/getting-started/server-error-codes`
          e.message += ` (Lark error code ${e.response.data.code}: ${e.response.data.msg ?? generalErrorMsg})`
        }
      }
      this.errors.push(e)
    }
  }

  private flushText() {
    if (!this.textContent) return
    this.richContent.push([{ tag: 'md', text: this.textContent }])
    this.elements.push({ tag: 'markdown', content: this.textContent })
    this.textContent = ''
  }

  async flush() {
    this.flushText()
    if (!this.card && !this.richContent.length) return

    if (this.card) {
      // strip undefined properties
      this.bot.logger.debug('card %o', JSON.parse(JSON.stringify(this.card)))
      await this.post({
        msg_type: 'interactive',
        content: JSON.stringify(this.card),
      })
    } else {
      await this.post({
        msg_type: 'post',
        content: JSON.stringify({
          zh_cn: {
            content: this.richContent,
          },
        }),
      })
    }

    // reset cached content
    this.quote = undefined
    this.textContent = ''
    this.richContent = []
    this.card = undefined
  }

  async createImage(url: string) {
    const { filename, type, data } = await this.bot.assetsQuester.file(url)
    const { image_key } = await this.bot.internal.im.image.create({
      image_type: 'message',
      image: new File([data], filename, { type }),
    })
    return image_key
  }

  async sendFile(_type: 'video' | 'audio' | 'file', attrs: any) {
    const url: string = attrs.src || attrs.url
    const prefix = this.bot.getInternalUrl('/im/v1/files/')
    if (url.startsWith(prefix)) {
      const file_key = url.slice(prefix.length)
      await this.post({
        msg_type: _type === 'video' ? 'media' : _type,
        content: JSON.stringify({ file_key }),
      })
      return
    }

    const { filename, type, data } = await this.bot.assetsQuester.file(url)

    let file_type: Im.File.CreateForm['file_type']
    if (_type === 'audio') {
      // FIXME: only support opus
      file_type = 'opus'
    } else if (_type === 'video') {
      // FIXME: only support mp4
      file_type = 'mp4'
    } else {
      const ext = filename.split('.').pop()
      if (['doc', 'xls', 'ppt', 'pdf'].includes(ext)) {
        file_type = ext as any
      } else {
        file_type = 'stream'
      }
    }

    const form: Im.File.CreateForm = {
      file_type,
      file: new File([data], filename, { type }),
      file_name: filename,
    }
    if (attrs.duration) {
      form.duration = attrs.duration
    }

    const { file_key } = await this.bot.internal.im.file.create(form)
    await this.post({
      msg_type: _type === 'video' ? 'media' : _type,
      content: JSON.stringify({ file_key }),
    })
  }

  private createBehaviors(attrs: Dict) {
    const behaviors: MessageContent.Card.ActionBehavior[] = []
    if (attrs.type === 'link') {
      behaviors.push({
        type: 'open_url',
        default_url: attrs.href,
      })
    } else if (attrs.type === 'input' || attrs.type === 'submit') {
      behaviors.push({
        type: 'callback',
        value: {
          _satori_type: 'command',
          content: attrs.text,
        },
      })
    } else if (attrs.type === 'action') {
      // TODO
    }
    return behaviors.length ? behaviors : undefined
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.textContent += attrs.content
    } else if (type === 'at') {
      if (this.card) {
        if (attrs.type === 'all') {
          this.textContent += `<at id=all>${attrs.name ?? ''}</at>`
        } else {
          this.textContent += `<at id=${attrs.id}>${attrs.name ?? ''}</at>`
        }
      } else {
        if (attrs.type === 'all') {
          this.textContent += `<at user_id="all">${attrs.name ?? ''}</at>`
        } else {
          this.textContent += `<at user_id="${attrs.id}">${attrs.name ?? ''}</at>`
        }
      }
    } else if (type === 'a') {
      await this.render(children)
      if (attrs.href) this.textContent += ` (${attrs.href})`
    } else if (type === 'p') {
      if (!this.textContent.endsWith('\n')) this.textContent += '\n'
      await this.render(children)
      if (!this.textContent.endsWith('\n')) this.textContent += '\n'
    } else if (type === 'br') {
      this.textContent += '\n'
    } else if (type === 'sharp') {
      // platform does not support sharp
    } else if (type === 'quote') {
      await this.flush()
      this.quote = attrs
    } else if (type === 'img' || type === 'image') {
      const image_key = await this.createImage(attrs.src || attrs.url)
      this.textContent += `![${attrs.alt ?? '图片'}](${image_key})`
      this.flushText()
      this.richContent.push([{ tag: 'img', image_key }])
    } else if (['video', 'audio', 'file'].includes(type)) {
      await this.flush()
      await this.sendFile(type as any, attrs)
    } else if (type === 'lark:img') {
      this.flushText()
      this.elements.push({
        tag: 'img',
        alt: attrs.alt,
        img_key: attrs.imgKey,
        transparent: attrs.transparent,
        preview: attrs.preview,
        corner_radius: attrs.cornerRadius,
        scale_type: attrs.scaleType,
        size: attrs.size,
        mode: attrs.mode,
        margin: attrs.margin,
      })
    } else if (type === 'figure' || type === 'message') {
      await this.flush()
      await this.render(children, true)
    } else if (type === 'hr') {
      this.flushText()
      this.richContent.push([{ tag: 'hr' }])
      this.elements.push({
        tag: 'hr',
        margin: attrs.margin,
      })
    } else if (type === 'form') {
      this.flushText()
      const parent = this.elements
      parent.push({
        tag: 'form',
        name: attrs.name || 'Form',
        elements: this.elements = [],
      })
      await this.render(children)
      this.elements = parent
    } else if (type === 'input') {
      if (attrs.type === 'checkbox') {
        this.flushText()
        await this.render(children)
        this.elements.push({
          tag: 'checker',
          name: (attrs.argument ? '@@' : attrs.option ? `@${attrs.option}=` : '') + attrs.name,
          checked: attrs.value,
          disabled: attrs.disabled,
          text: {
            tag: 'lark_md',
            content: this.textContent,
          },
          hover_tips: attrs.hoverTips && {
            tag: 'plain_text',
            content: attrs.hoverTips,
          },
          disabled_tips: attrs.disabledTips && {
            tag: 'plain_text',
            content: attrs.disabledTips,
          },
          behaviors: this.createBehaviors(attrs),
          margin: attrs.margin,
        })
        this.textContent = ''
      } else if (attrs.type === 'submit') {
        this.flushText()
        await this.render(children)
        this.elements.push({
          tag: 'button',
          name: attrs.name,
          width: attrs.width,
          text: {
            tag: 'plain_text',
            content: this.textContent,
          },
          form_action_type: 'submit',
          behaviors: this.createBehaviors(attrs),
          margin: attrs.margin,
        })
        this.textContent = ''
      } else {
        this.flushText()
        const input: MessageContent.Card.InputElement = {
          tag: 'input',
          name: attrs.name,
          width: attrs.width,
          label: attrs.label && {
            tag: 'plain_text',
            content: attrs.label,
          },
          placeholder: attrs.placeholder && {
            tag: 'plain_text',
            content: attrs.placeholder,
          },
          disabled_tips: attrs.disabledTips && {
            tag: 'plain_text',
            content: attrs.disabledTips,
          },
          default_value: attrs.value,
          disabled: attrs.disabled,
          required: attrs.required,
          behaviors: this.createBehaviors(attrs),
          margin: attrs.margin,
        }
        this.elements.push(input)
      }
    } else if (type === 'select') {
      this.flushText()
      const select: MessageContent.Card.SelectElement = {
        tag: 'select_static',
        name: attrs.name,
        width: attrs.width,
        initial_option: attrs.value,
        disabled: attrs.disabled,
        required: attrs.required,
        placeholder: attrs.placeholder && {
          tag: 'plain_text',
          content: attrs.placeholder,
        },
        options: [],
        behaviors: this.createBehaviors(attrs),
        margin: attrs.margin,
      }
      for (const child of children) {
        if (child.type !== 'option') continue
        await this.render(child.children)
        select.options.push({
          value: child.attrs.value,
          text: {
            tag: 'plain_text',
            content: this.textContent ?? child.attrs.value,
          },
        })
        this.textContent = ''
      }
      this.elements.push(select)
    } else if (type === 'button') {
      this.flushText()
      await this.render(children)
      this.elements.push({
        tag: 'button',
        text: {
          tag: 'plain_text',
          content: this.textContent,
        },
        disabled: attrs.disabled,
        type: attrs['lark:type'],
        size: attrs['lark:size'],
        width: attrs['lark:width'],
        icon: attrs['lark:icon'] && {
          tag: 'standard_icon',
          token: attrs['lark:icon'],
          color: attrs['lark:icon-color'],
        },
        hover_tips: attrs.hoverTips && {
          tag: 'plain_text',
          content: attrs.hoverTips,
        },
        disabled_tips: attrs.disabledTips && {
          tag: 'plain_text',
          content: attrs.disabledTips,
        },
        behaviors: this.createBehaviors(attrs),
        margin: attrs.margin,
      })
      this.textContent = ''
    } else if (type === 'div') {
      this.flushText()
      this.inline = true
      await this.render(children)
      this.inline = false
      this.elements.push({
        tag: 'markdown',
        text_align: attrs.align,
        text_size: attrs.size,
        content: this.textContent,
        margin: attrs.margin,
        icon: attrs.icon && {
          tag: 'standard_icon',
          token: attrs.icon,
          color: attrs.iconColor,
        },
      })
      this.textContent = ''
    } else if (type.startsWith('lark:') || type.startsWith('feishu:')) {
      const tag = type.slice(type.split(':', 1)[0].length + 1)
      if (tag === 'share-chat') {
        await this.flush()
        await this.post({
          msg_type: 'share_chat',
          content: JSON.stringify({ chat_id: attrs.chatId }),
        })
      } else if (tag === 'share-user') {
        await this.flush()
        await this.post({
          msg_type: 'share_user',
          content: JSON.stringify({ user_id: attrs.userId }),
        })
      } else if (tag === 'system') {
        await this.flush()
        await this.render(children)
        await this.post({
          msg_type: 'system',
          content: JSON.stringify({
            type: 'divider',
            params: { divider_text: { text: this.textContent } },
            options: { need_rollup: attrs.needRollup },
          }),
        })
        this.textContent = ''
      } else if (tag === 'card') {
        await this.flush()
        this.card = {
          schema: '2.0',
          config: {
            summary: attrs.summary && {
              content: attrs.summary,
            },
            enable_forward: attrs.enableForward,
            update_multi: attrs.updateMulti,
            enable_forward_interaction: attrs.enableForwardInteraction,
            style: typeof attrs.style === 'string' ? JSON.parse(attrs.style) : attrs.style,
          },
          header: attrs.title && {
            template: attrs.color,
            icon: attrs.icon && {
              tag: 'standard_icon',
              token: attrs.icon,
              color: attrs.iconColor,
            },
            title: {
              tag: 'plain_text',
              content: attrs.title,
            },
            subtitle: attrs.subtitle && {
              tag: 'plain_text',
              content: attrs.subtitle,
            },
          },
          body: {
            direction: attrs.direction,
            padding: attrs.padding,
            horizontal_spacing: attrs.horizontalSpacing,
            horizontal_align: attrs.horizontalAlign,
            vertical_spacing: attrs.verticalSpacing,
            vertical_align: attrs.verticalAlign,
            elements: this.elements = [],
          },
        }
        await this.render(children, true)
      } else if (tag === 'interactive-container') {
        this.flushText()
        const parent = this.elements
        parent.push({
          tag: 'interactive_container',
          disabled: attrs.disabled,
          width: attrs.width,
          height: attrs.height,
          margin: attrs.margin,
          padding: attrs.padding,
          background_style: attrs.backgroundStyle,
          vertical_align: attrs.verticalAlign,
          vertical_spacing: attrs.verticalSpacing,
          horizontal_align: attrs.horizontalAlign,
          horizontal_spacing: attrs.horizontalSpacing,
          direction: attrs.direction,
          has_border: attrs.hasBorder,
          border_color: attrs.borderColor,
          corner_radius: attrs.cornerRadius,
          elements: this.elements = [],
          hover_tips: attrs.hoverTips && {
            tag: 'plain_text',
            content: attrs.hoverTips,
          },
          disabled_tips: attrs.disabledTips && {
            tag: 'plain_text',
            content: attrs.disabledTips,
          },
          behaviors: this.createBehaviors(attrs),
        })
        await this.render(children)
        this.flushText()
        this.elements = parent
      } else if (tag === 'column-set') {
        this.flushText()
        const columns: MessageContent.Card.ColumnElement[] = []
        this.elements.push({
          tag: 'column_set',
          margin: attrs.margin,
          flex_mode: attrs.flexMode,
          horizontal_align: attrs.horizontalAlign,
          horizontal_spacing: attrs.horizontalSpacing,
          background_style: attrs.backgroundStyle,
          columns,
        })
        const parent = this.elements
        for (const child of children) {
          if (child.type !== 'lark:column' && child.type !== 'feishu:column') {
            // throw unexpected?
            continue
          }
          this.elements = []
          await this.render(child.children)
          this.flushText()
          columns.push({
            tag: 'column',
            width: child.attrs.width,
            weight: child.attrs.weight,
            margin: child.attrs.margin,
            padding: child.attrs.padding,
            vertical_align: child.attrs.verticalAlign ?? 'center',
            vertical_spacing: child.attrs.verticalSpacing ?? '0px',
            background_style: child.attrs.backgroundStyle,
            elements: this.elements,
          })
        }
        this.elements = parent
      }
    } else if (type === 'button-group') {
      this.flushText()
      const parent = this.elements
      this.elements = []
      await this.render(children)
      this.flushText()
      parent.push({
        tag: 'column_set',
        margin: attrs.margin,
        flex_mode: attrs.flexMode,
        horizontal_align: attrs.horizontalAlign,
        horizontal_spacing: attrs.horizontalSpacing,
        background_style: attrs.backgroundStyle,
        columns: this.elements.map((element) => ({
          tag: 'column',
          elements: [element],
        })),
      })
      this.elements = parent
    } else {
      await this.render(children)
    }
  }
}

export { LarkMessageEncoder as FeishuMessageEncoder }
