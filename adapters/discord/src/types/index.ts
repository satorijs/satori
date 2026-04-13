export * from './application'
export * from './application-role-connection-metadata'
export * from './audit-log'
export * from './auto-moderation'
export * from './channel'
export * from './command'
export * from './component'
export * from './device'
export * from './emoji'
export * from './entitlement'
export * from './gateway'
export * from './gateway-connection'
export * from './guild'
export * from './guild-scheduled-event'
export * from './guild-template'
export * from './interaction'
export * from './internal'
export * from './invite'
export * from './lobby'
export * from './message'
export * from './permission'
export * from './poll'
export * from './sku'
export * from './soundboard'
export * from './stage-instance'
export * from './sticker'
export * from './subscription'
export * from './team'
export * from './user'
export * from './voice'
export * from './webhook'
export * from './webhook-event'

export type integer = number
export type snowflake = string
export type timestamp = string

/** @see https://discord.com/developers/docs/reference#locales */
export type Locale = typeof Locale[number]

export const Locale = [
  'id', 'da', 'de', 'en-GB', 'en-US',
  'es-ES', 'es-419', 'fr', 'hr', 'it',
  'lt', 'hu', 'nl', 'no', 'pl',
  'pt-BR', 'ro', 'fi', 'sv-SE', 'vi',
  'tr', 'cs', 'el', 'bg', 'ru',
  'uk', 'hi', 'th', 'zh-CN', 'ja',
  'zh-TW', 'ko',
] as const
