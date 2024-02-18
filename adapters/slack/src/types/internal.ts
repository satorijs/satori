import { Dict, Quester } from '@satorijs/satori'
import { SlackBot } from '../bot'

// https://api.slack.com/web#methods_supporting_json

type SupportPostJSON = boolean

export enum Token {
  BOT = 0,
  APP = 1,
}

export type TokenInput = string | Token

// https://api.slack.com/web#basics
export class Internal {
  constructor(private bot: SlackBot, private http: Quester) { }

  // route: content-type
  static define(routes: Dict<Partial<Record<Quester.Method, Record<string, SupportPostJSON>>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as Quester.Method
        for (const name of Object.keys(routes[path][method])) {
          Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
            const config: Quester.RequestConfig = {
              headers: {},
            }
            let token = ''
            if (typeof args[0] === 'string') {
              token = args[0]
            } else {
              token = args[0] === Token.BOT ? this.bot.config.botToken : this.bot.config.token
            }
            config.headers.Authorization = `Bearer ${token}`
            const supportJson = routes[path][method][name]
            if (method === 'GET') {
              config.params = args[1]
            } else if (supportJson && !(args[1] instanceof FormData)) {
              config.headers['content-type'] = 'application/json; charset=utf-8'
              config.data = JSON.stringify(args[1])
            } else {
              config.headers['content-type'] = 'application/x-www-form-urlencoded'
              config.data = args[1]
            }
            try {
              return (await this.http(method, path, config)).data
            } catch (error) {
              if (!Quester.Error.is(error) || !error.response) throw error
              throw new Error(`[${error.response.status}] ${JSON.stringify(error.response.data)}`)
            }
          }
        }
      }
    }
  }
}
