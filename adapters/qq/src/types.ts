export enum Intents {
  /**
   * 频道事件
   * - GUILD_CREATE   当机器人加入新guild时
   * - GUILD_UPDATE   当guild资料发生变更时
   * - GUILD_DELETE   当机器人退出guild时
   * - CHANNEL_CREATE 当channel被创建时
   * - CHANNEL_UPDATE 当channel被更新时
   * - CHANNEL_DELETE 当channel被删除时
   */
  GUILDS = 1 << 0,
  /**
   * 频道成员事件
   * - GUILD_MEMBER_ADD    当成员加入时
   * - GUILD_MEMBER_UPDATE 当成员资料变更时
   * - GUILD_MEMBER_REMOVE 当成员被移除时
   */
  GUILD_MEMBERS = 1 << 1,
  /**
   * 消息事件，仅 *私域* 机器人能够设置此 intents。
   * - MESSAGE_CREATE 发送消息事件，代表频道内的全部消息，而不只是 at 机器人的消息。内容与 AT_MESSAGE_CREATE 相同
   * - MESSAGE_DELETE 删除（撤回）消息事件
   */
  GUILD_MESSAGES = 1 << 9,
  /**
   * 频道表情表态事件
   * - MESSAGE_REACTION_ADD    为消息添加表情表态
   * - MESSAGE_REACTION_REMOVE 为消息删除表情表态
   */
  GUILD_MESSAGE_REACTIONS = 1 << 10,
  /**
   * 监听私聊消息事件
   * - DIRECT_MESSAGE_CREATE 当收到用户发给机器人的私信消息时
   * - DIRECT_MESSAGE_DELETE 删除（撤回）消息事件
   */
  DIRECT_MESSAGES = 1 << 12,
  /**
   * 论坛事件, 此为公域的论坛事件
   * - OPEN_FORUM_THREAD_CREATE 当用户创建主题时
   * - OPEN_FORUM_THREAD_UPDATE 当用户更新主题时
   * - OPEN_FORUM_THREAD_DELETE 当用户删除主题时
   * - OPEN_FORUM_POST_CREATE   当用户创建帖子时
   * - OPEN_FORUM_POST_DELETE   当用户删除帖子时
   * - OPEN_FORUM_REPLY_CREATE  当用户回复评论时
   * - OPEN_FORUM_REPLY_DELETE  当用户删除评论时
   */
  OPEN_FORUMS_EVENT = 1 << 18,
  /**
   * 音视频/直播子频道成员进出事件
   * - AUDIO_OR_LIVE_CHANNEL_MEMBER_ENTER 当用户进入音视频/直播子频道
   * - AUDIO_OR_LIVE_CHANNEL_MEMBER_EXIT  当用户离开音视频/直播子频道
   */
  AUDIO_OR_LIVE_CHANNEL_MEMBER = 1 << 19,
  /**
   * - C2C_MESSAGE_CREATE 用户在单聊发送消息给机器人
   * - GROUP_AT_MESSAGE_CREATE 用户在群聊 @ 机器人发送消息
   */
  USER_MESSAGE = 1 << 25,
  /**
   * - INTERACTION_CREATE 互动事件创建时
   */
  INTERACTIONS = 1 << 26,
  /**
   * - MESSAGE_AUDIT_PASS   消息审核通过
   * - MESSAGE_AUDIT_REJECT 消息审核不通过
   */
  MESSAGE_AUDIT = 1 << 27,
  /**
   * 论坛事件，仅 *私域* 机器人能够设置此 intents。
   * - FORUM_THREAD_CREATE        当用户创建主题时
   * - FORUM_THREAD_UPDATE        当用户更新主题时
   * - FORUM_THREAD_DELETE        当用户删除主题时
   * - FORUM_POST_CREATE          当用户创建帖子时
   * - FORUM_POST_DELETE          当用户删除帖子时
   * - FORUM_REPLY_CREATE         当用户回复评论时
   * - FORUM_REPLY_DELETE         当用户回复评论时
   * - FORUM_PUBLISH_AUDIT_RESULT 当用户发表审核通过时
   */
  FORUM_EVENT = 1 << 28,
  /**
   * 音频相关事件
   * - AUDIO_START   音频开始播放时
   * - AUDIO_FINISH  音频播放结束时
   * - AUDIO_ON_MIC  上麦时
   * - AUDIO_OFF_MIC 下麦时
   */
  AUDIO_ACTION = 1 << 29,
  /**
   * 消息事件，此为公域的消息事件
   * - AT_MESSAGE_CREATE     当收到@机器人的消息时
   * - PUBLIC_MESSAGE_DELETE 当频道的消息被删除时
   */
  PUBLIC_GUILD_MESSAGES = 1 << 30
}

