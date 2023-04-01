import { Bot, Schema } from '@satorijs/satori'

export class MailBot<T extends MailBot.Config = MailBot.Config> extends Bot<T> {
  
}

export namespace MailBot {
  export interface Config extends Bot.Config {
    username: string
    password: string
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
    username: Schema.string().default('用户名').required(),
    password: Schema.string().default('密码').required(),
    imap: Schema.intersect([
      Schema.object({
        host: Schema.string().description('IMAP 服务器地址').required(),
        tls: Schema.boolean().description('是否开启 TLS 加密').default(true),
      }),
      Schema.union([
        Schema.object({
          tls: Schema.const(true),
          port: Schema.number().description('IMAP 服务器端口').default(993),
        }),
        Schema.object({
          tls: Schema.const(false),
          port: Schema.number().description('IMAP 服务器端口').default(143),
        })
      ]),
    ]),
    smtp: Schema.intersect([
      Schema.object({
        host: Schema.string().description('SMTP 服务器地址').required(),
        tls: Schema.boolean().description('是否开启 TLS 加密').default(true),
      }),
      Schema.union([
        Schema.object({
          tls: Schema.const(true),
          port: Schema.number().description('SMTP 服务器端口').default(587),
        }),
        Schema.object({
          tls: Schema.const(false),
          port: Schema.number().description('SMTP 服务器端口').default(25),
        })
      ]),
    ]),
  })
}

MailBot.prototype.platform = 'mail'