<div align="center">
  <h1 id="satori">Satori</h1>
  <p>The Universal Messenger Protocol</p>
</div>

Supported platforms:

- Discord
- Telegram
- OneBot v11
- QQ Guild
- KOOK (Kaiheila)
- Feishu (WIP)
- Wecom (WIP)

# Examples

## Basic Usage

```sh
npm i @satorijs/satori @satorijs/adapter-discord
```

```ts
import { Context } from '@satorijs/satori'
import discord from '@satorijs/adapter-discord'

// create a new context
const ctx = new Context()

// configure a Discord account
ctx.plugin(discord, {
  token: 'xxxxxx',
})

// listen to message events
ctx.on('message', (session) => {
  console.log(session.content)
})

// start the application
await ctx.start()
```

## Event Filtering

```ts
// only listen to messages from discord user 123456789
ctx.platform('discord').user('123456789').on('message', callback)

// do not listen to private messages from telegram
ctx.exclude(ctx.platform('telegram').private()).on('message', callback)

// set manipulations
ctx1.union(ctx2).intersect(ctx3).on('message', callback)
```

## Specify Protocol

```ts
// your application will be listening http://localhost:8080
// and be available at https://example.com
const ctx = new Context({
  port: 8080,
  selfUrl: 'https://example.com',
})

ctx.plugin(telegram, {
  // telegram support two ways of connection: server and polling
  protocol: 'server',
  path: '/telegram',
  token: 'xxxxxx',
})
```

## Multiple Accounts

```ts
// specify multiple accounts with different platforms and protocols
ctx.plugin(discord, {
  token: 'xxxxxx',
})

ctx.plugin(telegram, {
  protocol: 'server',
  token: 'yyyyyy',
})

ctx.plugin(telegram, {
  protocol: 'polling',
  token: 'zzzzzz',
})
```
