import { Context } from 'cordis'
import Http from '@cordisjs/plugin-http'
import { expect } from 'chai'
import { test } from 'node:test'
import Satori, { Bot } from '../src/index.ts'

class TestBot extends Bot {
  static instance: TestBot

  constructor(ctx: Context) {
    super(ctx, {}, 'test')
    TestBot.instance = this
    this.selfId = '1'
    this.userId = '1'
  }
}

test('@satorijs/core internal resource routes', async (t) => {
  const ctx = new Context()
  const http = ctx.plugin(Http)
  await http
  const satori = ctx.plugin(Satori)
  await satori
  const bot = ctx.plugin(TestBot)
  await bot

  t.after(async () => {
    await bot.dispose()
    await satori.dispose()
    await http.dispose()
  })

  const [url] = await TestBot.instance.createUpload(
    new Blob(['hello'], { type: 'text/plain' }),
  )
  expect(url).to.match(/^satori:test\/1\/_tmp\/[^/]+$/)
  const response = await ctx.http(url, {
    responseType: response => response,
  })

  expect(response.status).to.equal(200)
  expect(response.headers.get('content-type')).to.equal('text/plain')
  expect(await response.text()).to.equal('hello')
})
