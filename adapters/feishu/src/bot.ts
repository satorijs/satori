import { createReadStream } from 'fs'
import internal from 'stream'

import segment from '@satorijs/message'
import { Bot, Context } from '@satorijs/core'
import { Logger, Quester, Schema } from '@satorijs/satori'
import FormData from 'form-data'

import { HttpServer } from './http'
import { Internal, MessageContent } from './types'

type AssetType = 'image' | 'audio' | 'video' | 'file'

const logger = new Logger('feishu')

export class FeishuBot extends Bot<Context, FeishuBot.Config> {
  _token?: string
  http: Quester
  assetsQuester: Quester
  internal?: Internal

  constructor(ctx: Context, config: FeishuBot.Config) {
    super(ctx, config)

    this.selfId = config.appId

    this.http = ctx.http.extend({
      endpoint: config.endpoint ?? 'https://open.feishu.cn/open-apis/',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    this.assetsQuester = Quester.create()

    this.internal = new Internal(this.http)

    ctx.plugin(HttpServer, this)
  }

  async initialize(): Promise<void> {
    await this.refreshToken()
    this.online()
  }

  private async refreshToken(): Promise<void> {
    const { tenant_access_token: token } = await this.internal.getTenantAccessToken({
      app_id: this.config.appId,
      app_secret: this.config.appSecret,
    })
    logger.debug('refreshed token %s', token)
    this.token = token
    this.online()
  }

  get token() {
    return this._token
  }

  set token(v: string) {
    this._token = v
    this.http.config.headers.Authorization = `Bearer ${v}`
  }

  async sendMessage(channelId: string, content: string, guildId?: string): Promise<string[]> {
    const session = await this.session({ channelId, content, guildId, subtype: guildId ? 'group' : 'private' })
    if (!session?.content) return []

    const openIdType = channelId.startsWith('ou') ? 'open_id' : channelId.startsWith('on') ? 'union_id' : channelId.startsWith('oc') ? 'chat_id' : 'user_id'

    const chain = segment.parse(content)

    const messageIds: string[] = []
    let buffer: MessageContent.Text[] = []
    const sendBuffer = async () => {
      if (!buffer.length) return
      const data = await Promise.all(buffer.map(async (b) => {
        const { data } = await this.internal.sendMessage(openIdType, {
          msg_type: 'text',
          content: JSON.stringify(b),
          receive_id: channelId,
        })
        return data.message_id
      }))
      buffer = []
      messageIds.push(...data)
    }

    for (const message of chain) {
      const { type, data } = message
      switch (type) {
        case 'text':
          buffer.push({
            text: data.content,
          })
          break
        case 'at': {
          if (data.id) {
            buffer.push({
              text: `<at user_id="${data.id}">${data.name}</at>`,
            })
          } else if (data.type === 'all') {
            buffer.push({
              text: '<at user_id="all">all</at>',
            })
          } else if (data.type === 'here' || data.role) {
            logger.warn(`@here or @role{${data.role}} is not supported`)
          }
          break
        }
        case 'image':
        case 'audio':
        case 'video':
        case 'file': {
          await sendBuffer()
          const content = await this._prepareAssets(type, data)
          const { data: resp } = await this.internal.sendMessage(openIdType, {
            content: JSON.stringify(content),
            // video is marked as 'media' in feishu platform
            // see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json#54406d84
            msg_type: type === 'video' ? 'media' : type,
            receive_id: channelId,
          })
          messageIds.push(resp.message_id)
          break
        }

        case 'sharp':
        case 'face':
          logger.warn(`${type} is not supported`)
          break
      }
    }

    // assume there are no more messages in the buffer.
    await sendBuffer()

    return messageIds
  }

  private async _prepareAssets(type: AssetType, data: { url: string }): Promise<MessageContent.Contents> {
    const payload = new FormData()

    const assetKey = type === 'image' ? 'image' : 'file'
    const [schema, file] = data.url.split('://')
    const filename = schema === 'base64' ? 'unknown' : new URL(data.url).pathname.split('/').pop()
    if (schema === 'file') {
      payload.append(assetKey, createReadStream(file))
    } else if (schema === 'base64') {
      payload.append(assetKey, Buffer.from(file, 'base64'))
    } else {
      const resp = await this.assetsQuester.get<internal.Readable>(data.url, { responseType: 'stream' })
      payload.append(assetKey, resp)
    }

    if (type === 'image') {
      payload.append('image_type', 'message')
      const { data } = await this.internal.uploadImage(payload)
      return { image_key: data.image_key }
    } else {
      if (type === 'audio') {
        payload.append('file_type', 'opus')
      } else if (type === 'video') {
        payload.append('file_type', 'mp4')
      } else {
        const ext = filename.split('.').pop()
        if (['xls', 'ppt', 'pdf'].includes(ext)) {
          payload.append('file_type', ext)
        } else {
          payload.append('file_type', 'stream')
        }
      }
      payload.append('file_name', filename)
      const { data } = await this.internal.uploadFile(payload)
      return { file_key: data.file_key }
    }
  }
}

export namespace FeishuBot {
  export interface Config extends Bot.Config, HttpServer.Config, Quester.Config {
    path?: string
    appId: string
    appSecret: string
    encryptKey?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      path: Schema.string().role('url').description('要连接的服务器地址。').default('/feishu'),
      appId: Schema.string().required().description('机器人的应用 ID。'),
      appSecret: Schema.string().role('secret').required().description('机器人的应用密钥。'),
      encryptKey: Schema.string().role('secret').description('机器人的 Encrypt Key。'),
    }),
    Quester.Config,
    HttpServer.Config,
  ])
}

FeishuBot.prototype.platform = 'feishu'
