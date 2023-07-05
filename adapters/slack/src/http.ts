import { Adapter, Schema } from '@satorijs/satori'
import { SlackBot } from './bot'

export class HttpServer extends Adapter.Server<SlackBot<SlackBot.BaseConfig & HttpServer.Config>> {

}

export namespace HttpServer {
  export interface Config {
    protocol: 'http'
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('http').required(),
  })
}
