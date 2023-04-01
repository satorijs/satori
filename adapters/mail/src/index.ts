import { MailBot } from './bot'

declare module '@satorijs/satori' {
  interface Session {
    mail
  }
}

export { MailBot }