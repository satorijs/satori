import * as QQGuild from '@qq-guild-sdk/core'
import { Dict, Logger, Modulator, segment } from '@satorijs/satori'
import { QQGuildBot } from './bot'

const logger = new Logger('satori')

type File = {
  index: number
} & ({
  type: 'url'
  data: string
} | {
  type: 'filepath'
  data: string
} | {
  type: 'buffer'
  data: Buffer
})

function dataUrlToBuffer(dataUrl: string) {
  const [, data] = dataUrl.split(',')
  return Buffer.from(data, 'base64')
}

function base64ToBuffer(base64: string) {
  return Buffer.from(base64, 'base64')
}

function urlToBuffer(url: string) {
  if (url.startsWith('data:')) {
    return dataUrlToBuffer(url)
  } else if (url.startsWith('base64:')) {
    return base64ToBuffer(url.slice(7))
  } else {
    throw new Error(`Unsupported url: ${url}`)
  }
}

export class QQGuildModulator extends Modulator<QQGuildBot> {
  private contents: (string | null)[] = []
  private get content() {
    // contents 的 null 表示被文件或者其他非文本占用
    const content = this.contents?.[this.contents.length - 1] ?? null
    if (content === null) {
      this.contents.push('')
    }
    return this.contents[this.contents.length - 1]
  }
  private set content(val: string) {
    this.contents[this.contents.length - 1] = val
  }
  private addition = {
    files: [] as File[]
  }

  async flush() {
    const config = this.bot.config
    if (this.content) {
      const req: QQGuild.Message.Request = {
        content: this.content,
      }
      if (config.autoWithMsgId) {
        req.msgId = this.session.messageId
      }

      let sender = this.session.bot.internal.send as QQGuild.Sender
      let result: QQGuild.Message.Response
      if (this.session.channelId) {
        result = await sender.channel(this.session.channelId, req)
      } else if (this.session.uid) {
        result = await sender.private(this.session.uid, req)
      } else {
        throw new Error('Invalid session')
      }
      const session = this.bot.adaptMessage(result)
      this.results.push(session)
      session.app.emit(session, 'message', session)
    }
    this.content = ''
  }

  resolveFile(attrs: Dict) {
    const { url } = attrs as { url: string }
    const { files } = this.addition
    try {
      if (!url) {
        throw new Error('url is required')
      }
      let file: Partial<File>
      if (url.startsWith('file:')) {
        file = {
          type: 'filepath',
          data: url
        }
      } else if (['data:', 'base64:'].some((prefix) => url.startsWith(prefix))) {
        file = {
          type: 'buffer',
          data: urlToBuffer(url)
        }
      } else {
        throw new Error(`Unsupported url: ${url}`)
      }
      file.index = this.contents.length
      files.push(file as File)
      this.contents.push(null)
    } catch (e) {
      logger.warn(e)
    }
  }

  async visit(element: segment) {
    const { type, attrs, children } = element
    /**
     * at
     * sharp
     * quote
     */
    if (type === 'text') {
      this.content += attrs.content
    } else if ((type === 'image' || type === 'video' || type === 'audio' || type === 'file') && attrs.url) {
      this.resolveFile(attrs)
    } else if (type === 'message') {
      await this.flush()
      await this.render(children, true)
    } else {
      await this.render(children)
    }
  }
}
