import Satori from '@satorijs/satori'

const app = new Satori.Context({
  port: 7789
})

const router = app.router

const prefix = '/api/v1'

router
  .get(`${prefix}/:uid/users`, ctx => {
    const { uid } = ctx.params
    const bot = app.bots.filter(bot => bot.userId === uid)[0] ?? null
    if (bot === null)
      throw new Error('Bot not found')
    ctx.body = bot.internal.getUsers()
  })

app.start()
  .then(() => {
    console.log('Satori Server is ready.')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
