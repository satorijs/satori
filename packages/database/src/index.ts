import {} from 'minato'
import { Context, Schema, Service } from '@satorijs/satori'
import { Channel, Guild, Message, User } from '@satorijs/protocol'

declare module 'minato' {
  namespace Database {
    export interface Tables {
      'satori.message': Message & { platform: string }
      'satori.user': User & { platform: string }
      'satori.guild': Guild & { platform: string }
      'satori.channel': Channel & { platform: string }
    }
  }
}

declare module '@satorijs/core' {
  interface Context {
    sdb: SDB
  }
}

declare module '@satorijs/protocol' {
  interface Message {
    uid?: number
  }
}

class SDB extends Service<SDB.Config> {
  [Service.provide] = 'sdb'
  inject = ['database']

  constructor(ctx: Context, config: SDB) {
    super(ctx, config)

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
}

namespace SDB {
  export interface Config {}

  export const Config: Schema<Config> = Schema.object({})
}

export default SDB
