import { Internal, integer, snowflake, timestamp } from '.'

/** https://discord.com/developers/docs/resources/entitlement#entitlement-object-entitlement-structure */
export interface Entitlement {
  /** ID of the entitlement */
  id: snowflake
  /** ID of the SKU */
  sku_id: snowflake
  /** ID of the parent application */
  application_id: snowflake
  /** ID of the user that is granted access to the entitlement's sku */
  user_id?: snowflake
  /** Type of entitlement */
  type: Entitlement.Type
  /** Entitlement was deleted */
  deleted: boolean
  /** Start date at which the entitlement is valid. */
  starts_at: timestamp | null
  /** Date at which the entitlement is no longer valid. */
  ends_at: timestamp | null
  /** ID of the guild that is granted access to the entitlement's sku */
  guild_id?: snowflake
  /** For consumable items, whether or not the entitlement has been consumed */
  consumed?: boolean
}

export namespace Entitlement {
  /** https://discord.com/developers/docs/resources/entitlement#entitlement-object-entitlement-types */
  export enum Type {
    /** Entitlement was purchased by user */
    PURCHASE = 1,
    /** Entitlement for Discord Nitro subscription */
    PREMIUM_SUBSCRIPTION = 2,
    /** Entitlement was gifted by developer */
    DEVELOPER_GIFT = 3,
    /** Entitlement was purchased by a dev in application test mode */
    TEST_MODE_PURCHASE = 4,
    /** Entitlement was granted when the SKU was free */
    FREE_PURCHASE = 5,
    /** Entitlement was gifted by another user */
    USER_GIFT = 6,
    /** Entitlement was claimed by user for free as a Nitro Subscriber */
    PREMIUM_PURCHASE = 7,
    /** Entitlement was purchased as an app subscription */
    APPLICATION_SUBSCRIPTION = 8,
  }

}

/** https://discord.com/developers/docs/resources/entitlement#list-entitlements-query-string-params */
export interface ListEntitlementsParams {
  /** User ID to look up entitlements for */
  user_id?: snowflake
  /** Optional list of SKU IDs to check entitlements for */
  sku_ids?: CommaDelimitedSetOfSnowflakes
  /** Retrieve entitlements before this entitlement ID */
  before?: snowflake
  /** Retrieve entitlements after this entitlement ID */
  after?: snowflake
  /** Number of entitlements to return, 1-100, default 100 */
  limit?: integer
  /** Guild ID to look up entitlements for */
  guild_id?: snowflake
  /** Whether or not ended entitlements should be omitted. Defaults to false, ended entitlements are included by default. */
  exclude_ended?: Boolean
  /** Whether or not deleted entitlements should be omitted. Defaults to true, deleted entitlements are not included by default. */
  exclude_deleted?: Boolean
}

/** https://discord.com/developers/docs/resources/entitlement#create-test-entitlement-json-params */
export interface CreateTestEntitlementParams {
  /** ID of the SKU to grant the entitlement to */
  sku_id: string
  /** ID of the guild or user to grant the entitlement to */
  owner_id: string
  /** `1` for a guild subscription, `2` for a user subscription */
  owner_type: integer
}

declare module './internal' {
  interface Internal {
    /**
     * Returns all entitlements for a given app, active and expired.
     * @see https://discord.com/developers/docs/resources/entitlement#list-entitlements
     */
    listEntitlements(application_id: snowflake, params: ListEntitlementsParams): Promise<void>
    /**
     * Returns an entitlement.
     * @see https://discord.com/developers/docs/resources/entitlement#get-entitlement
     */
    getEntitlement(application_id: snowflake, entitlement_id: snowflake): Promise<void>
    /**
     * For One-Time Purchase consumable SKUs, marks a given entitlement for the user as consumed. The entitlement will have `consumed: true` when using List Entitlements.
     * @see https://discord.com/developers/docs/resources/entitlement#consume-an-entitlement
     */
    consumeAnEntitlement(application_id: snowflake, entitlement_id: snowflake): Promise<void>
    /**
     * Creates a test entitlement to a given SKU for a given guild or user. Discord will act as though that user or guild has entitlement to your premium offering.
     * @see https://discord.com/developers/docs/resources/entitlement#create-test-entitlement
     */
    createTestEntitlement(application_id: snowflake, params: CreateTestEntitlementParams): Promise<void>
    /**
     * Deletes a currently-active test entitlement. Discord will act as though that user or guild _no longer has_ entitlement to your premium offering.
     * @see https://discord.com/developers/docs/resources/entitlement#delete-test-entitlement
     */
    deleteTestEntitlement(application_id: snowflake, entitlement_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/applications/{application.id}/entitlements': {
    GET: 'listEntitlements',
    POST: 'createTestEntitlement',
  },
  '/applications/{application.id}/entitlements/{entitlement.id}': {
    GET: 'getEntitlement',
    DELETE: 'deleteTestEntitlement',
  },
  '/applications/{application.id}/entitlements/{entitlement.id}/consume': {
    POST: 'consumeAnEntitlement',
  },
})
