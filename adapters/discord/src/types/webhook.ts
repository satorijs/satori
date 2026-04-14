import { Channel, Guild, Internal, Message, snowflake, User } from '.'

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export interface Webhook {
  /** the id of the webhook */
  id: snowflake
  /** the type of the webhook */
  type: Webhook.Type
  /** the guild id this webhook is for, if any */
  guild_id?: snowflake | null
  /** the channel id this webhook is for, if any */
  channel_id: snowflake | null
  /** the user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User
  /** the default name of the webhook */
  name: string | null
  /** the default user avatar hash of the webhook */
  avatar: string | null
  /** the secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** the bot/OAuth2 application that created this webhook */
  application_id: snowflake | null
  /** the guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_guild?: Partial<Guild>
  /** the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_channel?: Partial<Channel>
  /** the url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string
}

export namespace Webhook {
  /** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
  export enum Type {
    /** Incoming Webhooks can post messages to channels with a generated token */
    INCOMING = 1,
    /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
    CHANNEL_FOLLOWER = 2,
    /** Application webhooks are webhooks used with Interactions */
    APPLICATION = 3,
  }
}

/** https://discord.com/developers/docs/resources/webhook#create-webhook-json-params */
export interface CreateWebhookParams {
  /** name of the webhook (1-80 characters) */
  name: string
  /** image for the default webhook avatar */
  avatar?: string | null
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook-json-params */
export interface ModifyWebhookParams {
  /** the default name of the webhook */
  name: string
  /** image for the default webhook avatar */
  avatar: string | null
  /** the new channel id this webhook should be moved to */
  channel_id: snowflake
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook-query-string-params */
export interface ExecuteWebhookParams {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait: boolean
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  thread_id: snowflake
  /** whether to respect the `components` field of the request. When enabled, allows application-owned webhooks to use all components and non-owned webhooks to use non-interactive components. (defaults to `false`) */
  with_components: boolean
}

/** https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook-query-string-params */
export interface ExecuteSlackCompatibleWebhookParams {
  /** id of the thread to send the message in */
  thread_id: snowflake
  /** waits for server confirmation of message send before response (defaults to `true`; when `false` a message that is not saved does not return an error) */
  wait: boolean
}

/** https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook-query-string-params */
export interface ExecuteGithubCompatibleWebhookParams {
  /** id of the thread to send the message in */
  thread_id: snowflake
  /** waits for server confirmation of message send before response (defaults to `true`; when `false` a message that is not saved does not return an error) */
  wait: boolean
}

/** https://discord.com/developers/docs/resources/webhook#get-webhook-message-query-string-params */
export interface GetWebhookMessageParams {
  /** id of the thread the message is in */
  thread_id: snowflake
}

/** https://discord.com/developers/docs/resources/webhook#edit-webhook-message-query-string-params */
export interface EditWebhookMessageParams {
  /** id of the thread the message is in */
  thread_id: snowflake
  /** whether to respect the `components` field of the request. When enabled, allows application-owned webhooks to use all components and non-owned webhooks to use non-interactive components. (defaults to `false`) */
  with_components: boolean
}

/** https://discord.com/developers/docs/resources/webhook#delete-webhook-message-query-string-params */
export interface DeleteWebhookMessageParams {
  /** id of the thread the message is in */
  thread_id: snowflake
}

declare module './internal' {
  interface Internal {
    /**
     * Creates a new webhook and returns a webhook object on success. Requires the `MANAGE_WEBHOOKS` permission. Fires a Webhooks Update Gateway event.
     * @see https://discord.com/developers/docs/resources/webhook#create-webhook
     */
    createWebhook(channel_id: snowflake, params: CreateWebhookParams): Promise<Webhook>
    /**
     * Returns a list of channel webhook objects. Requires the `MANAGE_WEBHOOKS` permission.
     * @see https://discord.com/developers/docs/resources/webhook#get-channel-webhooks
     */
    getChannelWebhooks(channel_id: snowflake): Promise<Webhook[]>
    /**
     * Returns a list of guild webhook objects. Requires the `MANAGE_WEBHOOKS` permission.
     * @see https://discord.com/developers/docs/resources/webhook#get-guild-webhooks
     */
    getGuildWebhooks(guild_id: snowflake): Promise<Webhook[]>
    /**
     * Returns the new webhook object for the given id.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook
     */
    getWebhook(webhook_id: snowflake): Promise<Webhook>
    /**
     * Same as above, except this call does not require authentication and returns no user in the webhook object.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook-with-token
     */
    getWebhookWithToken(webhook_id: snowflake, webhook_token: snowflake): Promise<void>
    /**
     * Modify a webhook. Requires the `MANAGE_WEBHOOKS` permission. Returns the updated webhook object on success. Fires a Webhooks Update Gateway event.
     * @see https://discord.com/developers/docs/resources/webhook#modify-webhook
     */
    modifyWebhook(webhook_id: snowflake, params: ModifyWebhookParams): Promise<Webhook>
    /**
     * Same as above, except this call does not require authentication, does not accept a `channel_id` parameter in the body, and does not return a user in the webhook object.
     * @see https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token
     */
    modifyWebhookWithToken(webhook_id: snowflake, webhook_token: snowflake): Promise<void>
    /**
     * Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission. Returns a `204 No Content` response on success. Fires a Webhooks Update Gateway event.
     * @see https://discord.com/developers/docs/resources/webhook#delete-webhook
     */
    deleteWebhook(webhook_id: snowflake): Promise<void>
    /**
     * Same as above, except this call does not require authentication.
     * @see https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token
     */
    deleteWebhookWithToken(webhook_id: snowflake, webhook_token: snowflake): Promise<void>
    /**
     * Refer to Uploading Files for details on attachments and `multipart/form-data` requests. Returns a message or `204 No Content` depending on the `wait` query parameter.
     * @see https://discord.com/developers/docs/resources/webhook#execute-webhook
     */
    executeWebhook(webhook_id: snowflake, webhook_token: snowflake, params: ExecuteWebhookParams): Promise<void>
    /**
     * Refer to Slack's documentation for more information. We do not support Slack's `channel`, `icon_emoji`, `mrkdwn`, or `mrkdwn_in` properties.
     * @see https://discord.com/developers/docs/resources/webhook#execute-slack-compatible-webhook
     */
    executeSlackCompatibleWebhook(webhook_id: snowflake, webhook_token: snowflake, params: ExecuteSlackCompatibleWebhookParams): Promise<void>
    /**
     * Add a new webhook to your GitHub repo (in the repo's settings), and use this endpoint as the "Payload URL." You can choose what events your Discord channel receives by choosing the "Let me select individual events" option and selecting individual events for the new webhook you're configuring. The supported events are `commit_comment`, `create`, `delete`, `fork`, `issue_comment`, `issues`, `member`, `public`, `pull_request`, `pull_request_review`, `pull_request_review_comment`, `push`, `release`, `watch`, `check_run`, `check_suite`, `discussion`, and `discussion_comment`.
     * @see https://discord.com/developers/docs/resources/webhook#execute-github-compatible-webhook
     */
    executeGithubCompatibleWebhook(webhook_id: snowflake, webhook_token: snowflake, params: ExecuteGithubCompatibleWebhookParams): Promise<void>
    /**
     * Returns a previously-sent webhook message from the same token. Returns a message object on success.
     * @see https://discord.com/developers/docs/resources/webhook#get-webhook-message
     */
    getWebhookMessage(webhook_id: snowflake, webhook_token: snowflake, message_id: snowflake, params: GetWebhookMessageParams): Promise<Message>
    /**
     * Edits a previously-sent webhook message from the same token. Returns a message object on success.
     * @see https://discord.com/developers/docs/resources/webhook#edit-webhook-message
     */
    editWebhookMessage(webhook_id: snowflake, webhook_token: snowflake, message_id: snowflake, params: EditWebhookMessageParams): Promise<Message>
    /**
     * Deletes a message that was created by the webhook. Returns a `204 No Content` response on success.
     * @see https://discord.com/developers/docs/resources/webhook#delete-webhook-message
     */
    deleteWebhookMessage(webhook_id: snowflake, webhook_token: snowflake, message_id: snowflake, params: DeleteWebhookMessageParams): Promise<void>
  }
}

Internal.define({
  '/channels/{channel.id}/webhooks': {
    POST: 'createWebhook',
    GET: 'getChannelWebhooks',
  },
  '/guilds/{guild.id}/webhooks': {
    GET: 'getGuildWebhooks',
  },
  '/webhooks/{webhook.id}': {
    GET: 'getWebhook',
    PATCH: 'modifyWebhook',
    DELETE: 'deleteWebhook',
  },
  '/webhooks/{webhook.id}/{webhook.token}': {
    GET: 'getWebhookWithToken',
    PATCH: 'modifyWebhookWithToken',
    DELETE: 'deleteWebhookWithToken',
    POST: { name: 'executeWebhook', multipart: true },
  },
  '/webhooks/{webhook.id}/{webhook.token}/slack': {
    POST: 'executeSlackCompatibleWebhook',
  },
  '/webhooks/{webhook.id}/{webhook.token}/github': {
    POST: 'executeGithubCompatibleWebhook',
  },
  '/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}': {
    GET: 'getWebhookMessage',
    PATCH: { name: 'editWebhookMessage', multipart: true },
    DELETE: 'deleteWebhookMessage',
  },
})