export enum Opcode {
  /** 服务端进行消息推送 */
  DISPATCH = 0,
  /** 客户端或服务端发送心跳 */
  HEARTBEAT = 1,
  /** 客户端发送鉴权 */
  IDENTIFY = 2,
  /** 客户端恢复连接 */
  RESUME = 6,
  /** 服务端通知客户端重新连接 */
  RECONNECT = 7,
  /** 当identify或resume的时候，如果参数有错，服务端会返回该消息 */
  INVALID_SESSION = 9,
  /** 当客户端与网关建立ws连接之后，网关下发的第一条消息 */
  HELLO = 10,
  /** 当发送心跳成功之后，就会收到该消息 */
  HEARTBEAT_ACK = 11,
  /** 仅用于 http 回调模式的回包，代表机器人收到了平台推送的数据 */
  HTTP_CAKKBACK_ACK = 12
}

export type WithOpUser<T> = T & { op_user_id: string }

export interface GatewayEvents {
  READY: {
    version: number
    session_id: string
    user: User
    shard: [number, number]
  }
  RESUMED: string
  MESSAGE_CREATE: Message
  MESSAGE_AUDIT_PASS: MessageAudited
  MESSAGE_AUDIT_REJECT: MessageAudited
  AT_MESSAGE_CREATE: Message
  DIRECT_MESSAGE_CREATE: Message
  MESSAGE_REACTION_ADD: MessageReaction
  MESSAGE_REACTION_REMOVE: MessageReaction
  GUILD_CREATE: WithOpUser<Guild>
  GUILD_UPDATE: WithOpUser<Guild>
  GUILD_DELETE: WithOpUser<Guild>
  CHANNEL_CREATE: WithOpUser<Channel>
  CHANNEL_UPDATE: WithOpUser<Channel>
  CHANNEL_DELETE: WithOpUser<Channel>
  GUILD_MEMBER_ADD: WithOpUser<MemberWithGuild>
  GUILD_MEMBER_UPDATE: WithOpUser<MemberWithGuild>
  GUILD_MEMBER_DELETE: WithOpUser<MemberWithGuild>
  MESSAGE_DELETE: Message.DeletionPayload
  PUBLIC_MESSAGE_DELETE: Message.DeletionPayload
  DIRECT_MESSAGE_DELETE: Message.DeletionPayload
  AUDIO_START: Partial<AudioAction>
  AUDIO_FINISH: Partial<AudioAction>
  AUDIO_ON_MIC: Partial<AudioAction>
  AUDIO_OFF_MIC: Partial<AudioAction>
  FORUM_THREAD_CREATE: Forum.Thread
  FORUM_THREAD_UPDATE: Forum.Thread
  FORUM_THREAD_DELETE: Forum.Thread
  FORUM_POST_CREATE: Forum.Post
  FORUM_POST_DELETE: Forum.Post
  FORUM_REPLY_CREATE: Forum.Reply
  FORUM_REPLY_DELETE: Forum.Reply
  FORUM_PUBLISH_AUDIT_RESULT: Forum.AuditResult
  OPEN_FORUM_THREAD_CREATE: Partial<Forum.Thread>
  OPEN_FORUM_THREAD_UPDATE: Partial<Forum.Thread>
  OPEN_FORUM_THREAD_DELETE: Partial<Forum.Thread>
  OPEN_FORUM_POST_CREATE: Partial<Forum.Thread>
  OPEN_FORUM_POST_DELETE: Partial<Forum.Thread>
  OPEN_FORUM_REPLY_CREATE: Partial<Forum.Thread>
  OPEN_FORUM_REPLY_DELETE: Partial<Forum.Thread>
  AUDIO_OR_LIVE_CHANNEL_MEMBER_ENTER: Partial<Channel>
  AUDIO_OR_LIVE_CHANNEL_MEMBER_EXIT: Partial<Channel>
  C2C_MESSAGE_CREATE: UserMessage
  GROUP_AT_MESSAGE_CREATE: UserMessage
  INTERACTION_CREATE: Interaction
  GROUP_ADD_ROBOT: GroupEvent
  GROUP_DEL_ROBOT: GroupEvent
  GROUP_MSG_REJECT: GroupEvent
  GROUP_MSG_RECEIVE: GroupEvent
  FRIEND_ADD: UserEvent
  FRIEND_DEL: UserEvent
  C2C_MSG_REJECT: UserEvent
  C2C_MSG_RECEIVE: UserEvent
}

export interface GetGatewayResponse {
  url: string
}

export interface GetGatewayBotResponse {
  url: string
  shards: number
  session_start_limit: {
    total: number
    remaining: number
    reset_after: number
    max_concurrency: number
  }
}

