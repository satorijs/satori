import { Emoji, integer } from '.'

/** https://discord.com/developers/docs/interactions/message-components#component-object-component-structure */
export interface Component {
  /** component type */
  type: ComponentType
  /** a developer-defined identifier for the component, max 100 characters */
  custom_id?: string
  /** whether the component is disabled, default false */
  disabled?: boolean
  /** one of button styles */
  style?: integer
  /** text that appears on the button, max 80 characters */
  label?: string
  /** name, id, and animated */
  emoji?: Partial<Emoji>
  /** a url for link-style buttons */
  url?: string
  /** the choices in the select, max 25 */
  options?: SelectOption[]
  /** custom placeholder text if nothing is selected, max 100 characters */
  placeholder?: string
  /** the minimum number of items that must be chosen; default 1, min 0, max 25 */
  min_values?: integer
  /** the maximum number of items that can be chosen; default 1, max 25 */
  max_values?: integer
  /** a list of child components */
  components?: Component[]
}

/** https://discord.com/developers/docs/interactions/message-components#component-object-component-types */
export enum ComponentType {
  /** A container for other components */
  ACTION_ROW = 1,
  /** A button object */
  BUTTON = 2,
  /** A select menu for picking from choices */
  SELECT_MENU = 3,
  /** A text input object */
  TEXT_INPUT = 4,
}

/** https://discord.com/developers/docs/interactions/message-components#button-object-button-structure */
export interface Button {
  /** 2 for a button */
  type: ComponentType.BUTTON
  /** one of button styles */
  style: integer
  /** text that appears on the button, max 80 characters */
  label?: string
  /** name, id, and animated */
  emoji?: Partial<Emoji>
  /** a developer-defined identifier for the button, max 100 characters */
  custom_id?: string
  /** a url for link-style buttons */
  url?: string
  /** whether the button is disabled (default false) */
  disabled?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure */
export interface SelectMenu {
  /** 3 for a select menu */
  type: ComponentType.SELECT_MENU
  /** a developer-defined identifier for the button, max 100 characters */
  custom_id: string
  /** the choices in the select, max 25 */
  options: SelectOption[]
  /** custom placeholder text if nothing is selected, max 100 characters */
  placeholder?: string
  /** the minimum number of items that must be chosen; default 1, min 0, max 25 */
  min_values?: integer
  /** the maximum number of items that can be chosen; default 1, max 25 */
  max_values?: integer
  /** disable the select, default false */
  disabled?: boolean
}

/** https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure */
export interface SelectOption {
  /** the user-facing name of the option, max 100 characters */
  label: string
  /** the dev-define value of the option, max 100 characters */
  value: string
  /** an additional description of the option, max 100 characters */
  description?: string
  /** id, name, and animated */
  emoji?: Partial<Emoji>
  /** will render this option as selected by default */
  default?: boolean
}

/** @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure */
export interface TextInput {
  /** 4 for a text input */
  type: ComponentType.TEXT_INPUT
  /** a developer-defined identifier for the input, max 100 characters */
  custom_id: string
  /** the Text Input Style */
  style: TextInputStyles
  /** the label for this component, max 45 characters */
  label: string
  /** the minimum input length for a text input, min 0, max 4000 */
  min_length?: integer
  /** the maximum input length for a text input, min 1, max 4000 */
  max_length?: integer
  /** whether this component is required to be filled, default true */
  required?: boolean
  /** a pre-filled value for this component, max 4000 characters */
  value?: string
  /** custom placeholder text if the input is empty, max 100 characters */
  placeholder?: string
}

/** @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles */
export const enum TextInputStyles {
  /** A single-line input */
  SHORT = 1,
  /** A multi-line input */
  PARAGRAPH = 2,
}
