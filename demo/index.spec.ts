import dotenv from 'dotenv'

import { Context, segment } from '@satorijs/core'
import * as process from 'process'

dotenv.config()

const ctx = new Context()

ctx.plugin(function (ctx) {
  ctx.on('message', async (session) => {
    // await session.bot.sendMessage(session.channelId, 'Hello, world!', session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, segment.image('file:./test.png'), session.guildId, { session })
    // const imageFile = require('fs').readFileSync('./test.png')
    // // transfer image file to base64 string
    // const imageBase64 = Buffer.from(imageFile).toString('base64')
    // await session.bot.sendMessage(session.channelId, segment.image(`base64://${imageBase64}`), session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, [
    //   segment.quote(session.messageId),
    //   'hihihihi'
    // ], session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, [
    //   segment.quote(session.messageId),
    //   segment.image('file:./test.png')
    // ], session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, [
    //   segment.quote(session.messageId),
    //   segment.at(session.userId),
    //   segment.sharp(session.channelId),
    // ], session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, segment('figure', [
    //   segment('message', [segment.quote(session.messageId), segment.at(session.userId)]),
    //   segment('message', [segment.sharp(session.channelId)]),
    //   segment('message', [segment.image('file:./test.png')]),
    // ]), session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, segment('figure', [
    //   segment('message', [segment.quote(session.messageId), segment.at(session.userId)]),
    //   segment('message', [segment.sharp(session.channelId)]),
    // ]), session.guildId, { session })
    // await session.bot.sendMessage(session.channelId, segment('figure', [
    //   segment('message', [segment.sharp(session.channelId)]),
    //   segment('message', [segment.image('file:./test.png')]),
    // ]), session.guildId, { session })
  })
})

if (process.env.QQ_GUILD_ID) {
  const AdapterQQGModule = require('@satorijs/adapter-qqguild')
  const { QQGuild, default: AdapterQQG } = AdapterQQGModule
  ctx.plugin(AdapterQQG, {
    app: {
      id: process.env.QQ_GUILD_ID,
      key: process.env.QQ_GUILD_KEY,
      token: process.env.QQ_GUILD_TOKEN,
    },
    intents: QQGuild.Bot.Intents.GUILD_MESSAGES | QQGuild.Bot.Intents.GUILDS
  })
}

ctx.start()
  .then(() => console.log('Bot started'))
  .catch(console.error)
