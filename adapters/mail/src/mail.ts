import NodeIMAP from 'node-imap'
import {} from 'nodemailer'
import { ParsedMail, simpleParser } from 'mailparser'
import { MailBot } from './bot'
import { Logger } from '@satorijs/satori'
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
    public cb: (mail: Mail) => void
  ) {
    this.imap = new NodeIMAP({
      user: config.username,
      password: config.password,
      host: config.imap.host,
      port: config.imap.port,
      tls: config.imap.tls,
      debug: console.log
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
            uid.then(uid => this.cb({ uid, mail }))
          })
        })
      })
    })
  }
}
