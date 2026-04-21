import { createTransport, Transporter } from 'nodemailer'
import { MailBot } from './bot'

export interface Attachment {
  filename?: string
  content: Buffer
  contentType: string
  cid?: string
}

export interface SendOptions {
  to: string
  html: string
  attachments?: Attachment[]
  subject?: string
  inReplyTo?: string
}

export class SMTP {
  transporter: Transporter
  from: string

  constructor(config: MailBot.Config) {
    this.transporter = createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.tls,
      auth: {
        user: config.username,
        pass: config.password,
      },
    })
    const address = config.selfId || config.username
    this.from = config.name ? `${config.name} <${address}>` : address
  }

  async send(options: SendOptions): Promise<string> {
    const info = await this.transporter.sendMail({
      ...options,
      from: this.from,
    })
    return info.messageId
  }
}
