import { Context } from 'cordis'
import Loader from '@cordisjs/plugin-loader'
import { expect } from 'chai'
import { test } from 'node:test'
import { pathToFileURL } from 'node:url'

test('@satorijs/plugin-server loads through Cordis loader', async (t) => {
  const ctx = new Context()
  ctx.baseUrl = pathToFileURL(process.cwd()).href + '/'
  const loader = ctx.plugin(Loader)
  await loader

  const ids: string[] = []
  ids.push(await ctx.loader.create({ name: '@cordisjs/plugin-http' }))
  ids.push(await ctx.loader.create({
    name: '@cordisjs/plugin-server',
    config: { host: '127.0.0.1', port: 0 },
  }))
  ids.push(await ctx.loader.create({ name: '@satorijs/core' }))
  ids.push(await ctx.loader.create({
    name: '@satorijs/plugin-server',
    config: { path: '/satori', webhooks: [] },
  }))
  await ctx.loader.await()

  t.after(async () => {
    for (const id of ids.reverse()) {
      await ctx.loader.resolve(id).fiber?.dispose()
    }
    await loader.dispose()
  })

  expect(ctx.get('satori')).to.exist
  expect(ctx.get('satori.server')).to.exist
})
