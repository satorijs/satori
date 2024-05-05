import {} from 'minato'
import { Bot, Context, Dict, Schema, Service } from '@satorijs/satori'
import * as Universal from '@satorijs/protocol'
import { SyncChannel } from './channel'
import { SyncGuild } from './guild'

declare module 'minato' {
  interface Tables {
    'satori.message': Message
    'satori.user': Universal.User & { platform: string }
    'satori.guild': Universal.Guild & { platform: string }
    'satori.channel': Universal.Channel & { platform: string }
  }
}

declare module '@satorijs/core' {
  // https://github.com/typescript-eslint/typescript-eslint/issues/6720
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Satori<C> {
    database: SatoriDatabase
  }
}

declare module '@satorijs/protocol' {
  interface Message {
    uid?: bigint
  }
}

export enum SyncFlag {
  NONE = 0,
  FRONT = 1,
  BACK = 2,
  BOTH = 3,
}

export interface Message extends Universal.Message {
  uid: bigint
  platform: string
  syncFlag: SyncFlag
  sendFlag: number
  deleted: boolean
  edited: boolean
}

export namespace Message {
  export const from = (message: Universal.Message, platform: string) => ({
    platform,
    id: message.id,
    content: message.content,
    timestamp: message.timestamp,
    channel: { id: message.channel?.id },
    user: { id: message.user?.id },
    guild: { id: message.guild?.id },
    quote: { id: message.quote?.id },
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
  } as Message)
}

class SatoriDatabase extends Service<SatoriDatabase.Config, Context> {
  inject = ['model', 'database']

  _guilds: Dict<SyncGuild> = {}
  _channels: Dict<SyncChannel> = {}

  stopped = false

  constructor(ctx: Context, public config: SatoriDatabase.Config) {
    super(ctx, 'satori.database', true)

    // TODO bot mixin
    // ctx.mixin('satori.database', {
    //   'createMessage': 'bot.createMessage',
    //   'getMessage': 'bot.getMessage',
    //   'getMessageList': 'bot.getMessageList',
    // })

    ctx.model.extend('satori.message', {
      'uid': 'bigint', // int64
      'id': 'char(255)',
      'platform': 'char(255)',
      'user.id': 'char(255)',
      'channel.id': 'char(255)',
      'guild.id': 'char(255)',
      'quote.id': 'char(255)',
      'content': 'text',
      'createdAt': 'unsigned(8)',
      'updatedAt': 'unsigned(8)',
      'syncFlag': 'unsigned(1)',
      'sendFlag': 'unsigned(1)',
      // 'deleted': 'boolean',
      // 'edited': 'boolean',
    }, {
      primary: 'uid',
    })

    ctx.model.extend('satori.user', {
      'id': 'char(255)',
      'platform': 'char(255)',
      'name': 'char(255)',
      'nick': 'char(255)',
      'avatar': 'char(255)',
    }, {
      primary: ['id', 'platform'],
    })

    ctx.model.extend('satori.guild', {
      'id': 'char(255)',
      'platform': 'char(255)',
      'name': 'char(255)',
    }, {
      primary: ['id', 'platform'],
    })

    ctx.model.extend('satori.channel', {
      'id': 'char(255)',
      'platform': 'char(255)',
      'name': 'char(255)',
    }, {
      primary: ['id', 'platform'],
    })
  }

  async start() {
    this.ctx.on('message', (session) => {
      const { platform, guildId, channelId } = session
      if (session.bot.hidden) return
      const key = platform + '/' + guildId + '/' + channelId
      this._channels[key] ||= new SyncChannel(this.ctx, session.bot, session.guildId, session.channelId)
      this._channels[key].queue(session)
    })

    this.ctx.on('message-deleted', async (session) => {
      await this.ctx.database.set('satori.message', {
        messageId: session.messageId,
        platform: session.platform,
      }, {
        deleted: true,
        updatedAt: +new Date(),
      })
    })

    this.ctx.on('message-updated', async (session) => {
      await this.ctx.database.set('satori.message', {
        messageId: session.messageId,
        platform: session.platform,
      }, {
        content: session.content,
        updatedAt: +new Date(),
      })
    })

    this.ctx.on('bot-status-updated', async (bot) => {
      this.onBotOnline(bot)
    })

    this.ctx.bots.forEach(async (bot) => {
      this.onBotOnline(bot)
    })
  }

  async stop() {
    this.stopped = true
  }

  private async onBotOnline(bot: Bot) {
    if (bot.status !== Universal.Status.ONLINE || bot.hidden || !bot.getMessageList || !bot.getGuildList) return
    const tasks: Promise<any>[] = []
    for await (const guild of bot.getGuildIter()) {
      const key = bot.platform + '/' + guild.id
      this._guilds[key] ||= new SyncGuild(bot, guild)
      tasks.push((async () => {
        for await (const channel of bot.getChannelIter(guild.id)) {
          const key = bot.platform + '/' + guild.id + '/' + channel.id
          this._channels[key] ||= new SyncChannel(this.ctx, bot, guild.id, channel.id)
        }
      })())
    }
  }
}

namespace SatoriDatabase {
  export interface Config {}

  export const Config: Schema<Config> = Schema.object({})
}

export default SatoriDatabase
