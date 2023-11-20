import { Context, Dict, sanitize, Schema, Time } from '@satorijs/satori'
import {} from '@satorijs/router'
import { createReadStream } from 'fs'
import { fileURLToPath } from 'url'
import { mkdir, rm, writeFile } from 'fs/promises'
import internal from 'stream'

declare module '@satorijs/core' {
  interface Context {
    'server.temp': TempServer
  }
}

export interface Entry {
  path: string
  url: string
  dispose?: () => void
}

class TempServer {
  static inject = ['router']

  public path: string
  public selfUrl!: string
  public baseDir!: string
  public entries: Dict<Entry> = Object.create(null)

  constructor(protected ctx: Context, public config: TempServer.Config) {
    const logger = ctx.logger('temp')

    this.path = sanitize(config.path)
    this.selfUrl = config.selfUrl || ctx.router.config.selfUrl!
    if (!this.selfUrl) {
      logger.warn('missing selfUrl configuration')
    }

    ctx.router.get(this.path + '/:name', async (koa) => {
      logger.debug(koa.params.name)
      const entry = this.entries[koa.params.name]
      if (!entry) return koa.status = 404
      koa.body = createReadStream(entry.path)
    })

    ctx.on('ready', () => this.start())
    ctx.on('dispose', () => this.start())
  }

  async start() {
    this.baseDir = this.ctx.baseDir + '/temp/' + Math.random().toString(36).slice(2) + '/'
    await mkdir(this.baseDir, { recursive: true })
    this.ctx.provide('server.temp', this)
  }

  async stop() {
    await rm(this.baseDir, { recursive: true })
  }

  async create(data: string | Buffer | internal.Readable): Promise<Entry> {
    const name = Math.random().toString(36).slice(2)
    const url = this.selfUrl! + this.path + '/' + name
    let path: string
    if (typeof data === 'string') {
      if (new URL(data).protocol === 'file:') {
        path = fileURLToPath(data)
      } else {
        data = await this.ctx.http.get(data, { responseType: 'stream' })
        path = this.baseDir + name
        await writeFile(path, data)
      }
    } else {
      path = this.baseDir + name
      await writeFile(path, data)
    }
    const dispose = this[Context.current]?.collect('server.temp', async () => {
      clearTimeout(timer)
      delete this.entries[name]
      if (path.startsWith(this.baseDir)) await rm(path)
    })
    const timer = dispose && setTimeout(() => dispose(), this.config.maxAge)
    return this.entries[name] = { path, url, dispose }
  }
}

namespace TempServer {
  export interface Config {
    path: string
    selfUrl?: string
    maxAge?: number
  }

  export const Config: Schema<Config> = Schema.object({
    path: Schema.string().default('/temp'),
    selfUrl: Schema.string().role('link').description('此服务暴露在公网的地址。缺省时将使用全局配置。'),
    maxAge: Schema.number().default(Time.minute * 5).description('临时文件的默认最大存活时间。'),
  })
}

export default TempServer
