import { arrayBufferToBase64, Bot, Context, Dict, Element, h, Quester, Schema, Time, Universal } from '@satorijs/satori'
import { decodeGuildMember, decodeUser, encodeDataUrl } from './utils'
import { TelegramMessageEncoder } from './message'
import { HttpServer } from './server'
import { HttpPolling } from './polling'
import FileType from 'file-type'


import MTProto from "./mtproto/mod.ts"
import factory from "./mtproto/transport/connection/node-tcp";
import Abridged from "./mtproto/transport/codec/abridged";
import JsonDB from "./mtproto/storage/jsondb";
import { sendCode } from "./mtproto/auth/user";
import RPC from './mtproto/rpc/mod'
import { api, upload } from './mtproto/gen/api'
import { parseText } from './decoder'


export class SenderError extends Error {
  constructor(args: Dict<any>, url: string, retcode: number, selfId: string) {
    super(`Error when trying to send to ${url}, args: ${JSON.stringify(args)}, retcode: ${retcode}`)
    Object.defineProperties(this, {
      name: { value: 'SenderError' },
      selfId: { value: selfId },
      code: { value: retcode },
      args: { value: args },
      url: { value: url },
    })
  }
}

export interface TelegramResponse {
  ok: boolean
  result: any
}

export class TelegramBot<C extends Context = Context, T extends TelegramBot.Config = TelegramBot.Config> extends Bot<C, T> {
  static MessageEncoder = TelegramMessageEncoder
  static inject = ['http']

  http: Quester
  file: Quester
  local?: boolean
  server?: string

  proto: MTProto
  rpc?: RPC

  constructor(ctx: C, config: T) {
    super(ctx, config, 'telegram')

    const db = new JsonDB("diag_mod.json");
    this.proto = new MTProto({
      api_id: 24862414,
      api_hash: "1745670d4621f50d831db069ecc40285",
      environment: {
        app_version: "8.6.1",
        device_model: "Unknown",
        system_version: "1.0.0",
      },
      ipv6_policy: "ipv4",
      transport_factory: factory(() => new Abridged()),
      storage: db,
      initdc: { test: true, id: 2, ip: "149.154.167.40", port: 443 }
    })

    this.initialize()

    ctx.on('dispose', () => {
      this.proto?.shutdown()
    })
    // this.selfId = config.token.split(':')[0]
    // this.local = config.files.local
    // this.http = this.ctx.http.extend({
    //   ...config,
    //   endpoint: `${config.endpoint}/bot${config.token}`,
    // })
    // this.file = this.ctx.http.extend({
    //   ...config,
    //   endpoint: `${config.files.endpoint || config.endpoint}/file/bot${config.token}`,
    // })
    // this.internal = new Telegram.Internal(this)
    // if (config.protocol === 'server') {
    //   ctx.plugin(HttpServer, this)
    // } else if (config.protocol === 'polling') {
    //   ctx.plugin(HttpPolling, this)
    // }
    // const selfUrl: string = config['selfUrl'] || ctx.get('server')?.config.selfUrl
    // if (config.files.server ?? selfUrl) {
    //   const route = `/telegram/${this.selfId}`
    //   this.server = selfUrl + route
    //   ctx.get('server').get(route + '/:file+', async ctx => {
    //     const { data, mime } = await this.$getFile(ctx.params.file)
    //     ctx.set('content-type', mime)
    //     ctx.body = Buffer.from(data)
    //   })
    // }
  }

