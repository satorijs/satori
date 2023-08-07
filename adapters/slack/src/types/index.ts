export interface SlackChannel {
  id: string
  name: string
  is_channel: boolean
  is_group: boolean
  is_im: boolean
  created: number
  creator: string
  is_archived: boolean
  is_general: boolean
  unlinked: number
  name_normalized: string
  is_read_only: boolean
  is_shared: boolean
  parent_conversation: null
  is_ext_shared: boolean
  is_org_shared: boolean
  pending_shared: any[]
  is_pending_ext_shared: boolean
  is_member: boolean
  is_private: boolean
  is_mpim: boolean
  last_read: string
  topic: {
    value: string
    creator: string
    last_set: number
  }
  purpose: {
    value: string
    creator: string
    last_set: number
  }
  previous_names: string[]
  locale: string
}

export interface SlackTeam {
  id: string
  name: string
  domain: string
  email_domain: string
  icon: {
    image_34: string
    image_44: string
    image_68: string
    image_88: string
    image_102: string
    image_132: string
    image_default: boolean
  }
  enterprise_id: string
  enterprise_name: string
}

export * from './events'
export * from './internal'
export * from './definition'

export * from './admin'
export * from './api'
export * from './apps'
export * from './auth'
export * from './bots'
export * from './calls'
export * from './chat'
export * from './conversations'
export * from './dialog'
export * from './dnd'
export * from './emoji'
export * from './files'
export * from './migration'
export * from './oauth'
export * from './pins'
export * from './reactions'
export * from './reminders'
export * from './rtm'
export * from './search'
export * from './stars'
export * from './team'
export * from './usergroups'
export * from './users'
export * from './views'
export * from './workflows'
