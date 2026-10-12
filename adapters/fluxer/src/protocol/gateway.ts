/**
 * Fluxer 主网关协议（不在 OpenAPI 里，按官方文档固化）：
 * https://docs.fluxer.app/gateway/overview 、/gateway/events 、/gateway/opcodes-and-close-codes
 */

export namespace Gateway {
  export enum Opcode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
    GATEWAY_ERROR = 12,
    VOICE_SIGNAL = 13,
    LAZY_REQUEST = 14,
    REQUEST_GUILD_COUNTS = 15,
    REQUEST_CHANNEL_MEMBER_COUNTS = 16,
    REQUEST_FORUM_UNREADS = 28,
  }

  export interface Payload<T = any> {
    op: Opcode
    d?: T
    /** 仅 Dispatch 携带：会话序列 */
    s?: number
    /** 仅 Dispatch 携带：事件名（大写） */
    t?: string
  }

  export interface Hello {
    heartbeat_interval: number
  }

  export interface Identify {
    token: string
    properties: {
      os: string
      browser: string
      device: string
    }
    /** Identify 可选字段（文档未穷举），留给扩展 */
    [key: string]: any
  }

  export interface Resume {
    token: string
    session_id: string
    seq: number
  }

  export interface Ready {
    session_id: string
    version: number
    user: Record<string, any>
    guilds: { id: string; unavailable?: boolean }[]
    private_channels: Record<string, any>[]
    [key: string]: any
  }

  export interface GatewayError {
    code: string
    message: string
  }

  /** close code：4006 未分配，>4012 未定义 */
  export enum CloseCode {
    UNKNOWN_ERROR = 4000,
    UNKNOWN_OPCODE = 4001,
    DECODE_ERROR = 4002,
    NOT_AUTHENTICATED = 4003,
    AUTHENTICATION_FAILED = 4004,
    ALREADY_AUTHENTICATED = 4005,
    INVALID_SEQUENCE = 4007,
    RATE_LIMITED = 4008,
    SESSION_TIMEOUT = 4009,
    INVALID_SHARD = 4010,
    SHARDING_REQUIRED = 4011,
    INVALID_API_VERSION = 4012,
  }
}

/** 实例发现文档（/.well-known/fluxer） */
export interface Discovery {
  endpoints: {
    api: string
    api_client: string
    api_public: string
    gateway: string
    media: string
    upload_relay: string
    static_cdn: string
    marketing: string
    admin: string
    invite: string
    gift: string
    webapp: string
  }
}

/** Fluxer 的频道类型（值域与 Discord 相同） */
export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16,
  /** Fluxer 特有：个人/系统频道 */
  DM_PERSONAL = 998,
  SYSTEM = 999,
}

export const THREAD_TYPES: ChannelType[] = [
  ChannelType.ANNOUNCEMENT_THREAD,
  ChannelType.PUBLIC_THREAD,
  ChannelType.PRIVATE_THREAD,
]
