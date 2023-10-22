import NodeIMAP from 'node-imap'
import { createTransport, Transporter } from 'nodemailer'
import { simpleParser } from 'mailparser'
import { MailBot } from './bot'
import { Adapter, Context, Logger, Universal } from '@satorijs/satori'
import { dispatchSession } from './utils'

const logger = new Logger('mail')

export class IMAP<C extends Context = Context> extends Adapter<C, MailBot<C>> {
  static reusable = true

  imap: NodeIMAP

  constructor(ctx: C, public bot: MailBot<C>) {
    super()
    this.imap = new NodeIMAP({
      user: bot.config.username,
      password: bot.config.password,
      host: bot.config.imap.host,
      port: bot.config.imap.port,
      tls: bot.config.imap.tls,
    })
    this.imap.on('error', (error) => {
      logger.error(error)
    })
  }

  async connect(bot: MailBot<C>) {
    this.imap.on('ready', () => {
      this.imap.openBox('INBOX', false, this.inbox.bind(this))
    })
    this.imap.on('close', () => {
      if (!bot.isActive) return
      logger.info('IMAP disconnected, will reconnect in 3s...')
      bot.status = Universal.Status.RECONNECT
      setTimeout(() => {
        if (!bot.isActive) return
        this.imap.connect()
      }, 3000)
    })
    this.imap.connect()
  }

  stop() {
    this.imap.end()
  }

  inbox(error: Error) {
    if (error) {
      logger.error(error)
      return
    }
    this.bot.online()
    this.scan()
    this.imap.on('mail', this.scan.bind(this))
  }

  scan() {
    this.imap.search(['UNSEEN'], (error, uids) => {
      if (error) {
        logger.error(error)
        return
      }
      if (uids.length === 0) return

      this.imap.setFlags(uids, ['\\SEEN'], (error) => {
        if (error) logger.error(error)
      })

      // markSeen doesn't work
      const mails = this.imap.fetch(uids, { bodies: '' })
      mails.on('message', message => {
        message.once('body', (stream) => {
          simpleParser(stream, (error, mail) => {
            if (error) {
              logger.error(error)
              return
            }
            dispatchSession(this.bot, mail)
          })
        })
      })
    })
  }
}

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
