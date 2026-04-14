import { Channel, Emoji, integer, Interaction, snowflake } from '.'

/** https://discord.com/developers/docs/components/reference#anatomy-of-a-component-custom-id */
export interface Component {
  /** Developer-defined identifier, 1-100 characters */
  custom_id: string
}

export namespace Component {
  /** https://discord.com/developers/docs/components/reference#component-object-component-types */
  export enum Type {
    /** Container to display a row of interactive components */
    ACTION_ROW = 1,
    /** Button object */
    BUTTON = 2,
    /** Select menu for picking from defined text options */
    STRING_SELECT = 3,
    /** Text input object */
    TEXT_INPUT = 4,
    /** Select menu for users */
    USER_SELECT = 5,
    /** Select menu for roles */
    ROLE_SELECT = 6,
    /** Select menu for mentionables (users *and* roles) */
    MENTIONABLE_SELECT = 7,
    /** Select menu for channels */
    CHANNEL_SELECT = 8,
    /** Container to display text alongside an accessory component */
    SECTION = 9,
    /** Markdown text */
    TEXT_DISPLAY = 10,
    /** Small image that can be used as an accessory */
    THUMBNAIL = 11,
    /** Display images and other media */
    MEDIA_GALLERY = 12,
    /** Displays an attached file */
    FILE = 13,
    /** Component to add vertical padding between other components */
    SEPARATOR = 14,
    /** Container that visually groups a set of components */
    CONTAINER = 17,
    /** Container associating a label and description with a component */
    LABEL = 18,
    /** Component for uploading files */
    FILE_UPLOAD = 19,
    /** Single-choice set of options */
    RADIO_GROUP = 21,
    /** Multi-selectable group of checkboxes */
    CHECKBOX_GROUP = 22,
    /** Single checkbox for yes/no choice */
    CHECKBOX = 23,
  }

  /** https://discord.com/developers/docs/components/reference#action-row-action-row-child-components */
  export enum ActionRowChildComponents {
    /** An Action Row can contain up to 5 Buttons */
    BUTTON = 'button',
    /** A single String Select */
    STRING_SELECT = 'string_select',
    /** A single User Select */
    USER_SELECT = 'user_select',
    /** A single Role Select */
    ROLE_SELECT = 'role_select',
    /** A single Mentionable Select */
    MENTIONABLE_SELECT = 'mentionable_select',
    /** A single Channel Select */
    CHANNEL_SELECT = 'channel_select',
  }

  /** https://discord.com/developers/docs/components/reference#button-button-styles */
  export enum ButtonStyles {
    /** The most important or recommended action in a group of options */
    PRIMARY = 1,
    /** Alternative or supporting actions */
    SECONDARY = 2,
    /** Positive confirmation or completion actions */
    SUCCESS = 3,
    /** An action with irreversible consequences */
    DANGER = 4,
    /** Navigates to a URL */
    LINK = 5,
    /** Purchase */
    PREMIUM = 6,
  }

  /** https://discord.com/developers/docs/components/reference#text-input-text-input-styles */
  export enum TextInputStyles {
    /** Single-line input */
    SHORT = 1,
    /** Multi-line input */
    PARAGRAPH = 2,
  }

  /** https://discord.com/developers/docs/components/reference#section-section-child-components */
  export enum SectionChildComponents {
    TEXT_DISPLAY = 'text_display',
  }

  /** https://discord.com/developers/docs/components/reference#section-section-accessory-components */
  export enum SectionAccessoryComponents {
    BUTTON = 'button',
    THUMBNAIL = 'thumbnail',
  }

  /** https://discord.com/developers/docs/components/reference#container-container-child-components */
  export enum ContainerChildComponents {
    ACTION_ROW = 'action_row',
    TEXT_DISPLAY = 'text_display',
    SECTION = 'section',
    MEDIA_GALLERY = 'media_gallery',
    SEPARATOR = 'separator',
    FILE = 'file',
  }

  /** https://discord.com/developers/docs/components/reference#label-label-child-components */
  export enum LabelChildComponents {
    TEXT_INPUT = 'text_input',
    STRING_SELECT = 'string_select',
    USER_SELECT = 'user_select',
    ROLE_SELECT = 'role_select',
    MENTIONABLE_SELECT = 'mentionable_select',
    CHANNEL_SELECT = 'channel_select',
    FILE_UPLOAD = 'file_upload',
    RADIO_GROUP = 'radio_group',
    CHECKBOX_GROUP = 'checkbox_group',
    CHECKBOX = 'checkbox',
  }

