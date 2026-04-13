import { Internal } from '.'


declare module './internal' {
  interface Internal {
    /**
     * Returns all subscriptions containing the SKU, filtered by user. Returns a list of subscription objects.
     * @see https://discord.com/developers/docs/resources/subscription#list-sku-subscriptions
     */
    listSkuSubscriptions(sku_id: snowflake): Promise<ListOfSubscription>
    /**
     * Get a subscription by its ID. Returns a subscription object.
     * @see https://discord.com/developers/docs/resources/subscription#get-sku-subscription
     */
    getSkuSubscription(sku_id: snowflake, subscription_id: snowflake): Promise<Subscription>
  }
}

Internal.define({
  '/skus/{sku.id}/subscriptions': {
    GET: 'listSkuSubscriptions',
  },
  '/skus/{sku.id}/subscriptions/{subscription.id}': {
    GET: 'getSkuSubscription',
  },
})
