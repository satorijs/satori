import { Adapter, Context } from '@satorijs/core'
import type {} from '@cordisjs/plugin-server'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { WechatOfficialBot } from './bot'
import xml2js from 'xml2js'
import { Message } from './types'
import { decodeMessage } from './utils'
import { decrypt, encrypt, getSignature } from '@wecom/crypto'

export class HttpServer extends Adapter<WechatOfficialBot> {
  static inject = ['server']

  async connect(bot: WechatOfficialBot) {
    await bot.refreshToken()
    await bot.ensureCustom()

    // https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
    bot.ctx.server.get('/wechat-official', async (req, res) => {
      let success = false
      const signature = req.query.get('signature')
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const echostr = req.query.get('echostr')

      for (const bot of this.bots) {
        const localSign = getSignature(bot.config.token, timestamp, nonce, '')
        if (localSign === signature) {
          success = true
          break
        }
      }
      if (!success) {
        res.status = 403
        return
      }
      res.status = 200
      res.body = echostr
    })

    bot.ctx.server.post('/wechat-official', async (req, res) => {
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const msg_signature = req.query.get('msg_signature')
      const rawBody = await req.text()
      bot.ctx.logger.debug('%c', rawBody)
      let { xml: data }: {
        xml: Message
      } = await xml2js.parseStringPromise(rawBody, {
        explicitArray: false,
      })
      const botId = data.ToUserName
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
        const { message, id } = decrypt(bot.config.aesKey, data.Encrypt)
        if (id !== localBot.config.appid) {
          res.status = 403
          return
        }
        const { xml: data2 } = await xml2js.parseStringPromise(message, {
          explicitArray: false,
        })
        bot.ctx.logger.debug('decrypted %c', data2)
        data = data2
      }

      const session = await decodeMessage(localBot, data)

      let resolveFunction: (text: string) => void
      const promise = new Promise((resolve, reject) => {
        if (localBot.config.customerService) return resolve('success')
        const timeout = setTimeout(() => {
          res.status = 200
          res.body = 'success'
          reject(new Error('timeout'))
        }, 4500)
        resolveFunction = (text: string) => {
          resolve(text)
          clearTimeout(timeout)
        }
      })
      if (session) {
        session.wechatOfficialResolve = resolveFunction
        localBot.dispatch(session)
        // localBot.logger.debug(session)
      }
      try {
        const result: any = await promise
        if (localBot.config.aesKey) {
          const builder = new xml2js.Builder({
            cdata: true,
            headless: true,
          })
          const encrypted = encrypt(localBot.config.aesKey, result, localBot.config.appid)
          const sign = getSignature(localBot.config.token, timestamp, nonce, encrypted)
          const xml = builder.buildObject({
            xml: {
              Encrypt: encrypted,
              Nonce: nonce,
              TimeStamp: timestamp,
              MsgSignature: sign,
            },
          })
          res.body = xml
          return
        }

        res.status = 200
        res.body = result
      } catch (error) {
        localBot.ctx.logger.warn('resolve timeout')
        res.status = 200
        res.body = 'success'
      }
    })

    bot.ctx.server.get('/wechat-official/assets/:self_id/:media_id', async (req, res) => {
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
