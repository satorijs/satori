import { Adapter, Context, Logger, Quester, Schema, Time, WebSocketLayer } from '@satorijs/satori'
import { OneBotBot } from './bot'
import { dispatchSession, Response, TimeoutError } from './utils'

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
      protocol: Schema.const('ws').required(process.env.KOISHI_ENV !== 'browser'),
      responseTimeout: Schema.natural().role('time').default(Time.minute).description('等待响应的时间 (单位为毫秒)。'),
    }).description('连接设置'),
    Quester.createConfig(true),
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
    protocol: Schema.const('ws-reverse').required(process.env.KOISHI_ENV === 'browser'),
    path: Schema.string().description('服务器监听的路径。').default('/onebot'),
    responseTimeout: Schema.natural().role('time').default(Time.minute).description('等待响应的时间 (单位为毫秒)。'),
  }).description('连接设置')
}

let counter = 0
const listeners: Record<number, (response: Response) => void> = {}

export function accept(bot: OneBotBot<OneBotBot.BaseConfig & SharedConfig>) {
  bot.socket.addEventListener('message', ({ data }) => {
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

  bot.socket.addEventListener('close', () => {
    delete bot.internal._request
  })

  bot.internal._request = (action, params) => {
    const data = { action, params, echo: ++counter }
    data.echo = ++counter
    return new Promise((resolve, reject) => {
      listeners[data.echo] = resolve
      setTimeout(() => {
        delete listeners[data.echo]
        reject(new TimeoutError(params, action))
      }, bot.config.responseTimeout)
      bot.socket.send(JSON.stringify(data), (error) => {
        if (error) reject(error)
      })
    })
  }

  bot.initialize()
}
