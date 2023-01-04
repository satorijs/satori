<div align="center">
  <h1 id="satori">Satori</h1>
  <p>The Universal Messenger Protocol</p>
</div>

## Roadmap

- Infrastructure
  - [x] @satorijs/core
  - [x] @satorijs/element
  - [x] @satorijs/satori
  - [ ] @satorijs/database
  - [ ] @satorijs/server
- Ecosystem
  - [x] Discord
  - [x] Telegram
  - [x] OneBot (v11)
  - [x] QQ Guild
  - [x] KOOK (Kaiheila)
  - [x] Feishu
  - [ ] Dingding
  - [ ] Wecom

## Examples

### Basic usage

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

// start application
await ctx.start()
```

### Specifying protocol

```ts
// your application will be listening http://localhost:8080
// and be available at https://example.com
const ctx = new Context({
  port: 8080,
  selfUrl: 'https://example.com',
})

ctx.plugin(telegram, {
  // telegram supports two ways of connection: server and polling
  protocol: 'server',
  path: '/telegram',
  token: 'xxxxxx',
})
```

### Multiple accounts

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

### Removing an account

Based on [cordis](https://github.com/shigma/cordis).

```ts
const fork = ctx.plugin(discord, {
  token: 'xxxxxx',
})

fork.dispose()
```