  /** https://discord.com/developers/docs/components/reference#unfurled-media-item-unfurled-media-item-flags */
  export enum UnfurledMediaItemFlag {
    /** This image is animated */
    IS_ANIMATED = 1 << 0,
  }

  /** https://discord.com/developers/docs/components/reference#action-row-action-row-structure */
  export interface ActionRow {
    /** `1` for action row component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Up to 5 interactive button components or a single select component */
    components: Component.ActionRowChildComponents[]
  }

  /** https://discord.com/developers/docs/components/reference#button-button-structure */
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
    emoji?: Partial<Emoji>
    /** Developer-defined identifier for the button; 1-100 characters */
    custom_id: string
    /** Identifier for a purchasable SKU, only available when using premium-style buttons */
    sku_id?: snowflake
    /** URL for link-style buttons; max 512 characters */
    url?: string
    /** Whether the button is disabled (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#string-select-string-select-structure */
  export interface StringSelect {
    /** `3` for string select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** Specified choices in a select menu; max 25 */
    options: Component.SelectOption[]
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

  /** https://discord.com/developers/docs/components/reference#string-select-select-option-structure */
  export interface SelectOption {
    /** User-facing name of the option; max 100 characters */
    label: string
    /** Dev-defined value of the option; max 100 characters */
    value: string
    /** Additional description of the option; max 100 characters */
    description?: string
    /** `id`, `name`, and `animated` */
    emoji?: Partial<Emoji>
    /** Will show this option as selected by default */
    default?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#text-input-text-input-structure */
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

  /** https://discord.com/developers/docs/components/reference#user-select-user-select-structure */
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
    default_values?: Component.SelectDefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the user select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#user-select-select-default-value-structure */
  export interface SelectDefaultValue {
    /** ID of a user, role, or channel */
    id: snowflake
    /** Type of value that `id` represents. Either `"user"`, `"role"`, or `"channel"` */
    type: string
  }

  /** https://discord.com/developers/docs/components/reference#role-select-role-select-structure */
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
    default_values?: Component.SelectDefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the role select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-structure */
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
    default_values?: Component.SelectDefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the mentionable select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#channel-select-channel-select-structure */
  export interface ChannelSelect {
    /** `8` for channel select */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** ID for the select menu; 1-100 characters */
    custom_id: string
    /** List of channel types to include in the channel select component */
    channel_types?: Channel.Type[]
    /** Placeholder text if nothing is selected; max 150 characters */
    placeholder?: string
    /** List of default values for auto-populated select menu components; number of default values must be in the range defined by `min_values` and `max_values` */
    default_values?: Component.SelectDefaultValue[]
    /** Minimum number of items that must be chosen (defaults to 1); min 0 (see note), max 25 */
    min_values?: integer
    /** Maximum number of items that can be chosen (defaults to 1); max 25 */
    max_values?: integer
    /** Whether the channel select is required to answer in a modal (defaults to `true`) */
    required?: boolean
    /** Whether select menu is disabled in a message (defaults to `false`) */
    disabled?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#section-section-structure */
  export interface Section {
    /** `9` for section component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** One to three child components representing the content of the section that is contextually associated to the accessory */
    components: Component.SectionChildComponents[]
    /** A component that is contextually associated to the content of the section */
    accessory: Component.SectionAccessoryComponents
  }

  /** https://discord.com/developers/docs/components/reference#text-display-text-display-structure */
  export interface TextDisplay {
    /** `10` for text display */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Text that will be displayed similar to a message */
    content: string
  }

  /** https://discord.com/developers/docs/components/reference#thumbnail-thumbnail-structure */
  export interface Thumbnail {
    /** `11` for thumbnail component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** A url or attachment provided as an unfurled media item */
    media: Component.UnfurledMediaItem
    /** Alt text for the media, max 1024 characters */
    description?: string | null
    /** Whether the thumbnail should be a spoiler (or blurred out). Defaults to `false` */
    spoiler?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-structure */
  export interface MediaGallery {
    /** `12` for media gallery component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** 1 to 10 media gallery items */
    items: Component.MediaGalleryItem[]
  }

  /** https://discord.com/developers/docs/components/reference#media-gallery-media-gallery-item-structure */
  export interface MediaGalleryItem {
    /** A url or attachment provided as an unfurled media item */
    media: Component.UnfurledMediaItem
    /** Alt text for the media, max 1024 characters */
    description?: string | null
    /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
    spoiler?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#file-file-structure */
  export interface File {
    /** `13` for a file component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** This unfurled media item is unique in that it **only** supports attachment references using the `attachment://<filename>` syntax */
    file: Component.UnfurledMediaItem
    /** Whether the media should be a spoiler (or blurred out). Defaults to `false` */
    spoiler?: boolean
    /** The name of the file. This field is ignored and provided by the API as part of the response */
    name?: string
    /** The size of the file in bytes. This field is ignored and provided by the API as part of the response */
    size?: integer
  }

