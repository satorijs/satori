import { Context, Quester, Schema } from '@satorijs/core'
import {} from '@satorijs/router'
import internal from 'stream'

declare module '@satorijs/core' {
  interface Context {
    'server\.proxy': ProxyService
  }
}

class ProxyService {
  static inject = ['router']

  constructor(protected ctx: Context, public config: ProxyService.Config) {
    const logger = ctx.logger('proxy')

    ctx.router.get(config.path + '/:url(.*)', async (koa) => {
      logger.debug(koa.params.url)
      koa.header['Access-Control-Allow-Origin'] = ctx.router.config.selfUrl || '*'
      try {
        koa.body = await ctx.http.get<internal.Readable>(koa.params.url, { responseType: 'stream' })
      } catch (error) {
        if (!Quester.isAxiosError(error) || !error.response) throw error
        koa.status = error.response.status
        koa.body = error.response.data
      }
    })

    ctx.root.provide('server\.proxy', this)
  }
}

namespace ProxyService {
  export interface Config {
    path?: string
  }

  export const Config: Schema<Config> = Schema.object({
    path: Schema.string().default('/proxy'),
  })
}

export default ProxyService
