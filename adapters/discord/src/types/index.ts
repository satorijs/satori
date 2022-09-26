// Last updated: Jun 29, 2022

export * from './internal'

export * from './application'
export * from './audit-log'
export * from './auto-moderation'
export * from './ban'
export * from './channel'
export * from './command'
export * from './component'
export * from './device'
export * from './emoji'
export * from './gateway'
export * from './guild-member'
export * from './guild-template'
export * from './guild'
export * from './integration'
export * from './interaction'
export * from './invite'
export * from './message'
export * from './presence'
export * from './reaction'
export * from './role'
export * from './scheduled-event'
export * from './stage-instance'
export * from './sticker'
export * from './team'
export * from './thread'
export * from './user'
export * from './voice'
export * from './webhook'

export type integer = number
export type snowflake = string
export type timestamp = string

/** @see https://discord.com/developers/docs/reference#locales */
export type Locale =
  | 'da' | 'de' | 'en-GB' | 'en-US' | 'es-ES'
  | 'fr' | 'hr' | 'it' | 'lt' | 'hu'
  | 'nl' | 'no' | 'pl' | 'pt-BR' | 'ro'
  | 'fi' | 'sv-SE' | 'vi' | 'tr' | 'cs'
  | 'el' | 'bg' | 'ru' | 'uk' | 'hi'
  | 'th' | 'zh-CN' | 'ja' | 'zh-TW' | 'ko'
