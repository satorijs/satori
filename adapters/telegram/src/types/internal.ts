import { TelegramBot } from '../bot'

export interface Internal {}

export class Internal {
  constructor(public bot: TelegramBot) {}

  static define(method: string) {
    Internal.prototype[method] = async function (this: Internal, data = {}) {
      this.bot.logger.debug('[request] %s %o', method, data)
      try {
        const response = await this.bot.http.post('/' + method, data)
        this.bot.logger.debug('[response] %o', response)
        const { ok, result } = response
        if (ok) return result
        throw new Error(`Telegram API error ${response.data.error_code}. ${response.data.description}`)
      } catch (err) {
        if (err.response?.data?.error_code && err.response.data.description) {
          throw new Error(`Telegram API error ${err.response.data.error_code}. ${err.response.data.description}`)
        } else {
          throw err
        }
      }
    }
  }
}
