import { Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/component#action-row-action-row-structure */
export interface Component {
  /** `1` for action row component */
  type: integer
  /** Optional identifier for component */
  id?: integer
  /** Up to 5 interactive button components or a single select component */
  components: ActionRowChildComponents[]
}

export namespace Component {
  /** https://discord.com/developers/docs/resources/component#component-object-component-types */
  export enum Type {
    /** Container to display a row of interactive components */
    1 = '[Action Row](/developers/components/reference#action-row)',
    /** Button object */
    2 = '[Button](/developers/components/reference#button)',
    /** Select menu for picking from defined text options */
    3 = '[String Select](/developers/components/reference#string-select)',
    /** Text input object */
    4 = '[Text Input](/developers/components/reference#text-input)',
    /** Select menu for users */
    5 = '[User Select](/developers/components/reference#user-select)',
    /** Select menu for roles */
    6 = '[Role Select](/developers/components/reference#role-select)',
    /** Select menu for mentionables (users *and* roles) */
    7 = '[Mentionable Select](/developers/components/reference#mentionable-select)',
    /** Select menu for channels */
    8 = '[Channel Select](/developers/components/reference#channel-select)',
    /** Container to display text alongside an accessory component */
    9 = '[Section](/developers/components/reference#section)',
    /** Markdown text */
    10 = '[Text Display](/developers/components/reference#text-display)',
    /** Small image that can be used as an accessory */
    11 = '[Thumbnail](/developers/components/reference#thumbnail)',
    /** Display images and other media */
    12 = '[Media Gallery](/developers/components/reference#media-gallery)',
    /** Displays an attached file */
    13 = '[File](/developers/components/reference#file)',
    /** Component to add vertical padding between other components */
    14 = '[Separator](/developers/components/reference#separator)',
    /** Container that visually groups a set of components */
    17 = '[Container](/developers/components/reference#container)',
    /** Container associating a label and description with a component */
    18 = '[Label](/developers/components/reference#label)',
    /** Component for uploading files */
    19 = '[File Upload](/developers/components/reference#file-upload)',
    /** Single-choice set of options */
    21 = '[Radio Group](/developers/components/reference#radio-group)',
    /** Multi-selectable group of checkboxes */
    22 = '[Checkbox Group](/developers/components/reference#checkbox-group)',
    /** Single checkbox for yes/no choice */
    23 = '[Checkbox](/developers/components/reference#checkbox)',
  }

  /** https://discord.com/developers/docs/resources/component#unfurled-media-item-unfurled-media-item-flags */
  export enum UnfurledMediaItemFlag {
    /** This image is animated */
    IS_ANIMATED = 1 << 0,
  }

  /** https://discord.com/developers/docs/resources/component#button-button-structure */
  export interface Button {
    /** `2` for a button */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** A button style */
    style: integer
    /** Text that appears on the button; max 80 characters */
    label?: string
    /** `name`, `id`, and `animated` */
    emoji?: PartialEmoji
    /** Developer-defined identifier for the button; 1-100 characters */
    custom_id: string
    /** Identifier for a purchasable SKU, only available when using premium-style buttons */
    sku_id?: snowflake
    /** URL for link-style buttons; max 512 characters */
    url?: string
    /** Whether the button is disabled (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#string-select-string-select-structure */
  export interface StringSelect {
    /** `3` for string select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** Specified choices in a select menu; max 25 */
    options: SelectOptions[]
    /** Placeholder text if nothing is selected or default; max 150 characters */
    placeholder?: string
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the string select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#string-select-select-option-structure */
  export interface SelectOption {
    /** User-facing name of the option; max 100 characters */
    label: string
    /** Dev-defined value of the option; max 100 characters */
    value: string
    /** Additional description of the option; max 100 characters */
    description?: string
    /** `id`, `name`, and `animated` */
    emoji?: PartialEmoji
    /** Will show this option as selected by default */
    default?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#text-input-text-input-structure */
  export interface TextInput {
    /** `4` for a text input */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** The Text Input Style */
    style: integer
    /** Minimum input length for a text input; min 0, max 4000 */
    min_length?: integer
    /** Maximum input length for a text input; min 1, max 4000 */
    max_length?: integer
    /** Whether this component is required to be filled (defaults to `true`) */
    required?: boolean
    /** Pre-filled value for this component; max 4000 characters */
    value?: string
    /** Custom placeholder text if the input is empty; max 100 characters */
    placeholder?: string
  }

  /** https://discord.com/developers/docs/resources/component#user-select-user-select-structure */
  export interface UserSelect {
    /** `5` for user select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** Placeholder text if nothing is selected; max 150 characters */
    placeholder?: string
    /** List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values` */
    default_values?: DefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the user select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#user-select-select-default-value-structure */
  export interface SelectDefaultValue {
    /** ID of a user, role, or channel */
    id: snowflake
    /** Type of value that `id` represents. Either `"user"`, `"role"`, or `"channel"` */
    type: string
  }

  /** https://discord.com/developers/docs/resources/component#role-select-role-select-structure */
  export interface RoleSelect {
    /** `6` for role select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** Placeholder text if nothing is selected; max 150 characters */
    placeholder?: string
    /** List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values` */
    default_values?: DefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the role select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#mentionable-select-mentionable-select-structure */
  export interface MentionableSelect {
    /** `7` for mentionable select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** Placeholder text if nothing is selected; max 150 characters */
    placeholder?: string
    /** List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values` */
    default_values?: DefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the mentionable select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#channel-select-channel-select-structure */
  export interface ChannelSelect {
    /** `8` for channel select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** List of channel types to include in the channel select component */
    channel_types?: ChannelTypes[]
    /** Placeholder text if nothing is selected; max 150 characters */
    placeholder?: string
    /** List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values` */
    default_values?: DefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the channel select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#section-section-structure */
  export interface Section {
    /** `9` for section component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** One to three child components representing the content of the section that is contextually associated to the accessory */
    components: SectionChildComponents[]
    /** A component that is contextually associated to the content of the section */
    accessory: SectionAccessoryComponent
  }

  /** https://discord.com/developers/docs/resources/component#text-display-text-display-structure */
  export interface TextDisplay {
    /** `10` for text display */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Text that will be displayed similar to a message */
    content: string
  }

  /** https://discord.com/developers/docs/resources/component#thumbnail-thumbnail-structure */
  export interface Thumbnail {
    /** `11` for thumbnail component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** A url or attachment provided as an unfurled media item */
    media: UnfurledMediaItem
    /** Alt text for the media, max 1024 characters */
    description?: string | null
    /** Whether the thumbnail should be a spoiler (or blurred out). Defaults to `false` */
    spoiler?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#media-gallery-media-gallery-structure */
  export interface MediaGallery {
    /** `12` for media gallery component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** 1 to 10 media gallery items */
    items: MediaGalleryItems[]
  }

  /** https://discord.com/developers/docs/resources/component#media-gallery-media-gallery-item-structure */
  export interface MediaGalleryItem {
    /** A url or attachment provided as an unfurled media item */
    media: UnfurledMediaItem
    /** Alt text for the media, max 1024 characters */
    description?: string | null
    /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
    spoiler?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#file-file-structure */
  export interface File {
    /** `13` for a file component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** This unfurled media item is unique in that it **only** supports attachment references using the `attachment://<filename>` syntax */
    file: UnfurledMediaItem
    /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
    spoiler?: boolean
    /** The name of the file. This field is ignored and provided by the API as part of the response */
    name?: string
    /** The size of the file in bytes. This field is ignored and provided by the API as part of the response */
    size?: integer
  }

  /** https://discord.com/developers/docs/resources/component#separator-separator-structure */
  export interface Separator {
    /** `14` for separator component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Whether a visual divider should be displayed in the component. Defaults to `true` */
    divider?: boolean
    /** Size of separator padding—`1` for small padding, `2` for large padding. Defaults to `1` */
    spacing?: integer
  }

  /** https://discord.com/developers/docs/resources/component#container-container-structure */
  export interface Container {
    /** `17` for container component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Child components that are encapsulated within the Container */
    components: ContainerChildComponents[]
    /** Color for the accent on the container as RGB from `0x000000` to `0xFFFFFF` */
    accent_color?: integer | null
    /** Whether the container should be a spoiler (or blurred out). Defaults to `false`. */
    spoiler?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#label-label-structure */
  export interface Label {
    /** `18` for a label */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** The label text; max 45 characters */
    label: string
    /** An optional description text for the label; max 100 characters */
    description?: string
    /** The component within the label */
    component: LabelChildComponent
  }

  /** https://discord.com/developers/docs/resources/component#file-upload-file-upload-structure */
  export interface FileUpload {
    /** `19` for file upload */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the file upload; 1-100 characters */
    custom_id: string
    /** Minimum number of items that must be uploaded (defaults to 1); min 0 (see note), max 10 */
    min_values?: integer
    /** Maximum number of items that can be uploaded (defaults to 1); max 10 */
    max_values?: integer
    /** Whether the file upload requires files to be uploaded before submitting the modal (defaults to `true`) */
    required?: boolean
  }

  /** https://discord.com/developers/docs/resources/component#unfurled-media-item-unfurled-media-item-structure */
  export interface UnfurledMediaItem {
    /** Supports arbitrary urls and `attachment://<filename>` references */
    url: string
    /** The proxied url of the media item */
    proxy_url?: string
    /** The height of the media item (if image or video) */
    height?: integer | null
    /** The width of the media item (if image or video) */
    width?: integer | null
    /** Thumbhash placeholder (if image or video) */
    placeholder?: string
    /** Version of the placeholder (if image or video) */
    placeholder_version?: integer
    /** The media type of the content */
    content_type?: string
    /** Unfurled media item flags combined as a bitfield */
    flags?: integer
    /** The id of the uploaded attachment */
    attachment_id?: snowflake
  }

  /** https://discord.com/developers/docs/resources/component#string-select-string-select-interaction-response-structure */
  export interface PackResult {
    /** `3` for a String Select */
    type: integer
    /** `3` for a String Select */
    component_type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** The text of the selected options */
    values: Strings[]
  }

  /** https://discord.com/developers/docs/resources/component#text-input-text-input-interaction-response-structure */
  export interface PackResult {
    /** `4` for a Text Input */
    type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** The user's input text */
    value: string
  }

  /** https://discord.com/developers/docs/resources/component#user-select-user-select-interaction-response-structure */
  export interface PackResult {
    /** `5` for a User Select */
    type: integer
    /** `5` for a User Select */
    component_type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** Resolved entities from selected options */
    resolved: ResolvedData
    /** IDs of the selected users */
    values: Snowflakes[]
  }

  /** https://discord.com/developers/docs/resources/component#role-select-role-select-interaction-response-structure */
  export interface PackResult {
    /** `6` for a Role Select */
    type: integer
    /** `6` for a Role Select */
    component_type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** Resolved entities from selected options */
    resolved: ResolvedData
    /** IDs of the selected roles */
    values: Snowflakes[]
  }

  /** https://discord.com/developers/docs/resources/component#mentionable-select-mentionable-select-interaction-response-structure */
  export interface PackResult {
    /** `7` for a Mentionable Select */
    type: integer
    /** `7` for a Mentionable Select */
    component_type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** Resolved entities from selected options */
    resolved: ResolvedData
    /** IDs of the selected mentionables */
    values: Snowflakes[]
  }

  /** https://discord.com/developers/docs/resources/component#channel-select-channel-select-interaction-response-structure */
  export interface PackResult {
    /** `8` for a Channel Select */
    type: integer
    /** `8` for a Channel Select */
    component_type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** Resolved entities from selected options */
    resolved: ResolvedData
    /** IDs of the selected channels */
    values: Snowflakes[]
  }

  /** https://discord.com/developers/docs/resources/component#text-display-text-display-interaction-response-structure */
  export interface PackResult {
    /** `10` for a Text Display */
    type: integer
    /** Unique identifier for the component */
    id: integer
  }

  /** https://discord.com/developers/docs/resources/component#label-label-interaction-response-structure */
  export interface PackResult {
    /** `18` for a Label */
    type: integer
    /** Unique identifier for the component */
    id: integer
    /** The component within the label */
    component: LabelInteractionResponseChildComponent
  }

  /** https://discord.com/developers/docs/resources/component#file-upload-file-upload-interaction-response-structure */
  export interface PackResult {
    /** `19` for a File Upload */
    type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** IDs of the uploaded files found in the resolved data */
    values: Snowflakes[]
  }

}

