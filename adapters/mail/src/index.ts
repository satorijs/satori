import { ParsedMail } from 'mailparser'
import { MailBot } from './bot'

declare module '@satorijs/satori' {
  interface Session {
    mail: ParsedMail
  }
}

export { MailBot }
