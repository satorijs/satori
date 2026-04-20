import { Bot, Context, Inject } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { IMAP, SMTP } from './mail'
import { MailMessageEncoder } from './message'
import z from 'schemastery'

@Inject('http')
@Inject('logger', true, { name: 'mail' })
export class MailBot extends Bot<MailBot.Config> {
  static MessageEncoder = MailMessageEncoder

  internal: SMTP

  constructor(ctx: Context, config: MailBot.Config) {
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

  export const Config = z.object({
    username: z.string().description('用户名。').required(),
    password: z.string().description('密码或授权码。').required(),
    selfId: z.string().description('邮件地址 (默认与用户名相同)。'),
    name: z.string().description('发送邮件时显示的名称。'),
    subject: z.string().description('机器人发送的邮件主题。').default('Koishi'),
    imap: z.intersect([
      z.object({
        host: z.string().description('IMAP 服务器地址。').required(),
        tls: z.boolean().description('是否开启 TLS 加密。').default(true),
      }).description('IMAP 设置'),
      z.union([
        z.object({
          tls: z.const(true),
          port: z.number().description('IMAP 服务器端口。').default(993),
        }),
        z.object({
          tls: z.const(false),
          port: z.number().description('IMAP 服务器端口。').default(143),
        }),
      ]),
    ]),
    smtp: z.intersect([
      z.object({
        host: z.string().description('SMTP 服务器地址。').required(),
        tls: z.boolean().description('是否开启 TLS 加密。').default(true),
      }).description('SMTP 设置'),
      z.union([
        z.object({
          tls: z.const(true),
          port: z.number().description('SMTP 服务器端口。').default(465),
        }),
        z.object({
          tls: z.const(false),
          port: z.number().description('SMTP 服务器端口。').default(25),
        }),
      ]),
    ]),
  })
}