  async initialize() {
    await this.proto.init();

    // @ts-ignore
    this.rpc = await this.proto.rpc();

    await sendCode(this.proto, {
      async askCode() {
        return '22222'
      },
      async askPassword(hint) {
        return 'no'
      },
      async askSignUp() {
        return {
          first_name: 'test',
          last_name: 'test',
        }
      },
    }, '+9996622222');

    console.log(await this.getLogin())
    this.logger.debug('connected to %c', 'telegram:' + this.selfId)
    this.online()

    this.rpc.on('updateNewMessage', async (upd) => {
      const session = this.session()
      session.setInternal('updateNewMessage', upd)
      session.type = 'message-created'
      if(upd.message._ !== 'message') return
      session.event.type = 'message'
      session.event.message = {
        elements: await this.decodeElements([upd.message]),
        id: upd.message.id.toString(),
      }
      session.messageId = upd.message.id.toString()
      session.event.id = upd.message.id
      session.event.channel = {
        id: upd.message.peer_id.toString(),
        type: Universal.Channel.Type.DIRECT,
        name: upd.message.peer_id.toString(),
      },
      session.event.platform = 'mtproto'
      this.dispatch(session)
    })
  }

  peerInfoCache = new Map<string, api.User | api.Chat>()
  async getPeer(peerId: api.Peer) {
    if (peerId._ === 'peerUser') {
      return await this.rpc.api.users.getUsers({
        id: [peerId.user_id]
      })
    }
    if (this.peerInfoCache.has(peerId)) {
      return this.peerInfoCache.get(peerId)
    }

    const peer = await this.rpc.api.contacts.resolveUsername({
      username: peerId
    })

    this.peerInfoCache.set(peerId, peer)
    return peer
  }

  async decodeElements(message: api.Message[]): Promise<Element[]> {
    const messages = message as (api.Message & { _: "message" })[]

    const elements: h[] = []

    for (const msg of messages) {
      if (msg._ === "message") {
        const txt = msg.message || msg.media?.[0].caption
        if (txt) {
          const textEntities = parseText(txt, msg.entities)
          elements.push(...textEntities)
        }

        if (msg.media) {
          if (msg.media._ === 'messageMediaPhoto') {
            const photo = msg.media.photo
            if (photo._ === 'photo') {
              elements.push(h('img', { src: await this.getPhotoUrl(photo, 'medium') }))
            }
          }
        }
      }
    }

    return elements
  }

  async getLogin() {
    const data = await this.rpc.api.users.getFullUser({
      id: {
        _: 'inputUserSelf',
      },
    })
    const user = decodeUser(data.users[0])
    this.user = user
    this.user.avatar = await this.getUserAvatar({ _: 'inputUserSelf' })

    return this.toJSON()
  }

  private async getUserAvatar(user: api.InputUser) {
    const photos = await this.rpc.api.photos.getUserPhotos({
      user_id: user,
      offset: 0,
      max_id: 1n,
      limit: 1,
    })

    if (photos.photos.length !== 0 && photos.photos[0]._ !== 'photoEmpty') {
      const photoId = photos.photos[0]

      const smallestSize = photoId.sizes[0]
      if (smallestSize._ !== 'photoSize') return;

      const photo = await this.getPhotoUrl(photoId, 'medium')
      return photo
    }

    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAOElEQVR42mNkYGD4z0ABYBw1gY'
  }

  async getPhotoUrl(file: api.Photo, size: 'small' | 'medium' | 'big') {
    const photo = await this.fetchPhoto(file, { size })
    return encodeDataUrl(photo)
  }

  async fetchPhoto(file: api.Photo, options: {
    size: 'small' | 'medium' | 'big'
  }) {
    if (file._ === 'photoEmpty') return null;

    const sizes = file.sizes
    const s = ['small', 'medium', 'big']
    const index = s.indexOf(options.size)
    if (index === -1) throw new Error('invalid size')
    const size = sizes[Math.floor(sizes.length / 3) * index]

    if (size._ !== 'photoSize') return null

    return this.fetchFile({
      _: 'inputPhotoFileLocation',
      id: file.id,
      access_hash: file.access_hash,
      file_reference: file.file_reference,
      thumb_size: size.type
    }, size.size)
  }

