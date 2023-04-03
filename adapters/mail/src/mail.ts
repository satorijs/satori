import NodeIMAP from 'node-imap'
import { Transporter, createTransport } from 'nodemailer'
import { ParsedMail, simpleParser } from 'mailparser'
import { Logger } from '@satorijs/satori'
import { MailBot } from './bot'
import { condition } from './utils'

const logger = new Logger('adapter-mail')

export interface Mail {
  uid: number
  mail: ParsedMail
}

export class IMAP {
  imap: NodeIMAP
  constructor(
    config: MailBot.Config,
    public onMail: (mail: Mail) => void,
  ) {
    this.imap = new NodeIMAP({
      user: config.username,
      password: config.password,
      host: config.imap.host,
      port: config.imap.port,
      tls: config.imap.tls,
    })
    this.imap.once('ready', () => {
      this.imap.openBox('INBOX', false, this.inbox.bind(this))
    })
    this.imap.on('error', this.error.bind(this))
    this.imap.connect()
  }

  inbox(error: Error, box: NodeIMAP.Box) {
    if (error) {
      this.error(error)
      return
    }
    this.scan()
    this.imap.on('mail', this.scan.bind(this))
  }

  error(error: Error) {
    logger.error(error)
    throw error
  }

  scan() {
    this.imap.search(['UNSEEN'], (error, uids) => {
      if (error) {
        this.error(error)
        return
      }
      if (uids.length === 0) return

      this.imap.setFlags(uids, ['\\SEEN'], (error) => {
        if (error) this.error(error)
      })

      // markSeen doesn't work
      const mails = this.imap.fetch(uids, { bodies: '' })
      mails.on('message', message => {
        const [resolve, uid] = condition<number>()
        message.once('attributes', attrs => resolve(attrs.uid))
        message.once('body', (stream) => {
          simpleParser(stream, (error, mail) => {
            if (error) {
              this.error(error)
              return
            }
            uid.then(uid => this.onMail({ uid, mail }))
          })
        })
      })
    })
  }
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
  async send(to: string, html: string, subject?: string): Promise<string> {
    const info = await this.transporter.sendMail({
      from: this.from,
      to, subject, html,
    })
    return info.messageId
  }
}
