import { Dict } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
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
  constructor(private bot: SlackBot, private http: HTTP) { }

  // route: content-type
  static define(routes: Dict<Partial<Record<string, Record<string, SupportPostJSON>>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as string
        for (const name of Object.keys(routes[path][method])) {
          Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
            const config: HTTP.RequestConfig = {
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
              const response = await this.http(path, { ...config, method })
              return await response.json()
            } catch (error) {
              if (!this.http.isError(error) || !error.response) throw error
              throw new Error(`[${error.response.status}] ${await error.response.text()}`)
            }
          }
        }
      }
    }
  }
}
