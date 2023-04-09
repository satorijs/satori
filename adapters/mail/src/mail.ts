import NodeIMAP from 'node-imap'
import { Transporter, createTransport } from 'nodemailer'
import { ParsedMail, simpleParser } from 'mailparser'
import { MailBot } from './bot'

export class IMAP {
  imap: NodeIMAP
  constructor(
    config: MailBot.Config,
    public onReady: () => void,
    public onEnd: () => void,
    public onMail: (mail: ParsedMail) => void,
    public onError: (error: Error) => void,
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
    this.imap.on('error', this.onError)
    this.imap.on('end', this.onEnd)
    this.imap.connect()
  }

  inbox(error: Error) {
    if (error) {
      this.onError(error)
      return
    }
    this.onReady()
    this.scan()
    this.imap.on('mail', this.scan.bind(this))
  }

  scan() {
    this.imap.search(['UNSEEN'], (error, uids) => {
      if (error) {
        this.onError(error)
        return
      }
      if (uids.length === 0) return

      this.imap.setFlags(uids, ['\\SEEN'], (error) => {
        if (error) this.onError(error)
      })

      // markSeen doesn't work
      const mails = this.imap.fetch(uids, { bodies: '' })
      mails.on('message', message => {
        message.once('body', (stream) => {
          simpleParser(stream, (error, mail) => {
            if (error) {
              this.onError(error)
              return
            }
            this.onMail(mail)
          })
        })
      })
    })
  }

  stop() {
    this.imap.end()
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
