import { Adapter, Context } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import type {} from '@cordisjs/plugin-server'
import { WecomBot } from './bot'
import xml2js from 'xml2js'
import { Message } from './types'
import { decodeMessage } from './utils'
import { decrypt, getSignature } from '@wecom/crypto'

export class HttpServer extends Adapter<WecomBot> {
  static inject = ['server']

  async connect(bot: WecomBot) {
    await bot.refreshToken()
    await bot.getLogin()

    // https://developer.work.weixin.qq.com/document/10514
    bot.ctx.server.get('/wecom', async (req, res) => {
      let success = false
      const msg_signature = req.query.get('msg_signature')
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const echostr = req.query.get('echostr')

      // for (const localBot of this.bots.filter(v => v.platform === 'wecom')) {
      const localSign = getSignature(bot.config.token, timestamp, nonce, echostr)
      if (localSign === msg_signature) {
        success = true
        const dec = decrypt(bot.config.aesKey, echostr)
        res.body = dec.message
      }
      // }
      if (!success) {
        res.status = 403
        return
      }
      res.status = 200
    })

    bot.ctx.server.post('/wecom', async (req, res) => {
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const msg_signature = req.query.get('msg_signature')
      const rawBody = await req.text()
      bot.ctx.logger.debug(rawBody)
      let { xml: data }: {
        xml: Message
      } = await xml2js.parseStringPromise(rawBody, {
        explicitArray: false,
      })
      const botId = data.AgentID
      const localBot = this.bots.find((bot) => bot.selfId === botId)
      if (!localBot) {
        res.status = 403
        return
      }

      if (data.Encrypt) {
        const localSign = getSignature(localBot.config.token, timestamp, nonce, data.Encrypt)
        if (localSign !== msg_signature) {
          res.status = 403
          return
        }
        const { message } = decrypt(bot.config.aesKey, data.Encrypt)
        // if (id !== localBot.config.appid) return ctx.status = 403
        const { xml: data2 } = await xml2js.parseStringPromise(message, {
          explicitArray: false,
        })
        bot.ctx.logger.debug('decrypted %c', data2)
        data = data2
      }

      const session = await decodeMessage(localBot, data)
      if (session) {
        localBot.dispatch(session)
        localBot.ctx.logger.debug(session)
      }
      res.status = 200
      res.body = 'success'
    })

    /** https://developer.work.weixin.qq.com/document/path/90254 */
    bot.ctx.server.get('/wecom/assets/:self_id/:media_id', async (req, res) => {
      const mediaId = req.params.media_id
      const selfId = req.params.self_id
      const localBot = this.bots.find((bot) => bot.selfId === selfId)
      if (!localBot) {
        res.status = 404
        return
      }
      const resp = await localBot.http(`/cgi-bin/media/get`, {
        method: 'GET',
        params: {
          access_token: localBot.token,
          media_id: mediaId,
        },
      })
      res.headers.set('content-type', resp.headers.get('content-type')!)
      res.headers.set('date', resp.headers.get('date')!)
      res.headers.set('cache-control', resp.headers.get('cache-control')!)
      res.body = resp.body
      res.status = 200
    })

    bot.online()
  }
}