export interface PayloadStructure<O extends Opcode, T extends keyof GatewayEvents, D> {
  /** opcode for the payload */
  op: O
  /** event data */
  d?: D
  /** the event name for this payload */
  t?: T
  /** sequence number, used for resuming sessions and heartbeats */
  s?: number
}

export type DispatchPayload = {
  [T in keyof GatewayEvents]: PayloadStructure<Opcode.DISPATCH, T, GatewayEvents[T]>
}[keyof GatewayEvents]

export type Payload = DispatchPayload | {
  op: Opcode.HELLO
  d: {
    heartbeat_interval: number
  }
} | {
  op: Opcode.RECONNECT
} | {
  op: Opcode.IDENTIFY
  d: {
    /** 是创建机器人的时候分配的，格式为Bot {appid}.{app_token} */
    token: string
    /** 是此次连接所需要接收的事件，具体可参考 [Intents](https://bot.q.qq.com/wiki/develop/api/gateway/intents.html) */
    intents: Intents | number
    /**
     * 该参数是用来进行水平分片的。该参数是个拥有两个元素的数组。
     * 例如：[0, 4]，代表分为四个片，当前链接是第 0 个片，业务稍后应该继续建立 shard 为[1, 4],[2, 4],[3, 4]的链接，才能完整接收事件。
     * 更多详细的内容可以参考 [Shard](https://bot.q.qq.com/wiki/develop/api/gateway/shard.html)。
     */
    shard?: [number, number]
    /** 目前无实际作用 */
    properties?: {
    }
  }
} | {
  op: Opcode.HEARTBEAT
  /** 为客户端收到的最新的消息的 `s`，如果是第一次连接，传 `null`。 */
  d: number
} | {
  op: Opcode.HEARTBEAT_ACK
} | {
  op: Opcode.RESUME
  d: {
    token: string
    session_id: string
    seq: number
  }
} | {
  op: Opcode.INVALID_SESSION
}

export interface Attachment {
  content_type: string
  filename: string
  height: number
  id: string
  size: number
  url: string
  width: number
}

export interface AudioAction {
  /** 频道id */
  guild_id: string
  /** 子频道id */
  channel_id: string
  /** 音频数据的url status为0时传 */
  audio_url: string
  /** 状态文本（比如：简单爱-周杰伦），可选，status为0时传，其他操作不传 */
  text: string
}

export interface MessageAudited {
  /** 消息审核 id */
  audit_id: string
  /** 消息 id，只有审核通过事件才会有值 */
  message_id: string
  /** 频道 id */
  guild_id: string
  /* 子频道 id */
  channel_id: string
  /* 消息审核时间 */
  audit_time: string
  /* 消息创建时间 */
  create_time: string
  /** 子频道消息 seq，用于消息间的排序，seq 在同一子频道中按从先到后的顺序递增，不同的子频道之间消息无法排序 */
  seq_in_channel: string
}

export interface Message {
  /** 消息 id */
  id: string
  /** 消息创建者 */
  author: User
  /** 消息内容 */
  content?: string
  /** 频道 id */
  guild_id: string
  /** 子频道 id */
  channel_id: string
  /** 消息创建时间 */
  timestamp: string
  /** 消息编辑时间 */
  edited_timestamp: string
  /** 是否是@全员消息 */
  mention_everyone: boolean
  /** 附件 */
  attachments: Attachment[]
  /** embed */
  embeds: Message.Embed[]
  /** 消息中@的人 */
  mentions?: User
  /** 消息创建者的 member 信息 */
  member: Member
  /** ark消息 */
  ark?: Message.Ark
  /** 子频道消息 seq，用于消息间的排序，seq 在同一子频道中按从先到后的顺序递增，不同的子频道之间消息无法排序 */
  seq_in_channel?: string
  /** 引用消息对象 */
  message_reference?: Message.Reference
  /** 用于私信场景下识别真实的来源频道id */
  src_guild_id?: string
  direct_message?: boolean
  tts?: boolean
  pinned?: boolean
  type?: number
  flags?: number
}

