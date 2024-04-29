import {} from 'minato'
import { Context, Schema, Service } from '@satorijs/satori'
import { Channel, Guild, Message, User } from '@satorijs/protocol'

declare module 'minato' {
  interface Tables {
    'satori.message': SDBMessage
    'satori.user': User & { platform: string }
    'satori.guild': Guild & { platform: string }
    'satori.channel': Channel & { platform: string }
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
    uid?: number
  }
}

interface SDBMessage extends Message {
  platform: string
  syncFlag: number
  sendFlag: number
  deleted: boolean
  edited: boolean
}

class SatoriDatabase extends Service<SatoriDatabase.Config> {
  inject = ['model', 'database']

  constructor(ctx: Context, public config: SatoriDatabase.Config) {
    super(ctx, 'satori.database', true)

    // TODO bot mixin
    // ctx.mixin('satori.database', {
    //   'createMessage': 'bot.createMessage',
    //   'getMessage': 'bot.getMessage',
    //   'getMessageList': 'bot.getMessageList',
    // })

    ctx.model.extend('satori.message', {
      'uid': 'unsigned(8)', // int64
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
      'deleted': 'boolean',
      'edited': 'boolean',
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

    ctx.on('login-updated', () => {
      // TODO
    })

    ctx.on('message', () => {
      // TODO
    })

    ctx.on('message-deleted', () => {
      // TODO
    })

    ctx.on('message-updated', () => {
      // TODO
    })
  }
}

namespace SatoriDatabase {
  export interface Config {}

  export const Config: Schema<Config> = Schema.object({})
}

export default SatoriDatabase
