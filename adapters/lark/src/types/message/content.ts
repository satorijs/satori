// https://open.larksuite.com/document/server-docs/im-v1/message-content-description/create_json

export namespace MessageContent {
  export type Contents =
    | Text
    | Image
    | ShareChat
    | ShareUser
    | Audio
    | Media
    | File
    | Sticker
    | RichText

  export type MediaContents =
    | Image
    | Audio
    | Media
    | File

  export interface Text {
    text: string
  }

  export interface Image {
    image_key: string
  }

  export interface ShareChat {
    chat_id: string
  }

  export interface ShareUser {
    user_id: string
  }

  export interface Audio {
    file_key: string
  }

  export interface Media {
    file_key: string
    image_key: string
  }

  export interface File {
    file_key: string
  }

  export interface Sticker {
    file_key: string
  }

  export interface RichText {
    [locale: string]: {
      title?: string
      content: RichText.Paragraph[]
    }
  }

  export namespace RichText {
    export type Style = 'bold' | 'italic' | 'underline' | 'lineThrough'

    export interface BaseElement<T extends string = string> {
      tag: T
    }

    export interface TextElement extends BaseElement<'text'> {
      text: string
      un_escape?: boolean
      style?: Style[]
    }

    export interface LinkElement extends BaseElement<'a'> {
      text: string
      href: string
      style?: Style[]
    }

    export interface AtElement extends BaseElement<'at'> {
      user_id: string
      style?: Style[]
      // user_name?: string
    }

    export interface ImageElement extends BaseElement<'img'> {
      image_key: string
      // height?: number
      // width?: number
    }

    export interface MediaElement extends BaseElement<'media'> {
      file_key: string
      image_key?: string
    }

    export interface EmotionElement extends BaseElement<'emoji'> {
      emoji_type: string
    }

    export interface CodeBlockElement extends BaseElement<'code_block'> {
      language?: string
      text: string
    }

    export interface HRElement extends BaseElement<'hr'> {}

    export interface MarkdownElement extends BaseElement<'md'> {
      text: string
    }

    export type InlineElement =
      | TextElement
      | LinkElement
      | AtElement
      | EmotionElement
      | MarkdownElement

    export type BlockElement =
      | ImageElement
      | MediaElement
      | CodeBlockElement
      | HRElement

    export type Paragraph =
      | InlineElement[]
      | [BlockElement]
  }
}