export namespace Message {
  export enum Type {
    TEXT = 0,
    MIXED = 1,
    MARKDOWN = 2,
    ARK = 3,
    EMBED = 4,
    MEDIA = 7,
  }
  export interface Ark {
    /** ark 模板 id（需要先申请） */
    template_id: number
    /** kv 值列表 */
    kv: ArkKv[]
  }
  export interface ArkKv {
    key: string
    value?: string
    /** ark obj 类型的列表 */
    obj?: ArkObj[]
  }
  export interface ArkObj {
    /** ark objkv 列表 */
    objKv: ArkObjKv[]
  }
  export interface ArkObjKv {
    key: string
    value: string
  }
  export interface EmbedField {
    /** 字段名 */
    name: string
    /** 字段值 */
    value: string
  }
  export interface Embed {
    /** 标题 */
    title: string
    /** 描述 */
    description: string
    /** 消息弹窗内容 */
    prompt: string
    /** 消息创建时间 */
    timestamp: Date
    /** 对象数组 消息创建时间 */
    fields: EmbedField
  }
  export interface Markdown {
    /** markdown 模板 id */
    custom_template_id?: string
    /** markdown 模板模板参数 */
    params?: MarkdownParam[]
    /** 原生 markdown 内容，与 template_id 和 params 参数互斥，参数都传值将报错。 */
    content?: string
  }
  export interface MarkdownParam {
    /** markdown 模版 key */
    key: string
    /** markdown 模版 key 对应的 values ，列表长度大小为 1 代表单 value 值，长度大于1则为列表类型的参数 values 传参数 */
    values: string[]
  }
  export interface Reference {
    /** 需要引用回复的消息 id */
    message_id: string
    /** 是否忽略获取引用消息详情错误，默认否 */
    ignore_get_message_error?: boolean
  }
  export interface ChannelRequest {
    content?: string
    embed?: object
    ark?: Ark
    message_reference?: {
      message_id: string
      ignore_get_message_error?: boolean
    }
    image?: string
    msg_id?: string
    event_id?: string
    markdown?: Markdown
  }
  export interface Request {
    /** 文本内容 */
    content?: string
    /** 消息类型
     * 当发送 md，ark，embed 的时候 centent 字段需要填入随意内容，否则发送失败
     */
    msg_type: Type
    markdown?: Markdown
    keyboard?: Partial<MessageKeyboard>
    ark?: Ark
    // image?: unknown
    message_reference?: {
      message_id: string
      ignore_get_message_error?: boolean
    }
    event_id?: string
    msg_id?: string
    msg_seq?: number
    media?: Partial<File.Response>
  }

  export interface ResponseBase extends Message {
    tts: boolean
    type: number
    flags: number
    pinned: boolean
    embeds: Embed[]
    mentionEveryone: boolean
  }

  export type Response = ResponseBase & {
    code: number
    message: string
    data: any
  }

  export interface DeletionPayload {
    message: Partial<Message>
    op_user: Pick<User, 'id'>
  }
  export namespace File {
    export enum Type {
      IMAGE = 1,
      VIDEO = 2,
      AUDIO = 3,
      FILE = 4
    }
    export interface Request {
      file_type: Type
      url?: string
      srv_send_msg: boolean
      file_data?: unknown
    }

    export interface Response {
      file_uuid: string
      file_info: string
      ttl: number
    }

  }
}

export interface User {
  id: string
  username: string
  avatar: string
  bot: boolean
  /** 特殊关联应用的 openid，需要特殊申请并配置后才会返回。如需申请，请联系平台运营人员。 */
  union_openid: string
  /** 机器人关联的互联应用的用户信息，与union_openid关联的应用是同一个。如需申请，请联系平台运营人员。 */
  union_user_account: string
}

export type CreateGuildRoleParams =
  Partial<Pick<Role, 'name' | 'color' | 'hoist'>>

export interface Role {
  /** 身份组 ID , 默认值可参考 DefaultRoles */
  id: string
  /** 名称 */
  name: string
  /** ARGB 的 HEX 十六进制颜色值转换后的十进制数值 */
  color: number
  /** 是否在成员列表中单独展示: 0-否, 1-是 */
  hoist: number
  /** 人数 */
  number: number
  /** 成员上限 */
  member_limit: number
}

export enum DefaultRoles {
  /** 全体成员 */
  ALL = 1,
  /** 管理员 */
  ADMIN = 2,
  /** 群主/创建者 */
  OWNER = 4,
  /** 子频道管理员 */
  SUBCHANNEL_ADMIN = 5
}

export interface Member {
  /** 用户基础信息，来自QQ资料，只有成员相关接口中会填充此信息 */
  user: User
  /** 用户在频道内的昵称 */
  nick: string
  /** 用户在频道内的身份组ID, 默认值可参考DefaultRoles */
  roles: string[]
  /** 用户加入频道的时间 */
  joined_at: string
}

export interface Guild {
  id: string
  name: string
  icon: string
  owner: boolean
  owner_id?: string
  member_count?: number
  max_members?: number
  description?: number
  joined_at?: string
}

export type CreateGuildParams =
  Pick<Channel, 'name' | 'type' | 'sub_type' | 'position'
    | 'parent_id' | 'private_type' | 'speak_permission' | 'application_id'> & {
      private_user_ids: string[]
    }

export type ModifyGuildParams =
  Pick<Channel, 'name' | 'position' | 'parent_id' | 'private_type' | 'speak_permission'>

