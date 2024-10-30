// https://open.larksuite.com/document/server-docs/im-v1/message-content-description/create_json

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lark:share-chat': {
        'chat-id': string
      }
      'lark:share-user': {
        'user-id': string
      }
      'lark:system': {
        'need-rollup'?: boolean
      }
    }
  }
}

export namespace MessageComponent {
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
    image_key?: string
  }

  export interface File {
    file_key: string
  }

  export interface Sticker {
    file_key: string
  }

  export interface System {
    type: 'divider'
    params: {
      divider_text: {
        text: string
        i18n_text?: Record<string, string>
      }
    }
    options?: {
      need_rollup?: boolean
    }
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

    export interface HorizontalRuleElement extends BaseElement<'hr'> {}

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
      | HorizontalRuleElement

    export type Paragraph =
      | InlineElement[]
      | [BlockElement]
  }

  export interface Card {
    config: Card.Config
    card_link?: Card.URLs
    elements?: Card.Element[]
  }

  export namespace Card {
    /** @see https://open.larksuite.com/document/common-capabilities/message-card/getting-started/card-structure/card-configuration */
    export interface Config {
      enable_forward?: boolean
      update_multi?: boolean
    }

    export interface URLs {
      url: string
      pc_url?: string
      ios_url?: string
      android_url?: string
    }

    /** @see https://open.larksuite.com/document/common-capabilities/message-card/message-cards-content/card-header */
    export interface Header {
      title: I18nPlainTextElement
      subtitle?: I18nPlainTextElement
      template?: Header.Template
      icon?: CustomIconElement
      ud_icon?: StandardIconElement
      text_tag_list?: TextTagElement[]
      i18n_text_tag_list?: Record<string, TextTagElement[]>
    }

    export namespace Header {
      export type Template = 'blue' | 'wathet' | 'turquoise' | 'green' | 'yellow' | 'orange' | 'red' | 'carmine' | 'violet' | 'purple' | 'indigo' | 'grey' | 'default'
    }

    export interface BaseElement<T extends string = string> {
      tag: T
    }

    export type TextSize =
      | 'heading-0' | 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading'
      | 'normal' | 'notation' | 'xxxx-large' | 'xxx-large' | 'xx-large' | 'x-large' | 'large' | 'medium' | 'small' | 'x-small'

    export type TextAlign = 'left' | 'center' | 'right'

    export interface PlainTextElement extends BaseElement<'plain_text'> {
      content: string
    }

    export interface I18nPlainTextElement extends PlainTextElement {
      i18n?: Record<string, string>
    }

    export interface DivPlainTextElement extends PlainTextElement {
      text_size?: TextSize
      text_color?: string
      text_align?: TextAlign
      lines?: number
      icon?: IconElement
    }

    export type IconElement = StandardIconElement | CustomIconElement

    export interface CustomIconElement extends BaseElement<'custom_icon'> {
      img_key: string
    }

    export interface StandardIconElement extends BaseElement<'standard_icon'> {
      token: string
      color?: string
    }

    export interface TextTagElement extends BaseElement<'text_tag'> {
      text: PlainTextElement
      color: TextTagElement.Color
    }

    export namespace TextTagElement {
      export type Color = 'neutral' | 'blue' | 'torqoise' | 'lime' | 'orange' | 'violet' | 'indigo' | 'wathet' | 'green' | 'yellow' | 'red' | 'purple' | 'carmine'
    }

    export interface ImageElement extends BaseElement<'image'> {
      img_key: string
      alt?: PlainTextElement
      title?: PlainTextElement
      custom_width?: number
      compact_width?: boolean
      mode?: 'crop_center' | 'fit_horizontal' | 'large' | 'medium' | 'small' | 'tiny'
      preview?: boolean
    }

    export interface HorizontalRuleElement extends BaseElement<'hr'> {}

    export interface DivElement extends BaseElement<'div'> {
      text?: DivPlainTextElement
    }

    export interface MarkdownElement extends BaseElement<'markdown'> {
      content: string
      text_size?: TextSize
      text_align?: TextAlign
      href?: Record<string, URLs>
    }

    export interface HorizontalRuleElement extends BaseElement<'hr'> {}

    export interface ActionModule extends BaseElement<'action'> {
      actions: ActionElement[]
      layout?: 'bisected' | 'trisection' | 'flow'
    }

    export type ActionElement =
      | ButtonElement

    export type ActionBehavior =
      | OpenURLBehavior
      | CallbackBehavior

    export interface OpenURLBehavior {
      type: 'open_url'
      default_url: string
      pc_url?: string
      ios_url?: string
      android_url?: string
    }

    export interface CallbackBehavior {
      type: 'callback'
      value: Record<string, string>
    }

    export interface ButtonElement extends BaseElement<'button'> {
      text: PlainTextElement
      type?: ButtonElement.Type
      size?: ButtonElement.Size
      width?: ButtonElement.Width
      icon?: IconElement
      hover_tips?: PlainTextElement
      disabled?: boolean
      disabled_tips?: PlainTextElement
      confirm?: {
        title: PlainTextElement
        text: PlainTextElement
      }
      behaviors?: ActionBehavior[]
      // form-related fields
      name?: string
      required?: boolean
      action_type?: 'link' | 'request' | 'multi' | 'form_submit' | 'form_reset'
    }

    export namespace ButtonElement {
      export type Size = 'tiny' | 'small' | 'medium' | 'large'
      export type Width = 'default' | 'fill' | string
      export type Type = 'default' | 'primary' | 'danger' | 'text' | 'primary_text' | 'danger_text' | 'primary_filled' | 'danger_filled' | 'laser'
    }

    export type Element =
      | DivElement
      | MarkdownElement
      | HorizontalRuleElement
      | ActionModule
  }

  export interface Template {
    type: 'template'
    data: {
      template_id: string
      template_variable: object
    }
  }
}
