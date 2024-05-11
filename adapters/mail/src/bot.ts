import { Bot, Context, Schema } from '@satorijs/core'
import { IMAP, SMTP } from './mail'
import { MailMessageEncoder } from './message'

export class MailBot<C extends Context = Context> extends Bot<C, MailBot.Config> {
  static MessageEncoder = MailMessageEncoder
  static inject = ['http']

  internal: SMTP

  constructor(ctx: C, config: MailBot.Config) {
    super(ctx, config, 'mail')
    this.selfId = config.selfId || config.username
    this.user.name = this.config.username
    this.internal = new SMTP(this.config)
    this.ctx.plugin(IMAP, this)
  }
}

export namespace MailBot {
  export interface Config {
    name: string
    selfId: string
    username: string
    password: string
    subject: string
    imap: {
      host: string
      port: number
      tls: boolean
    }
    smtp: {
      host: string
      port: number
      tls: boolean
    }
  }

  export const Config = Schema.object({
    username: Schema.string().description('用户名。').required(),
    password: Schema.string().description('密码或授权码。').required(),
    selfId: Schema.string().description('邮件地址 (默认与用户名相同)。'),
    name: Schema.string().description('发送邮件时显示的名称。'),
    subject: Schema.string().description('机器人发送的邮件主题。').default('Koishi'),
    imap: Schema.intersect([
      Schema.object({
        host: Schema.string().description('IMAP 服务器地址。').required(),
        tls: Schema.boolean().description('是否开启 TLS 加密。').default(true),
      }).description('IMAP 设置'),
      Schema.union([
        Schema.object({
          tls: Schema.const(true),
          port: Schema.number().description('IMAP 服务器端口。').default(993),
        }),
        Schema.object({
          tls: Schema.const(false),
          port: Schema.number().description('IMAP 服务器端口。').default(143),
        }),
      ]),
    ]),
    smtp: Schema.intersect([
      Schema.object({
        host: Schema.string().description('SMTP 服务器地址。').required(),
        tls: Schema.boolean().description('是否开启 TLS 加密。').default(true),
      }).description('SMTP 设置'),
      Schema.union([
        Schema.object({
          tls: Schema.const(true),
          port: Schema.number().description('SMTP 服务器端口。').default(465),
        }),
        Schema.object({
          tls: Schema.const(false),
          port: Schema.number().description('SMTP 服务器端口。').default(25),
        }),
      ]),
    ]),
  })
}