export enum ChannelType {
  /** 文字子频道 */
  TEXT = 0,
  /** 语音子频道 */
  VOICE = 2,
  /** 子频道分组 */
  GROUP = 4,
  /** 直播子频道 */
  LIVE = 10005,
  /** 应用子频道 */
  APPLICATION = 10006,
  /** 论坛子频道 */
  FORUM = 10007
}

export enum ChannelSubType {
  /** 闲聊 */
  IDLE = 0,
  /** 公告 */
  ANNOUNCEMENT = 1,
  /** 攻略 */
  STRATEGY = 2,
  /** 开黑 */
  BLACK = 3
}

export interface ChannelPermissions {
  /** 子频道 id */
  channel_id: string
  /** 用户 id */
  user_id: string
  /** 用户拥有的子频道权限 */
  permissions: string
}

export enum ChannelPrivateType {
  /** 公开频道 */
  PUBLIC = 0,
  /** 群主管理员可见 */
  ADMIN_ONLY = 1,
  /** 群主管理员+指定成员 */
  SELECTED_MEMBERS = 2
}

export enum ChannelSpeakPermission {
  /** 无效类型 */
  INVALID = 0,
  /** 所有人 */
  ALL = 1,
  /** 群主管理员+指定成员 */
  SELECTED_MEMBERS = 2
}

export interface Channel {
  /** 子频道 id */
  id: string
  /** 频道 id */
  guild_id: string
  /** 子频道名 */
  name: string
  /** 子频道类型 */
  type: ChannelType
  /** 子频道子类型 */
  sub_type: ChannelSubType
  /** 排序，必填，而且不能够和其他子频道的值重复 */
  position: number
  /** 分组 id */
  parent_id: string
  /** 创建人 id */
  owner_id: string
  /** 子频道私密类型 */
  private_type: ChannelPrivateType
  /** 子频道发言权限 */
  speak_permission: ChannelSpeakPermission
  /** 用于标识应用子频道应用类型，仅应用子频道时会使用该字段 */
  application_id?: string
  /** 子频道私密类型 */
  permissions: string
}

export interface MemberWithGuild {
  /** 频道 id */
  guild_id: string
  /** 用户基础信息 */
  user: User
  /** 用户在频道内的昵称 */
  nick: string
  /** 用户在频道内的身份 */
  roles: string[]
  /** 用户加入频道的时间 */
  joined_at: string
}

export interface CreateGuildAnnounceParams {
  message_id: string
  channel_id: string
  announces_type: AnnounceType
  recommend_channels: RecommendChannel[]
}

export enum AnnounceType {
  MEMBER = 0,
  WELCOME = 1
}

/** 推荐子频道对象 */
export interface RecommendChannel {
  /** 子频道 id */
  channel_id: string
  /** 推荐语 */
  introduce: string
}

/**
 * 公告对象
 */
export interface Announces {
  /** 频道 id */
  guild_id: string
  /** 子频道 id */
  channel_id: string
  /** 消息 id */
  message_id: string
}

/**
 * 表情表态对象
 */
export interface MessageReaction {
  /** 用户 ID */
  user_id: string
  /** 频道 ID */
  guild_id: string
  /** 子频道 ID */
  channel_id: string
  /** 表态对象 */
  target: ReactionTarget
  /** 表态所用表情 */
  emoji: Emoji
}

/**
 * 表态对象
 */
export interface ReactionTarget {
  /** 表态对象 ID */
  id: string
  /** 表态对象类型 */
  type: ReactionTargetType
}

/**
 * 表态对象类型
 */
export enum ReactionTargetType {
  /** 消息 */
  MESSAGE = 'ReactionTargetType_MSG',
  /** 帖子 */
  POST = 'ReactionTargetType_FEED',
  /** 评论 */
  COMMENT = 'ReactionTargetType_COMMNENT',
  /** 回复 */
  REPLY = 'ReactionTargetType_REPLY'
}

/**
 * 表情对象
 */
export interface Emoji {
  /**
   * 表情 ID
   * 系统表情使用数字为 ID
   * emoji 使用 emoji 本身为 id
   */
  id: string
  /** 表情类型 */
  type: number
}

/**
 * 表情类型
 */
export enum EmojiType {
  /** 系统表情 */
  SYSTEM = 1,
  /** emoji 表情 */
  DEFAULT = 2
}

/**
 * 日程对象
 */
export interface Schedule {
  /** 日程 id */
  id: string
  /** 日程名称 */
  name: string
  /** 日程描述 */
  description: string
  /** 日程开始时间戳(ms) */
  start_timestamp: string
  /** 日程结束时间戳(ms) */
  endTimestamp: string
  /** 创建者 */
  creator: Member
  /** 日程开始时跳转到的子频道 id */
  jump_channel_id: string
  /** 日程提醒类型，取值参考 RemindType */
  remind_type: RemindType
}

/**
 * 日程提醒类型
 */