  async downloadFilePart(req: (offset: number) => Promise<{ bytes: ArrayBuffer }>, total: number, init?: Uint8Array) {
    const data = new Uint8Array(total)
    let offset = 0
    if (init) {
      data.set(init)
      offset = init.length
    }

    while (offset < total) {
      const { bytes } = await req(offset)
      data.set(new Uint8Array(bytes), offset)
      offset += bytes.byteLength
    }

    return data
  }

  async fetchFile(location: api.InputFileLocation, size: number) {
    const BATCH_SIZE = 1024 * 4
    let data: Uint8Array
    let mime: string
    const file = await this.rpc.api.upload.getFile({
      location,
      offset: 0n,
      limit: BATCH_SIZE
    })

    const mimeTypeMap = {
      'storage.fileJpeg': 'image/jpeg',
      'storage.fileGif': 'image/gif',
      'storage.filePng': 'image/png',
      'storage.filePdf': 'application/pdf',
      'storage.fileMp3': 'audio/mpeg',
      'storage.fileMov': 'video/quicktime',
      'storage.fileMp4': 'video/mp4',
      'storage.fileWebp': 'image/webp',
      'storage.fileUnknown': 'application/octet-stream',
    }

    if (file._ === 'upload.file') {
      mime = mimeTypeMap[file.type._]
      data = await this.downloadFilePart(offset =>
        this.rpc.api.upload.getFile({
          location,
          offset: BigInt(offset),
          limit: BATCH_SIZE
        }) as any, size, file.bytes)
    }
    else if (file._ === 'upload.fileCdnRedirect') {
      // TODO: determine real mime type
      mime = 'application/octet-stream'
      const reqCdn = token => offset => this.rpc.api.upload.getCdnFile({
        file_token: token,
        offset: BigInt(offset),
        limit: BATCH_SIZE,
      })

      const file2 = await reqCdn(file.file_token)(0)
      if (file2._ === 'upload.cdnFileReuploadNeeded') {
        const file3 = await this.rpc.api.upload.reuploadCdnFile({
          file_token: file.file_token,
          request_token: file2.request_token
        })

        const file4 = await this.downloadFilePart(reqCdn(file3[0].hash) as any, size)
        data = file4
      } else {
        const file3 =
          await this.downloadFilePart(reqCdn(file.file_token) as any,
            size, file2.bytes)

        data = file3
      }
    }

    return {
      data, mime
    }
  }
}

export namespace TelegramBot {
  export interface BaseConfig extends Quester.Config {
    protocol: 'server' | 'polling'
    token: string
    files?: Config.Files
    slash?: boolean
  }

  export type Config = BaseConfig & (HttpServer.Options | HttpPolling.Options)

  export namespace Config {
    export interface Files {
      endpoint?: string
      local?: boolean
      server?: boolean
    }
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().description('机器人的用户令牌。').role('secret'),
      protocol: process.env.KOISHI_ENV === 'browser'
        ? Schema.const('polling').default('polling')
        : Schema.union(['server', 'polling']).description('选择要使用的协议。'),
    }),
    Schema.union([
      HttpServer.Options,
      HttpPolling.Options,
    ]).description('推送设置'),
    Schema.object({
      slash: Schema.boolean().description('是否启用斜线指令。').default(true),
    }).description('功能设置'),
    Quester.createConfig('https://api.telegram.org'),
    Schema.object({
      files: Schema.object({
        endpoint: Schema.string().description('文件请求的终结点。'),
        local: Schema.boolean().description('是否启用 [Telegram Bot API](https://github.com/tdlib/telegram-bot-api) 本地模式。'),
        server: Schema.boolean().description('是否启用文件代理。若开启将会使用 `selfUrl` 进行反代，否则会下载所有资源文件 (包括图片、视频等)。当配置了 `selfUrl` 时将默认开启。'),
      }),
    }).hidden(process.env.KOISHI_ENV === 'browser').description('文件设置'),
  ] as const)
}
