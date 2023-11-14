import { Context, Dict, Schema, Time } from '@satorijs/satori'
import {} from '@satorijs/router'
import { createReadStream } from 'fs'
import { mkdir, rm, writeFile } from 'fs/promises'
import internal from 'stream'

declare module '@satorijs/core' {
  interface Context {
    'server.temp': TempServer
  }
}

interface Entry {
  path: string
  url: string
  dispose?: () => void
}

class TempServer {
  static inject = ['router']

  public baseDir!: string
  public entries: Dict<Entry> = Object.create(null)

  constructor(protected ctx: Context, public config: TempServer.Config) {
    const logger = ctx.logger('temp')

    ctx.router.get(config.path + '/:name', async (koa) => {
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
    this.ctx.root.provide('server.temp', this)
  }

  async stop() {
    await rm(this.baseDir, { recursive: true })
  }

  async create(data: string | Buffer | internal.Readable) {
    const name = Math.random().toString(36).slice(2)
    const url = this.ctx.router.selfUrl + this.config.path + '/' + name
    let path: string
    if (typeof data === 'string') {
      path = data
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
    path?: string
    maxAge?: number
  }

  export const Config: Schema<Config> = Schema.object({
    path: Schema.string().default('/temp'),
    maxAge: Schema.number().default(Time.minute * 5),
  })
}

export default TempServer
