import { Context, h, MessageEncoder } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { WechatOfficialBot } from './bot'
import xml2js from 'xml2js'
import { SendMessage } from './types'
import { downloadFile, transcodeAudioWithFfmpeg, transcodeWavToMp3 } from './utils'

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
    const res = await this.uploadMedia(element)
    if (!res || !res[0]) {
      this.bot.ctx.logger.warn(`多媒体素材 [${element.type}] 上传失败，跳过该素材发送`)
      return
    }
    const [media] = res

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
    const uploadType = element.type === 'audio' ? 'voice' : (element.type === 'img' ? 'image' : element.type)
    const form = new FormData()

    const { filename, data, type } = await downloadFile(this.bot.ctx.http, attrs.src || attrs.url)

    let uploadData: any = data
    let uploadFilename = attrs.file || filename || 'voice.mp3'
    let uploadMime = type

    if (uploadType === 'voice') {
      const isAlreadyMp3OrAmr =
        uploadMime?.includes('mpeg') ||
        uploadMime?.includes('mp3') ||
        uploadMime?.includes('amr') ||
        uploadFilename?.endsWith('.mp3') ||
        uploadFilename?.endsWith('.amr')

      if (!isAlreadyMp3OrAmr) {
        const priority = this.bot.config.audioTranscodePriority || 'internal'
        let converted: Buffer | null = null

        if (priority === 'internal') {
          try {
            converted = await transcodeWavToMp3(data)
          } catch (internalErr) {
            this.bot.ctx.logger.info(`内置 JS 音频转码未命中或失败 (${internalErr})，尝试降级回退至 FFmpeg 服务...`)
            try {
              converted = await transcodeAudioWithFfmpeg(this.bot.ctx, data)
            } catch (ffmpegErr) {
              this.bot.ctx.logger.warn(`音频转码双引擎均失败: 内置 (${internalErr}), FFmpeg (${ffmpegErr})`)
            }
          }
        } else {
          try {
            converted = await transcodeAudioWithFfmpeg(this.bot.ctx, data)
          } catch (ffmpegErr) {
            this.bot.ctx.logger.info(`FFmpeg 音频转码未命中或失败 (${ffmpegErr})，尝试降级回退至内置 JS 编码器...`)
            try {
              converted = await transcodeWavToMp3(data)
            } catch (internalErr) {
              this.bot.ctx.logger.warn(`音频转码双引擎均失败: FFmpeg (${ffmpegErr}), 内置 (${internalErr})`)
            }
          }
        }

        if (converted && converted.length > 0) {
          uploadData = converted
          uploadFilename = 'voice.mp3'
          uploadMime = 'audio/mpeg'
        } else {
          this.bot.ctx.logger.warn(`无法将语音素材 [${uploadFilename}] 转码为 MP3 格式，微信可能拒绝接收 (40005)`)
        }
      }
    }

    const value = new Blob([uploadData], { type: uploadMime })
    form.append('media', value, attrs.file || uploadFilename)

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
    if (resp.media_id) {
      return [resp.media_id, uploadType]
    }
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
    }
  }
}