export enum RemindType {
  /** 不提醒 */
  NEVER = '0',
  /** 开始时提醒 */
  START = '1',
  /** 开始前5分钟提醒 */
  BEFORE_5 = '2',
  /** 开始前15分钟提醒 */
  BEFORE_15 = '3',
  /** 开始前30分钟提醒 */
  BEFORE_30 = '4',
  /** 开始前60分钟提醒 */
  BEFORE_60 = '5',
}

export interface Mute {
  /** 禁言到期时间戳，绝对时间戳，单位：秒（与 mute_seconds 字段同时赋值的话，以该字段为准） */
  mute_end_timestamp?: string
  /** 禁言多少秒（两个字段二选一，默认以 mute_end_timestamp 为准） */
  mute_seconds?: number
  /** 禁言成员的user_id列表，即 User 的id */
  user_ids?: string[]
}

export enum DeleteHistoryMsgDays {
  ALL = -1,
  NONE = 0,
  DAY_3 = 3,
  DAY_7 = 7,
  DAY_15 = 15,
  DAY_30 = 30,
}

export interface MessageSetting {
  /** 是否允许创建私信 */
  disable_create_dm: string
  /** 是否允许发主动消息 */
  disable_push_msg: string
  /** 子频道 id 数组 */
  channel_ids: string
  /** 每个子频道允许主动推送消息最大消息条数 */
  channel_push_max_num: string
}

/**
 * 创建的私信会话
 */
export interface DMS {
  /** 私信会话关联的频道 id */
  guild_id: string
  /** 私信会话关联的子频道 id */
  channel_id: string
  /** 创建私信会话时间戳 */
  create_time: string
}

/**
 * 精华消息对象
 */
export interface PinsMessage {
  /** 频道 id */
  guild_id: string
  /** 子频道 id */
  channel_id: string
  /** 子频道内精华消息 id 数组 */
  message_ids: string[]
}

/**
 * 接口权限对象
 */
export interface APIPermission {
  /** API 接口名，例如 /guilds/{guild_id}/members/{user_id} */
  path: string
  /** 请求方法，例如 GET */
  method: string
  /** API 接口名称，例如 获取频道信息 */
  desc: string
  /** 授权状态，auth_stats 为 1 时已授权 */
  auth_status: number
}

export interface APIPermissionDemandIdentify {
  /** API 接口名，例如 /guilds/{guild_id}/members/{user_id} */
  path: string
  /** 请求方法，例如 GET */
  method: string
}

/**
 * 接口权限需求对象
 */
export interface APIPermissionDemand {
  /** 申请接口权限的频道 id */
  guild_id: string
  /** 接口权限需求授权链接发送的子频道 id */
  channel_id: string
  /** 权限接口唯一标识 */
  api_identify: APIPermissionDemandIdentify
  /** 接口权限链接中的接口权限描述信息 */
  title: string
  /** 接口权限链接中的机器人可使用功能的描述信息 */
  desc: string
}

export interface Options {
  id: string
  secret: string
  token: string
  type: 'public' | 'private'
  /** 是否开启沙箱模式 */
  sandbox?: boolean
  endpoint?: string
  /** 目前还不支持 bearer 验证方式。 */
  authType?: 'bot' | 'bearer'
  /** 重连次数 */
  retryTimes?: number
  /** 重连时间间隔，单位 ms */
  retryInterval?: number
}

export namespace Forum {
  /** 话题频道内发表的主帖称为主题 */
  export interface Thread {
    /** 频道ID */
    guild_id: string
    /** 子频道ID */
    channel_id: string
    /** 作者ID */
    author_id: string
    /** 主帖内容 */
    thread_info: ThreadInfo
  }

  /** 帖子事件包含的主帖内容相关信息 */
  export interface ThreadInfo {
    /** 主帖ID */
    thread_id: string
    /** 帖子标题 */
    title: string
    /** 帖子内容 */
    content: string
    /** 发表时间 */
    date_time: string
  }

  /** 话题频道内对主题的评论称为帖子 */
  export interface Post {
    /** 频道ID */
    guild_id: string
    /** 子频道ID */
    channel_id: string
    /** 作者ID */
    author_id: string
    /** 帖子内容 */
    post_info: PostInfo
  }

  /** 帖子事件包含的帖子内容信息 */
  export interface PostInfo {
    /** 主题ID */
    thread_id: string
    /** 帖子ID */
    post_id: string
    /** 帖子内容 */
    content: string
    /** 评论时间 */
    date_time: string
  }

  /** 话题频道内对帖子的评论称为回复 */
  export interface Reply {
    /** 频道ID */
    guild_id: string
    /** 子频道ID */
    channel_id: string
    /** 作者ID */
    author_id: string
    /** 回复内容 */
    reply_info: ReplyInfo
  }

