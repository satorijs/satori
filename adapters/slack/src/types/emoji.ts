import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/emoji.list': {
    GET: { 'emojiList': false },
  },
})

export namespace Emoji {
  export namespace Params {
    export interface List {
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Lists custom emoji for a team.
     * @see https://api.slack.com/methods/emoji.list
     */
    emojiList(token: TokenInput): Promise<{
      ok: boolean
    }>

  }
}
