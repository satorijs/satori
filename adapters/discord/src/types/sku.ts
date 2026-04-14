import { integer, Internal, snowflake } from '.'

/** https://discord.com/developers/docs/resources/sku#sku-object-sku-structure */
export interface Sku {
  /** ID of SKU */
  id: snowflake
  /** Type of SKU */
  type: Sku.Type
  /** ID of the parent application */
  application_id: snowflake
  /** Customer-facing name of your premium offering */
  name: string
  /** System-generated URL slug based on the SKU's name */
  slug: string
  /** SKU flags combined as a bitfield */
  flags: integer
}

export namespace Sku {
  /** https://discord.com/developers/docs/resources/sku#sku-object-sku-types */
  export enum Type {
    /** Durable one-time purchase */
    DURABLE = 2,
    /** Consumable one-time purchase */
    CONSUMABLE = 3,
    /** Represents a recurring subscription */
    SUBSCRIPTION = 5,
    /** System-generated group for each SUBSCRIPTION SKU created */
    SUBSCRIPTION_GROUP = 6,
  }

  /** https://discord.com/developers/docs/resources/sku#sku-object-sku-flags */
  export enum Flag {
    /** SKU is available for purchase */
    AVAILABLE = 1 << 2,
    /** Recurring SKU that can be purchased by a user and applied to a single server. Grants access to every user in that server. */
    GUILD_SUBSCRIPTION = 1 << 7,
    /** Recurring SKU purchased by a user for themselves. Grants access to the purchasing user in every server. */
    USER_SUBSCRIPTION = 1 << 8,
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns all SKUs for a given application.
     * @see https://discord.com/developers/docs/resources/sku#list-skus
     */
    listSkus(application_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/applications/{application.id}/skus': {
    GET: 'listSkus',
  },
})
