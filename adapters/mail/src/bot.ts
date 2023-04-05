import { Bot, Logger, Schema } from '@satorijs/satori'
import { ParsedMail } from 'mailparser'
import { IMAP, SMTP } from './mail'
import { dispatchSession } from './utils'

const logger = new Logger('adapter-mail')

export class MailBot<T extends MailBot.Config = MailBot.Config> extends Bot<T> {
  imap: IMAP
  smtp: SMTP
  async start() {
    // TODO: reconnect
    this.imap = new IMAP(
      this.config,
      this.online.bind(this),
      this.offline.bind(this),
      this.onMail.bind(this),
      this.onError.bind(this),
    )
    this.smtp = new SMTP(this.config)
  }

  async stop() {
    this.imap.stop()
  }

  onError(error: Error) {
    logger.error(error)
  }

  onMail(mail: ParsedMail) {
    dispatchSession(this, mail)
  }
}

export namespace MailBot {
  export interface Config extends Bot.Config {
    name: string
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
    selfId: Schema.string().description('邮件地址 (为空则与用户名相同)'),
    name: Schema.string().description('发送邮件时显示的名称'),
    username: Schema.string().description('用户名').required(),
    password: Schema.string().description('密码').required(),
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
          port: Schema.number().description('SMTP 服务器端口').default(465),
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