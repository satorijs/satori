import { Context, h, MessageEncoder } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { WechatOfficialBot } from './bot'
import xml2js from 'xml2js'
import { SendMessage } from './types'
import { downloadFile } from './utils'

// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html
export class WechatOfficialMessageEncoder extends MessageEncoder<WechatOfficialBot> {
  buffer = ''
  sent = false

  upsertSend() {
    const session = this.bot.session()
    session.type = 'message'
    session.isDirect = true
    session.userId = this.bot.selfId
    session.timestamp = new Date().valueOf()
    // session.app.emit(session, 'send', session)
    // this.results.push(session.event.message)
  }

  async sendByHttpResponse(payload: Partial<SendMessage>) {
    if (payload.MsgType === 'text' && !payload.Content.length) return
    if (this.sent) {
      this.bot.ctx.logger.error('flushed twice')
      return
    }
    if (new Date().valueOf() - this.options.session.timestamp > 5000) {
      this.bot.ctx.logger.error('timeout %c', this.options.session.timestamp)
      return
    }
    payload = {
      ToUserName: this.options.session.userId,
      FromUserName: this.bot.selfId,
      CreateTime: Math.floor(new Date().valueOf() / 1000),
      ...payload,
    }
    const builder = new xml2js.Builder({
      cdata: true,
      headless: true,
    })
    const xml = builder.buildObject({
      xml: payload,
    })
    this.options.session.wechatOfficialResolve(xml)
    this.sent = true

    this.upsertSend()
  }

  async sendByCustom(payload: any) {
    if (payload.msgtype === 'text' && !payload.text.content) return
    await this.bot.http.post('/cgi-bin/message/custom/send', {
      touser: this.options.session.userId,
      ...payload,
    }, {
      params: { access_token: this.bot.token },
    })

    this.upsertSend()
  }

  async flushMedia(element: h) {
    if (!['audio', 'video', 'image', 'img'].includes(element.type)) return
    let type = element.type
    if (type === 'audio') type = 'voice'
    if (type === 'img') type = 'image'
    const result = await this.uploadMedia(element)
    if (!result) return
    const [media] = result

    if (this.options.session.wechatOfficialResolve && !this.bot.config.customerService) {
      await this.sendByHttpResponse({
        // @ts-ignore
        MsgType: type,
        [type[0].toUpperCase() + type.slice(1)]: {
          MediaId: media,
        },
      })
      return
    }
    if (this.bot.config.customerService) {
      await this.sendByCustom({
        msgtype: type,
        [type]: {
          media_id: media,
        },
      })
    }
  }

  async flush(): Promise<void> {
    if (this.options.session.wechatOfficialResolve && !this.bot.config.customerService) {
      await this.sendByHttpResponse({
        MsgType: 'text',
        Content: this.buffer,
      })
    }
    if (this.bot.config.customerService) {
      await this.sendByCustom({
        msgtype: 'text',
        text: {
          content: this.buffer,
        },
      })
    }
  }

  // https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/New_temporary_materials.html
  async uploadMedia(element: h) {
    const { attrs } = element
    let uploadType = element.type
    if (uploadType === 'audio') uploadType = 'voice'
    if (uploadType === 'img') uploadType = 'image'
    const form = new FormData()

    const { filename, data, type } = await downloadFile(this.bot.ctx.http, attrs.src || attrs.url)
    const value = new Blob([data], { type })
    form.append('media', value, attrs.file || filename)

    const resp = await this.bot.http.post<{
      type: string
      media_id: string
      created_at: number
      errcode: number
      errmsg: string
    }>('/cgi-bin/media/upload', form, {
      params: {
        access_token: this.bot.token,
        type: uploadType,
      },
    })
    let resData: any = resp
    if (typeof resData === 'string') {
      try {
        resData = JSON.parse(resData)
      } catch {}
    }
    if (resData?.errcode === 40001) {
      this.bot.logger.warn('access_token expired, refreshing token and retrying upload...')
      await this.bot.refreshToken()
      const retryResp = await this.bot.http.post<{
        type: string
        media_id: string
        created_at: number
        errcode: number
        errmsg: string
      }>('/cgi-bin/media/upload', form, {
        params: {
          access_token: this.bot.token,
          type: uploadType,
        },
      })
      resData = retryResp
      if (typeof resData === 'string') {
        try {
          resData = JSON.parse(resData)
        } catch {}
      }
    }
    if (resData?.media_id) {
      return [resData.media_id, uploadType]
    }
    this.bot.logger.warn('failed to upload media to wechat: %s, %s', resData?.errcode, resData?.errmsg)
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += attrs.content
    } else if (type === 'br') {
      this.buffer += '\n'
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
    } else if (type === 'img' || type === 'image' || type === 'audio' || type === 'video') {
      await this.flushMedia(element)
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else if (type === 'a') {
      let tag = `<a`
      for (const [key, value] of Object.entries(attrs)) {
        if (value !== undefined && value !== null) {
          const k = key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
          tag += ` ${k}="${String(value).replace(/"/g, '&quot;')}"`
        }
      }
      tag += `>`
      this.buffer += tag
      await this.render(children)
      this.buffer += `</a>`
    } else {
      await this.render(children)
    }
  }
}
