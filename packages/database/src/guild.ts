import { Bot, Universal } from '@satorijs/core'

export class SyncGuild {
  public members?: Universal.List<Universal.GuildMember>

  constructor(public bot: Bot, public data: Universal.Guild) {}

  async getMembers() {
    if (this.members) return this.members
    return this.members = await this.bot.getGuildMemberList(this.data.id)
  }

  toJSON(): SyncGuild.Data {
    return {}
  }
}

export namespace SyncGuild {
  export interface Data {}
}
