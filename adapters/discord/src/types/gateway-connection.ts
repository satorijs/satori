import { integer, Internal } from '.'

/** https://discord.com/developers/docs/events/gateway#get-gateway-bot-json-response */
export interface GatewayConnection {
  /** WSS URL that can be used for connecting to the Gateway */
  url: string
  /** Recommended number of shards to use when connecting */
  shards: integer
  /** Information on the current session start limit */
  session_start_limit: GatewayConnection.SessionStartLimit
}

export namespace GatewayConnection {
  /** https://discord.com/developers/docs/events/gateway#session-start-limit-object-session-start-limit-structure */
  export interface SessionStartLimit {
    /** Total number of session starts the current user is allowed */
    total: integer
    /** Remaining number of session starts the current user is allowed */
    remaining: integer
    /** Number of milliseconds after which the limit resets */
    reset_after: integer
    /** Number of identify requests allowed per 5 seconds */
    max_concurrency: integer
  }

  /** https://discord.com/developers/docs/events/gateway#get-gateway-bot-json-response */
  export interface PackResult {
    /** WSS URL that can be used for connecting to the Gateway */
    url: string
    /** Recommended number of shards to use when connecting */
    shards: integer
    /** Information on the current session start limit */
    session_start_limit: GatewayConnection.SessionStartLimit
  }
}

declare module './internal' {
  interface Internal {
    /**
     * <Info>
     * @see https://discord.com/developers/docs/events/gateway#get-gateway
     */
    getGateway(): Promise<void>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/events/gateway#get-gateway-bot
     */
    getGatewayBot(): Promise<void>
  }
}

Internal.define({
  '/gateway': {
    GET: 'getGateway',
  },
  '/gateway/bot': {
    GET: 'getGatewayBot',
  },
})