  /** 回复事件包含的回复内容信息 */
  interface ReplyInfo {
    /** 主题ID */
    thread_id: string
    /** 帖子ID */
    post_id: string
    /** 回复ID */
    reply_id: string
    /** 回复内容 */
    content: string
    /** 回复时间 */
    date_time: string
  }

  /** 论坛帖子审核结果事件 */
  export interface AuditResult {
    /** 频道ID */
    guild_id: string
    /** 子频道ID */
    channel_id: string
    /** 作者ID */
    author_id: string
    /** 主题ID */
    thread_id: string
    /** 帖子ID */
    post_id: string
    /** 回复ID */
    reply_id: string
    /** 审核的类型 */
    type: AuditType
    /** 审核结果. 0:成功 1:失败 */
    result: number
    /** result不为0时错误信息 */
    err_msg: string
  }

  export enum AuditType {
    /** 帖子 */
    PUBLISH_THREAD = 1,
    /** 评论 */
    PUBLISH_POST = 2,
    /** 回复 */
    PUBLISH_REPLY = 3
  }
  /** 富文本内容 */
  export interface RichObject {
    /** 富文本类型 */
    type: RichType
    /** 文本 */
    text_info: TextInfo
    /** @ 内容 */
    at_info: AtInfo
    /** 链接 */
    url_info: URLInfo
    /** 表情 */
    emoji_info: EmojiInfo
    /** 提到的子频道 */
    channel_info: ChannelInfo
  }

  export enum RichType {
    /** 普通文本 */
    TEXT = 1,
    /** at信息 */
    AT = 2,
    /** url信息 */
    URL = 3,
    /** 表情 */
    EMOJI = 4,
    /** #子频道 */
    CHANNEL = 5,
    /** 视频 */
    VIDEO = 10,
    /** 图片 */
    IMAGE = 11
  }

  export interface TextInfo {
    /** 普通文本 */
    text: string
  }

  export interface AtInfo {
    /** at类型 */
    type: AtType
    /** 用户 */
    user_info: AtUserInfo
    /** 角色组信息 */
    role_info: AtRoleInfo
    /** 频道信息 */
    guild_info: AtGuildInfo
  }

  export enum AtType {
    /** at特定人 */
    AT_EXPLICIT_USER = 1,
    /** at角色组所有人 */
    AT_ROLE_GROUP = 2,
    /** at频道所有人 */
    AT_GUILD = 3
  }

  export interface AtUserInfo {
    /** 身份组ID */
    id: string
    /** 用户昵称 */
    nick: string
  }

  export interface AtRoleInfo {
    /** 身份组ID */
    role_id: number
    /** 身份组名称 */
    name: string
    /** 颜色值 */
    color: number
  }

  export interface AtGuildInfo {
    /** 频道ID */
    guild_id: string
    /** 频道名称 */
    guild_name: string
  }

  export interface URLInfo {
    /** 链接地址 */
    url: string
    /** 链接显示文本 */
    display_text: string
  }

  export interface EmojiInfo {
    /** 表情id */
    id: string
    /** 表情类型 */
    type: string
    /** 名称 */
    name: string
    /** 链接 */
    url: string
  }

  export interface ChannelInfo {
    /** 子频道id */
    channel_id: number
    /** 子频道名称 */
    channel_name: string
  }

  /** 富文本内容 */
  export interface RichText {
    /** 段落，一段落一行，段落内无元素的为空行 */
    paragraphs: Paragraph[]
  }

  export interface Paragraph {
    /** 元素列表 */
    elems: Elem[]
    /** 段落属性 */
    props: ParagraphProps
  }

  export interface Elem {
    /** 文本元素 */
    text: TextElem
    /** 图片元素 */
    image: ImageElem
    /** 视频元素 */
    video: VideoElem
    /** URL元素 */
    url: URLElem
    /** 元素类型 */
    type: ElemType
  }

  export enum ElemType {
    /** 文本 */
    ELEM_TYPE_TEXT = 1,
    /** 图片 */
    ELEM_TYPE_IMAGE = 2,
    /** 视频 */
    ELEM_TYPE_VIDEO = 3,
    /** URL */
    ELEM_TYPE_URL = 4
  }

  export interface TextElem {
    /** 正文 */
    text: string
    /** 文本属性 */
    props: TextProps
  }

  export interface TextProps {
    /** 加粗 */
    font_bold: boolean
    /** 斜体 */
    italic: boolean
    /** 下划线 */
    underline: boolean
  }

  export interface ImageElem {
    /** 第三方图片链接 */
    third_url: string
    /** 宽度比例（缩放比，在屏幕里显示的比例） */
    width_percent: number
  }

