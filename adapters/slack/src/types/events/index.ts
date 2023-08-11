// https://github.com/slackapi/bolt-js/blob/main/src/types/events/index.ts

import { BasicSlackEvent, SlackEvent, UserProfileChangedEvent } from './base-events'
import { Block } from '@slack/types'

export type StringIndexed = Record<string, any>

export * from './base-events'
export {
  GenericMessageEvent,
  BotMessageEvent,
  ChannelJoinMessageEvent,
  ChannelLeaveMessageEvent,
  ChannelNameMessageEvent,
  FileShareMessageEvent,
  MeMessageEvent,
  MessageChangedEvent,
  MessageDeletedEvent,
  File,
} from './message-events'

export type SocketEvent = HelloEvent | EventsApiEvent | UrlVerificationEvent | EnvelopedEvent

export interface HelloEvent {
  type: 'hello'
}

export interface EventsApiEvent {
  type: 'events_api'
  envelope_id: string
  payload: EnvelopedEvent
}

export interface UrlVerificationEvent {
  type: 'url_verification'
  token: string
  challenge: string
}

/**
 * A Slack Events API event wrapped in the standard envelope.
 *
 * This describes the entire JSON-encoded body of a request from Slack's Events API.
 */
export interface EnvelopedEvent<Event extends BasicSlackEvent = SlackEvent> extends StringIndexed {
  token: string
  team_id: string
  enterprise_id?: string
  api_app_id: string
  event: Event
  type: 'event_callback'
  event_id: string
  event_time: number
  // TODO: the two properties below are being deprecated on Feb 24, 2021
  authed_users?: string[]
  authed_teams?: string[]
  is_ext_shared_channel?: boolean
  authorizations?: Authorization[]
}

interface Authorization {
  enterprise_id: string | null
  team_id: string | null
  user_id: string
  is_bot: boolean
  is_enterprise_install?: boolean
}

export interface RichTextBlock extends Block {
  type: 'rich_text'
  elements: RichTextElement[]
}

/** https://api.slack.com/changelog/2019-09-what-they-see-is-what-you-get-and-more-and-less#the_riches */
export type RichTextElement = RichTextElement.TextSection | RichTextElement.TextList

export type RichText = RichText.User | RichText.Text | RichText.Emoji | RichText.Link | RichText.Broadcast

export namespace RichTextElement {
  export interface TextSection {
    type: 'rich_text_section'
    elements: RichText[]
  }

  export interface TextList {
    type: 'rich_text_list'
    style: 'bullet' | 'ordered'
    indent: number
    border: 0
    elements: TextSection[]
  }
}

export namespace RichText {
  export interface User {
    type: 'user'
    user_id: string
  }
  export interface Text {
    text: string
    type: 'text'
    style?: {
      bold?: boolean
      italic?: boolean
      strike?: boolean
      code?: boolean
    }
  }
  export interface Emoji {
    type: 'emoji'
    unicode: string
    name: string
  }
  export interface Link {
    url: string
    type: 'link'
    text: string
  }
  export interface Broadcast {
    type: 'broadcast'
    range: 'here' | 'channel' | 'everyone'
  }
}

export type SlackUser = UserProfileChangedEvent['user']
