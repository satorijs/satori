import { Adapter, Context } from '@satorijs/satori'
import { WecomBot } from './bot'
import xml2js from 'xml2js'
import { Message } from './types'
import { decodeMessage } from './utils'
import { decrypt, getSignature } from '@wecom/crypto'

export class HttpServer<C extends Context = Context> extends Adapter<C, WecomBot<C>> {
  constructor() {
    super()
  }

  async connect(bot: WecomBot) {
    await bot.refreshToken()
    await bot.getLogin()

    // https://developer.work.weixin.qq.com/document/10514
    bot.ctx.router.get('/wecom', async (ctx) => {
      let success = false
      const { msg_signature, timestamp, nonce, echostr } = ctx.request.query

      // for (const localBot of this.bots.filter(v => v.platform === 'wecom')) {
      const localSign = getSignature(bot.config.token, timestamp?.toString(), nonce?.toString(), echostr?.toString())
      if (localSign === msg_signature) {
        success = true
        const dec = decrypt(bot.config.aesKey, echostr?.toString())
        ctx.body = dec.message
      }
      // }
      if (!success) return ctx.status = 403
      ctx.status = 200
    })

    bot.ctx.router.post('/wecom', async (ctx) => {
      const { timestamp, nonce, msg_signature } = ctx.request.query
      let { xml: data }: {
        xml: Message
      } = await xml2js.parseStringPromise(ctx.request.rawBody, {
        explicitArray: false,
      })
      const botId = data.AgentID
      const localBot = this.bots.find((bot) => bot.selfId === botId)

      if (data.Encrypt) {
        const localSign = getSignature(localBot.config.token, timestamp?.toString(), nonce?.toString(), data.Encrypt)
        if (localSign !== msg_signature) return ctx.status = 403
        const { message } = decrypt(bot.config.aesKey, data.Encrypt)
        // if (id !== localBot.config.appid) return ctx.status = 403
        const { xml: data2 } = await xml2js.parseStringPromise(message, {
          explicitArray: false,
        })
        bot.logger.debug('decrypted %c', data2)
        data = data2
      }

      bot.logger.debug('%c', ctx.request.rawBody)

      const session = await decodeMessage(localBot, data)
      if (session) {
        localBot.dispatch(session)
        localBot.logger.debug(session)
      }
      ctx.status = 200
      ctx.body = 'success'
    })

    /** https://developer.work.weixin.qq.com/document/path/90254 */
    bot.ctx.router.get('/wecom/assets/:self_id/:media_id', async (ctx) => {
      const mediaId = ctx.params.media_id
      const selfId = ctx.params.self_id
      const localBot = this.bots.find((bot) => bot.selfId === selfId)
      if (!localBot) return ctx.status = 404
      const resp = await localBot.http.axios<ReadableStream>(`/cgi-bin/media/get`, {
        method: 'GET',
        responseType: 'stream',
        params: {
          access_token: localBot.token,
          media_id: mediaId,
        },
      })
      ctx.type = resp.headers['content-type']
      ctx.set('date', resp.headers['date'])
      ctx.set('cache-control', resp.headers['cache-control'])
      ctx.response.body = resp.data
      ctx.status = 200
    })

    bot.online()
  }
}