  export interface PlatImage {
    /** 架平图片链接 */
    url: string
    /** 图片宽度 */
    width: number
    /** 图片高度 */
    height: number
    /** 图片ID */
    image_id: string
  }

  export interface VideoElem {
    /** 第三方视频文件链接 */
    third_url: string
  }

  export interface PlatVideo {
    /** 架平图片链接 */
    url: string
    /** 图片宽度 */
    width: number
    /** 图片高度 */
    height: number
    /** 视频ID */
    video_id: string
    /** 视频时长 */
    duration: number
    /** 视频封面图属性 */
    cover: PlatImage
  }

  export interface URLElem {
    /** URL链接 */
    url: string
    /** URL描述 */
    desc: string
  }

  export interface ParagraphProps {
    /** 段落对齐方向属性，数值可以参考Alignment */
    alignment: Alignment
  }

  enum Alignment {
    /** 左对齐 */
    ALIGNMENT_LEFT = 0,
    /** 居中 */
    ALIGNMENT_MIDDLE = 1,
    /** 右对齐 */
    ALIGNMENT_RIGHT = 2
  }

  export interface CreatePostRequest {
    /** 帖子标题 */
    title: string
    /** 帖子内容 */
    content: string
    /** 帖子文本格式 */
    format: PostFormat
  }

  export enum PostFormat {
    FORMAT_TEXT = 1,
    FORMAT_HTML = 2,
    FORMAT_MARKDOWN = 3,
    FORMAT_JSON = 4
  }
}

export interface UserMessage {
  id: string
  author: {
    id: string
  }
  content: string
  timestamp: string
  group_id: string
  attachments?: Attachment[] // not listed in document?
}

export enum ChatType {
  GROUP = 1,
  DIRECT = 2,
  CHANNEL = 3
}

export interface Interaction {
  /** 平台方事件 ID，可以用于被动消息发送 */
  id: string
  /** 按钮事件固定是 11 */
  type: 11
  // chat_type: number
  /** 消息生产时间 */
  timestamp: string
  /** 频道的 openid */
  guild_id: string
  /** 文字子频道的 openid */
  channel_id: string
  /** 群聊的 openid */
  group_openid: string
  user_openid: string
  group_member_openid: string
  /** 目前只有群和单聊有该字段，1 群聊，2 单聊，后续加入 3 频道 */
  chat_type: ChatType
  data: {
    resolved: {
      /** 操作按钮的data字段值 */
      button_data: string
      /** 操作按钮的id字段值 */
      button_id: string
      /** 操作的用户 openid */
      user_id?: string
    }
  }
  /** 默认 1 */
  version: 1
}

export interface GroupEvent {
  timestamp: number
  group_openid: string
  op_member_openid: string
}

export interface UserEvent {
  timestamp: number
  openid: string
}

export interface MessageKeyboard {
  id: string
  content: InlineKeyboard
}

export interface InlineKeyboard {
  rows: InlineKeyboardRow[]
}

export interface InlineKeyboardRow {
  buttons: Button[]
}

export interface Button {
  /** 按钮 ID：在一个 keyboard 消息内设置唯一 */
  id?: string
  render_data: {
    /** 按钮上的文字 */
    label: string
    /** 点击后按钮上的文字 */
    visited_label?: string
    /** 按钮样式：0 灰色线框，1 蓝色线框 */
    style?: number
  }
  action: {
    /**
     * 设置 0 跳转按钮：http 或 小程序 客户端识别 scheme，
     * 设置 1 回调按钮：回调后台接口, data 传给后台，
     * 设置 2 指令按钮：自动在输入框插入 &#64;bot data
     */
    type: number
    permission: {
      /** 0 指定用户可操作，1 仅管理者可操作，2 所有人可操作，3 指定身份组可操作（仅频道可用） */
      type: number
      /** 有权限的用户 id 的列表 */
      specify_user_ids?: string[]
      /** 有权限的身份组 id 的列表（仅频道可用） */
      specify_role_ids?: string[]
    }
    /** 操作相关的数据 */
    data: string
    /** 指令按钮可用，指令是否带引用回复本消息，默认 false。支持版本 8983 */
    reply?: boolean
    /** 指令按钮可用，点击按钮后直接自动发送 data，默认 false。支持版本 8983 */
    enter?: boolean
    /**
     *  本字段仅在指令按钮下有效设置后后会忽略 action.enter 配置。
     * 设置为 1 时 ，点击按钮自动唤起启手Q选图器，其他值暂无效果。
     * （仅支持手机端版本 8983+ 的单聊场景，桌面端不支持）
     */
    anchor?: number
    /** @deprecated */
    click_limit?: number
    /** @deprecated */
    at_bot_show_channel_list?: boolean
    /** 客户端不支持本 action 的时候，弹出的 toast 文案 */
    unsupport_tips?: string
  }
}
