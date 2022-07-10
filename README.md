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

# Usage

```sh
npm i @satorijs/satori @satorijs/adapter-discord
```

```ts
import { Context } from '@satorijs/satori'
import discord from '@satorijs/adapter-discord'

// create a new context
const ctx = new Context()

// configure a Discord bot
ctx.plugin(discord, {
  token: 'xxx',
})

// listen to message events
ctx.on('message', (session) => {
  console.log(session.content)
})

// start the bot
await ctx.start()
```
