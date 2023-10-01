import { Bot, Context, Logger, Schema, Universal } from '@satorijs/satori'
import { ParsedMail } from 'mailparser'
import { IMAP, SMTP } from './mail'
import { MailMessageEncoder } from './message'
import { dispatchSession } from './utils'

const logger = new Logger('adapter-mail')

export class MailBot extends Bot<MailBot.Config> {
  static MessageEncoder = MailMessageEncoder

  imap: IMAP
  smtp: SMTP

  constructor(ctx: Context, config: MailBot.Config) {
    super(ctx, config)
    this.selfId = config.selfId || config.username
    this.platform = 'mail'
  }

  async start() {
    this.user.name = this.config.username
    await super.start()
    this.imap = new IMAP(
      this.config,
      this.online.bind(this),
      this.onClose.bind(this),
      this.onMail.bind(this),
      this.onError.bind(this),
    )
    this.smtp = new SMTP(this.config)
  }

  async stop() {
    await super.stop()
    this.imap.stop()
  }

  onError(error: Error) {
    logger.error(error)
  }

  onMail(mail: ParsedMail) {
    dispatchSession(this, mail)
  }

  onClose() {
    if (!this.isActive) return
    logger.info('IMAP disconnected, will reconnect in 3s...')
    this.status = Universal.Status.RECONNECT
    setTimeout(() => {
      if (!this.isActive) return
      this.imap.connect()
    }, 3000)
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