  /** https://discord.com/developers/docs/components/reference#separator-separator-structure */
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

  /** https://discord.com/developers/docs/components/reference#container-container-structure */
  export interface Container {
    /** `17` for container component */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Child components that are encapsulated within the Container */
    components: Component.ContainerChildComponents[]
    /** Color for the accent on the container as RGB from `0x000000` to `0xFFFFFF` */
    accent_color?: integer | null
    /** Whether the container should be a spoiler (or blurred out). Defaults to `false`. */
    spoiler?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#label-label-structure */
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
    component: Component.LabelChildComponents
  }

  /** https://discord.com/developers/docs/components/reference#file-upload-file-upload-structure */
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

  /** https://discord.com/developers/docs/components/reference#unfurled-media-item-unfurled-media-item-structure */
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

  /** https://discord.com/developers/docs/components/reference#radio-group-structure */
  export interface RadioGroup {
    /** `21` for radio group */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** List of options to show; min 2, max 10 */
    options: Component.RadioGroupOption[]
    /** Whether a selection is required to submit the modal (defaults to `true`) */
    required?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#radio-group-option-structure */
  export interface RadioGroupOption {
    /** Dev-defined value of the option; max 100 characters */
    value: string
    /** User-facing label of the option; max 100 characters */
    label: string
    /** Optional description for the option; max 100 characters */
    description?: string
    /** Shows the option as selected by default */
    default?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#checkbox-group-structure */
  export interface CheckboxGroup {
    /** `22` for checkbox group */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** List of options to show; min 1, max 10 */
    options: Component.CheckboxGroupOption[]
    /** Minimum number of items that must be chosen; min 0, max 10 (defaults to 1); */
    min_values?: integer
    /** Maximum number of items that can be chosen; min 1, max 10 (defaults to the number of options) */
    max_values?: integer
    /** Whether selecting within the group is required (defaults to `true`) */
    required?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#checkbox-group-option-structure */
  export interface CheckboxGroupOption {
    /** Dev-defined value of the option; max 100 characters */
    value: string
    /** User-facing label of the option; max 100 characters */
    label: string
    /** Optional description for the option; max 100 characters */
    description?: string
    /** Shows the option as selected by default */
    default?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#checkbox-structure */
  export interface Checkbox {
    /** `23` for checkbox */
    type: integer
    /** Optional identifier for component */
    id?: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** Whether the checkbox is selected by default */
    default?: boolean
  }

  /** https://discord.com/developers/docs/components/reference#string-select-string-select-interaction-response-structure */
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
    values: string[]
  }

  /** https://discord.com/developers/docs/components/reference#text-input-text-input-interaction-response-structure */
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

  /** https://discord.com/developers/docs/components/reference#user-select-user-select-interaction-response-structure */
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
    resolved: Interaction.ResolvedData
    /** IDs of the selected users */
    values: snowflake[]
  }

  /** https://discord.com/developers/docs/components/reference#role-select-role-select-interaction-response-structure */
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
    resolved: Interaction.ResolvedData
    /** IDs of the selected roles */
    values: snowflake[]
  }

  /** https://discord.com/developers/docs/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
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
    resolved: Interaction.ResolvedData
    /** IDs of the selected mentionables */
    values: snowflake[]
  }

  /** https://discord.com/developers/docs/components/reference#channel-select-channel-select-interaction-response-structure */
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
    resolved: Interaction.ResolvedData
    /** IDs of the selected channels */
    values: snowflake[]
  }

  /** https://discord.com/developers/docs/components/reference#text-display-text-display-interaction-response-structure */
  export interface PackResult {
    /** `10` for a Text Display */
    type: integer
    /** Unique identifier for the component */
    id: integer
  }

  /** https://discord.com/developers/docs/components/reference#label-label-interaction-response-structure */
  export interface PackResult {
    /** `18` for a Label */
    type: integer
    /** Unique identifier for the component */
    id: integer
    /** The component within the label */
    component: unknown
  }

  /** https://discord.com/developers/docs/components/reference#file-upload-file-upload-interaction-response-structure */
  export interface PackResult {
    /** `19` for a File Upload */
    type: integer
    /** Unique identifier for the component */
    id: integer
    /** Developer-defined identifier for the input; 1-100 characters */
    custom_id: string
    /** IDs of the uploaded files found in the resolved data */
    values: snowflake[]
  }
}
