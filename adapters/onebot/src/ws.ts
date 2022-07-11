import { Adapter, Context, Logger, Quester, Schema, Time, WebSocketLayer } from '@satorijs/satori'
import { OneBotBot } from './bot'
import { dispatchSession, Response } from './utils'

const logger = new Logger('onebot')

interface SharedConfig<T = 'ws' | 'ws-reverse'> {
  protocol: T
  responseTimeout?: number
}

export class WsClient extends Adapter.WsClient<OneBotBot> {
  protected accept = accept

  prepare(bot: OneBotBot<OneBotBot.BaseConfig & WsClient.Config>) {
    const { token, endpoint } = bot.config
    const http = this.ctx.http.extend(bot.config)
    if (token) http.config.headers.Authorization = `Bearer ${token}`
    return http.ws(endpoint)
  }
}

export namespace WsClient {
  export interface Config extends SharedConfig<'ws'>, Quester.Config, Adapter.WsClient.Config {}

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('ws' as const).required(),
      responseTimeout: Schema.natural().role('time').default(Time.second * 5).description('等待响应的时间 (单位为秒)。'),
    }).description('连接设置'),
    Schema.object({
      endpoint: Schema.string().role('url').description('要连接的服务器地址。').required(),
      proxyAgent: Schema.string().role('url').description('使用的代理服务器地址。'),
      headers: Schema.dict(String).description('要附加的额外请求头。'),
      timeout: Schema.natural().role('ms').description('等待连接建立的最长时间。'),
    }).description('请求设置'),
    Adapter.WsClient.Config,
  ])
}

export class WsServer extends Adapter.Server<OneBotBot<OneBotBot.BaseConfig & WsServer.Config>> {
  public wsServer?: WebSocketLayer

  constructor(ctx: Context, bot: OneBotBot) {
    super()

    const { path = '/onebot' } = bot.config as WsServer.Config
    this.wsServer = ctx.router.ws(path, (socket, { headers }) => {
      logger.debug('connected with', headers)
      if (headers['x-client-role'] !== 'Universal') {
        return socket.close(1008, 'invalid x-client-role')
      }
      const selfId = headers['x-self-id'].toString()
      const bot = this.bots.find(bot => bot.selfId === selfId)
      if (!bot) return socket.close(1008, 'invalid x-self-id')

      bot.socket = socket
      accept(bot)
    })

    ctx.on('dispose', () => {
      logger.debug('ws server closing')
      this.wsServer.close()
    })
  }

  async stop(bot: OneBotBot) {
    bot.socket?.close()
    bot.socket = null
  }
}

export namespace WsServer {
  export interface Config extends SharedConfig<'ws-reverse'> {
    path?: string
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('ws-reverse' as const).required(),
    path: Schema.string().description('服务器监听的路径。').default('/onebot'),
    responseTimeout: Schema.natural().role('time').default(Time.second * 5).description('等待响应的时间 (单位为秒)。'),
  }).description('连接设置')
}

let counter = 0
const listeners: Record<number, (response: Response) => void> = {}

export function accept(bot: OneBotBot<OneBotBot.BaseConfig & SharedConfig>) {
  bot.socket.on('message', (data) => {
    let parsed: any
    try {
      parsed = JSON.parse(data.toString())
    } catch (error) {
      return logger.warn('cannot parse message', data)
    }

    if ('post_type' in parsed) {
      logger.debug('receive %o', parsed)
      dispatchSession(bot, parsed)
    } else if (parsed.echo in listeners) {
      listeners[parsed.echo](parsed)
      delete listeners[parsed.echo]
    }
  })

  bot.socket.on('close', () => {
    delete bot.internal._request
  })

  bot.internal._request = (action, params) => {
    const data = { action, params, echo: ++counter }
    data.echo = ++counter
    return new Promise((resolve, reject) => {
      listeners[data.echo] = resolve
      setTimeout(() => {
        delete listeners[data.echo]
        reject(new Error('response timeout'))
      }, bot.config.responseTimeout)
      bot.socket.send(JSON.stringify(data), (error) => {
        if (error) reject(error)
      })
    })
  }

  bot.initialize()
}
