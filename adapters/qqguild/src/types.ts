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
  HEARTBEAT_ACK = 11
}

export type DispatchPayload = {
  op: Opcode.DISPATCH
  s: number
  t: 'READY'
  d: {
    version: number
    sessionId: string
    user: User
    shard: [number, number]
  }
} | {
  op: Opcode.DISPATCH
  s: number
  t: 'RESUME'
  d: string
} | {
  op: Opcode.DISPATCH
  s: number
  t: 'MESSAGE_CREATE' | 'AT_MESSAGE_CREATE' | 'DIRECT_MESSAGE_CREATE'
  d: Message
} | {
  op: Opcode.DISPATCH
  s: number
  t: 'MESSAGE_REACTION_ADD' | 'MESSAGE_REACTION_REMOVE'
  d: MessageReaction
} | {
  op: Opcode.DISPATCH
  s: number
  t: 'GUILD_CREATE' | 'GUILD_UPDATE' | 'GUILD_DELETE'
  d: Guild
} | {
  op: Opcode.DISPATCH
  s: number
  t: 'CHANNEL_CREATE' | 'CHANNEL_UPDATE' | 'CHANNEL_DELETE'
  d: Channel
} | {
  op: Opcode.DISPATCH
  s: number
  t: 'GUILD_MEMBER_ADD' | 'GUILD_MEMBER_UPDATE' | 'GUILD_MEMBER_DELETE'
  d: MemberWithGuild
}

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
    sessionId: string
    seq: number
  }
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
}

export namespace Message {
  export interface Ark {
    /** ark 模板 id（需要先申请） */
    templateId: number
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
    templateId?: number
    /** markdown 模板模板参数 */
    params?: MarkdownParams
    /** 原生 markdown 内容，与 template_id 和 params 参数互斥，参数都传值将报错。 */
    content?: string
  }
  export interface MarkdownParams {
    /** markdown 模版 key */
    key: string
    /** markdown 模版 key 对应的 values ，列表长度大小为 1 代表单 value 值，长度大于1则为列表类型的参数 values 传参数 */
    values: string[]
  }
  export interface Reference {
    /** 需要引用回复的消息 id */
    message_id: string
    /** 是否忽略获取引用消息详情错误，默认否 */
    ignoreGetMessageError?: boolean
  }
  export interface Request {
    /** 选填，消息内容，文本内容，支持内嵌格式 */
    content?: string
    /** 选填，embed 消息，一种特殊的 ark */
    embed?: Embed
    /** 选填，ark 消息 */
    ark?: Ark
    /**
     * 选填，引用消息
     *
     * 传入值为 string 类型时默认为 msgId
     */
    messageReference?: string | Reference
    /**
     * 选填，图片 url 地址，平台会转存该图片，用于下发图片消息
     *
     * 该 url 必须为 https 链接
     */
    image?: string
    /** 图片文件。form-data 支持直接通过文件上传的方式发送图片。 */
    // @TODO fix type
    // fileImage?: PathLike | ReadStream | Buffer
    /** 选填，要回复的消息 id(Message.id), 在 AT_CREATE_MESSAGE 事件中获取。 */
    msgId?: string
    /** 选填，要回复的事件 id, 在各事件对象中获取。 */
    eventId?: string
    /** 选填，markdown 消息 */
    markdown?: string | Markdown
  }
  export interface Response extends Message {
    tts: boolean
    type: number
    flags: number
    pinned: boolean
    embeds: Embed[]
    mentionEveryone: boolean
  }
}

export interface User {
  id: string
  username: string
  avatar: string
  bot: boolean
}

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
  memberLimit: number
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
  joinedAt: Date
}

export interface Guild {
  id: string
  name: string
  icon: string
  owner: boolean
  ownerId?: string
  memberCount?: number
  maxMembers?: number
  description?: number
  joinedAt?: Date
}

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
  subType: ChannelSubType
  /** 排序，必填，而且不能够和其他子频道的值重复 */
  position: number
  /** 分组 id */
  parentId: string
  /** 创建人 id */
  ownerId: string
  /** 子频道私密类型 */
  privateType: ChannelPrivateType
  /** 子频道发言权限 */
  speakPermission: ChannelSpeakPermission
  /** 用于标识应用子频道应用类型，仅应用子频道时会使用该字段 */
  applicationId?: string
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
  joinedAt: Date
}

/**
 * 公告对象
 */
export interface Announce {
  /** 频道 id */
  guild_id: string
  /** 子频道 id */
  channel_id: string
  /** 消息 id */
  messageId: string
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
  startTimestamp: Date
  /** 日程结束时间戳(ms) */
  endTimestamp: Date
  /** 创建者 */
  creator: Member
  /** 日程开始时跳转到的子频道 id */
  jumpchannel_id: string
  /** 日程提醒类型，取值参考 RemindType */
  remindType: RemindType
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
  /** 禁言到期时间戳，绝对时间戳，单位：秒（与 muteSeconds 字段同时赋值的话，以该字段为准） */
  muteEndTimestamp?: string
  /** 禁言多少秒（两个字段二选一，默认以 muteEndTimestamp 为准） */
  muteSeconds?: number
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
  disableCreateDm: string
  /** 是否允许发主动消息 */
  disablePushMsg: string
  /** 子频道 id 数组 */
  channel_ids: string
  /** 每个子频道允许主动推送消息最大消息条数 */
  channelPushMaxNum: string
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
  messageIds: string[]
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
  authStatus: number
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
  apiIdentify: APIPermissionDemandIdentify
  /** 接口权限链接中的接口权限描述信息 */
  title: string
  /** 接口权限链接中的机器人可使用功能的描述信息 */
  desc: string
}

export interface AppConfig {
  id: string
  key: string
  token: string
  type: 'public' | 'private'
}

export interface Options {
  app: AppConfig
  /** 是否开启沙箱模式 */
  sandbox: boolean
  endpoint?: string
  /** 目前还不支持 bearer 验证方式。 */
  authType?: 'bot' | 'bearer'
  /** 重连次数 */
  retryTimes?: number
  /** 重连时间间隔，单位 ms */
  retryInterval?: number
}
