import { ParsedMail } from 'mailparser'
import { MailBot } from './bot'

declare module '@satorijs/satori' {
  interface Session {
    mail: ParsedMail
  }
}

export * from './bot'
export * from './mail'
export * from './message'
export * from './utils'

export default MailBot
