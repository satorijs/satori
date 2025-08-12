import { Internal } from '../internal'

/**
 * 发送频道消息@全体成员/@在线成员
 */
export interface ChatroomV2ChannelMsgSendParams {
  /**
   * "@{here}" 等价于@在线成员,该消息会推送当前房间的所有在线成员，增加所有在线成员的未读消息数量。 "@{all}"等价于 @全体成员,该消息会推送当前房间的所有在线成员，增加所有成员的未读消息数量。
   */
  msg: string;
  msg_type: number;
  heychat_ack_id: string;
  reply_id: string;
  room_id: string;
  addition: string;
  at_user_id: string;
  at_role_id: string;
  mention_channel_id: string;
  channel_id: string;
  channel_type: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelMsgSend: (data: ChatroomV2ChannelMsgSendParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel_msg/send': {
    POST: 'postChatroomV2ChannelMsgSend',
  },
})

/**
 * 更新指定的频道消息
 */
export interface ChatroomV2ChannelMsgUpdateParams {
  /**
   * 文字消息内容
   */
  msg: string;
  /**
   * 消息类型： 1: 文本 3: 图片 4: markdown 10: 支持AT的markdown
   */
  msg_type: number;
  heychat_ack_id: string;
  /**
   * 回复的消息ID
   */
  reply_id?: string;
  /**
   * 发送消息的房间ID
   */
  room_id: string;
  /**
   * 需要用json.dumps转换成字符串再填充
   */
  addition: string;
  /**
   * AT的用户ID列表"123,234"
   */
  at_user_id?: string;
  /**
   * AT的角色ID列表"123,234"
   */
  at_role_id?: string;
  /**
   * 提及的频道ID"123456",可以直接跳转到某个频道
   */
  mention_channel_id?: string;
  /**
   * 发送消息的频道ID
   */
  channel_id: string;
  /**
   * 更新的消息id
   */
  msg_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelMsgUpdate: (data: ChatroomV2ChannelMsgUpdateParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel_msg/update': {
    POST: 'postChatroomV2ChannelMsgUpdate',
  },
})

/**
 * 删除指定的频道消息
 */
export interface ChatroomV2ChannelMsgDeleteParams {
  /**
   * 消息id
   */
  msg_id: string;
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 频道id
   */
  channel_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelMsgDelete: (data: ChatroomV2ChannelMsgDeleteParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel_msg/delete': {
    POST: 'postChatroomV2ChannelMsgDelete',
  },
})

/**
 * 对某条频道消息增加/取消回应(小表情)
 */
export interface ChatroomV2ChannelMsgEmojiReplyParams {
  /**
   * 消息id
   */
  msg_id: string;
  /**
   * [custom3358126864697663488_1737773988806922240.jpg],具体查看房间表情包文档
   */
  emoji: string;
  /**
   * 增加还是删除回应,1是增加 0是删除
   */
  is_add: number;
  /**
   * 频道id
   */
  channel_id: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelMsgEmojiReply: (data: ChatroomV2ChannelMsgEmojiReplyParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel_msg/emoji/reply': {
    POST: 'postChatroomV2ChannelMsgEmojiReply',
  },
})

/**
 * 给用户发送私聊消息
 */
export interface ChatroomV3MsgUserParams {
  /**
   * 消息内容
   */
  msg: string;
  /**
   * 消息类型
   */
  msg_type: number;
  /**
   * 自增不重复字段
   */
  heychat_ack_id: string;
  /**
   * 扩展字段
   */
  addition: string;
  /**
   * 对方用户ID
   */
  to_user_id: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV3MsgUser: (data: ChatroomV3MsgUserParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v3/msg/user': {
    POST: 'postChatroomV3MsgUser',
  },
})

/**
 * 获取房间角色列表
 */
export interface ChatroomV2RoomRoleRolesParams {
  /** 房间ID */
  room_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2RoomRoleRoles: (data: ChatroomV2RoomRoleRolesParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room_role/roles': {
    GET: 'getChatroomV2RoomRoleRoles',
  },
})

/**
 * 创建角色
 */
export interface ChatroomV2RoomRoleCreateParams {
  /**
   * 角色名称。
   */
  name: string;
  /**
   * 角色icon的url
   */
  icon?: string;
  /**
   * 渐变色的颜色数组
   */
  color_list?: number[];
  /**
   * 房间 ID，与部门 ID 相同
   */
  room_id: string;
  /**
   * 权限值
   */
  permissions: string;
  /**
   * 创建的新角色仅为0
   */
  type: number;
  /**
   * 颜色值，在界面展示中用于区分不同角色。
   */
  color?: number;
  /**
   * 是否将该角色成员在右侧和普通成员区分显示,1是区分0是不区分
   */
  hoist: number;
  /**
   * 随机值,防止重复请求
   */
  nonce: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomRoleCreate: (data: ChatroomV2RoomRoleCreateParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room_role/create': {
    POST: 'postChatroomV2RoomRoleCreate',
  },
})

/**
 * 更新角色
 */
export interface ChatroomV2RoomRoleUpdateParams {
  /**
   * 角色id
   */
  id: string;
  /**
   * 角色名称。
   */
  name: string;
  /**
   * 角色icon的url
   */
  icon: string;
  /**
   * 渐变色的颜色数组
   */
  color_list: number[];
  /**
   * 房间 ID
   */
  room_id: string;
  /**
   * 权限值
   */
  permissions: string;
  /**
   * 创建的新角色仅为0
   */
  type: number;
  /**
   * 颜色值，在界面展示中用于区分不同角色。
   */
  color: number;
  /**
   * 是否将该角色成员在右侧和普通成员区分显示,1是区分0是不区分
   */
  hoist: number;
  /**
   * 随机值,防止重复请求
   */
  nonce: string;
  /**
   * 角色位置排序
   */
  position: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomRoleUpdate: (data: ChatroomV2RoomRoleUpdateParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room_role/update': {
    POST: 'postChatroomV2RoomRoleUpdate',
  },
})

/**
 * 删除角色
 */
export interface ChatroomV2RoomRoleDeleteParams {
  /**
   * 角色id
   */
  role_id: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomRoleDelete: (data: ChatroomV2RoomRoleDeleteParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room_role/delete': {
    POST: 'postChatroomV2RoomRoleDelete',
  },
})

/**
 * 对指定用户授予指定权限
 */
export interface ChatroomV2RoomRoleGrantParams {
  /**
   * 用户id
   */
  to_user_id: number;
  /**
   * 角色id
   */
  role_id: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomRoleGrant: (data: ChatroomV2RoomRoleGrantParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room_role/grant': {
    POST: 'postChatroomV2RoomRoleGrant',
  },
})

/**
 * 对指定用户剥夺指定权限
 */
export interface ChatroomV2RoomRoleRevokeParams {
  /**
   * 用户id
   */
  to_user_id: number;
  /**
   * 角色id
   */
  role_id: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomRoleRevoke: (data: ChatroomV2RoomRoleRevokeParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room_role/revoke': {
    POST: 'postChatroomV2RoomRoleRevoke',
  },
})

/**
 * 获取房间上传的表情包
 */
export interface ChatroomV3MsgMemeRoomListParams {
  /** 房间ID */
  room_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV3MsgMemeRoomList: (data: ChatroomV3MsgMemeRoomListParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v3/msg/meme/room/list': {
    GET: 'getChatroomV3MsgMemeRoomList',
  },
})

/**
 * 房间删除表情包
 */
export interface ChatroomV2MsgMemeRoomDelParams {
  path: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2MsgMemeRoomDel: (data: ChatroomV2MsgMemeRoomDelParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/msg/meme/room/del': {
    POST: 'postChatroomV2MsgMemeRoomDel',
  },
})

/**
 * 房间更新表情包名称
 */
export interface ChatroomV2MsgMemeRoomEditParams {
  /**
   * 表情包path
   */
  path: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2MsgMemeRoomEdit: (data: ChatroomV2MsgMemeRoomEditParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/msg/meme/room/edit': {
    POST: 'postChatroomV2MsgMemeRoomEdit',
  },
})

/**
 * 修改房间内昵称
 */
export interface ChatroomV2RoomNicknameParams {
  nickname: string;
  room_id: string;
  to_user_id: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomNickname: (data: ChatroomV2RoomNicknameParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/nickname': {
    POST: 'postChatroomV2RoomNickname',
  },
})

/**
 * 分页获取加入的房间列表
 */
export interface ChatroomV2RoomJoinedParams {
  offset: string;
  limit: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2RoomJoined: (data: ChatroomV2RoomJoinedParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/joined': {
    GET: 'getChatroomV2RoomJoined',
  },
})

/**
 * 获取房间信息
 */
export interface ChatroomV2RoomViewParams {
  /** 房间id */
  room_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2RoomView: (data: ChatroomV2RoomViewParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/view': {
    GET: 'getChatroomV2RoomView',
  },
})

/**
 * 退出房间
 */
export interface ChatroomV2RoomLeaveParams {
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomLeave: (data: ChatroomV2RoomLeaveParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/leave': {
    POST: 'postChatroomV2RoomLeave',
  },
})

/**
 * 房间踢人
 */
export interface ChatroomV2RoomKickOutParams {
  room_id: string;
  to_user_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomKickOut: (data: ChatroomV2RoomKickOutParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/kick_out': {
    POST: 'postChatroomV2RoomKickOut',
  },
})

/**
 * 语音频道之间移动用户
 */
export interface ChatroomV2ChannelMoveMemberParams {
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelMoveMember: (origin_channel_id: string, to_user_ids: array, room_id: string, channel_id: string, data: ChatroomV2ChannelMoveMemberParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel/move_member': {
    POST: 'postChatroomV2ChannelMoveMember',
  },
})

/**
 * 踢出语音频道中的用户
 */
export interface ChatroomV2ChannelKickOutParams {
  /**
   * 被操作用户id
   */
  to_user_id: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelKickOut: (heybox_id: string, room_id: string, channel_id: string, data: ChatroomV2ChannelKickOutParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel/kick_out': {
    POST: 'postChatroomV2ChannelKickOut',
  },
})

/**
 * 禁言/解禁用户
 */
export interface ChatroomV2RoomBanParams {
  /**
   * 封禁时间(s) 为0则解除封禁
   */
  duration: number;
  /**
   * 原因 用于审核日志
   */
  reason: string;
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 封禁/解封对象id
   */
  to_user_id: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomBan: (data: ChatroomV2RoomBanParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/ban': {
    POST: 'postChatroomV2RoomBan',
  },
})

/**
 * 频道内麦克风静音/解禁
 * 对未静音对象调用时对其静音;对静音对象调用时解除静音
 */
export interface ChatroomV2ChannelMuteUserParams {
  /**
   * 被操作对象id
   */
  to_user_id: number;
  /**
   * 频道id
   */
  channel_id: string;
  /**
   * 房间id
   */
  room_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelMuteUser: (data: ChatroomV2ChannelMuteUserParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel/mute_user': {
    POST: 'postChatroomV2ChannelMuteUser',
  },
})

/**
 * 房间内麦克风静音/解禁
 */
export interface ChatroomV2RoomMuteParams {
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 是否静音
   */
  mute: boolean;
  /**
   * 被操作对象id
   */
  to_user_id: number;
  /**
   * 频道id
   */
  channel_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomMute: (data: ChatroomV2RoomMuteParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/mute': {
    POST: 'postChatroomV2RoomMute',
  },
})

/**
 * 房间内扬声器静音/解禁
 */
export interface ChatroomV2RoomMuteEarphoneParams {
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 是否静音
   */
  mute: boolean;
  /**
   * 被操作对象id
   */
  to_user_id: number;
  channel_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoomMuteEarphone: (data: ChatroomV2RoomMuteEarphoneParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/mute_earphone': {
    POST: 'postChatroomV2RoomMuteEarphone',
  },
})

/**
 * 获取用户所在频道
 * bot需要在查询的房间中
 */
export interface ChatroomV2ChannelWhichUserParams {
  /** 查询用户id */
  to_user_id: string;
  /** 房间id */
  room_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2ChannelWhichUser: (data: ChatroomV2ChannelWhichUserParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel/which_user': {
    GET: 'getChatroomV2ChannelWhichUser',
  },
})

/**
 * 获取语音频道内在线成员列表
 */
export interface ChatroomV2ChannelUserListParams {
  channel_id: string;
  room_id: string;
  heybox_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2ChannelUserList: (data: ChatroomV2ChannelUserListParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel/user/list': {
    GET: 'getChatroomV2ChannelUserList',
  },
})

/**
 * 创建频道邀请链接
 * 需要 创建邀请 权限
 */
export interface ChatroomV2InviteCodeParams {
  /** bot id */
  user_id: string;
  /** 房间id */
  room_id: string;
  /** 频道id */
  channel_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2InviteCode: (data: ChatroomV2InviteCodeParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/invite/code': {
    GET: 'getChatroomV2InviteCode',
  },
})

/**
 * 频道设置修改
 * 需要 编辑频道 权限

| setting | value | desc |
| --- | --- | --- |
| slow_mode | 10 | 发送消息速度|
| max_count | 100 | 频道最大人数 |
| is_private | 1 | 是否为私密频道 |
 */
export interface ChatroomV2SettingsChannelEditParams {
  /**
   * 频道id
   */
  channel_id: string;
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 配置项
   */
  setting: string;
  /**
   * 配置项的值
   */
  value: number;
  /**
   * 频道类型
   */
  channel_type: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2SettingsChannelEdit: (data: ChatroomV2SettingsChannelEditParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/settings/channel/edit': {
    POST: 'postChatroomV2SettingsChannelEdit',
  },
})

/**
 * 频道名编辑
 * 需要 编辑频道 权限
 */
export interface ChatroomV2ChannelEditParams {
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 频道id
   */
  channel_id: string;
  /**
   * 频道名
   */
  channel_name: string;
  channel_type: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2ChannelEdit: (data: ChatroomV2ChannelEditParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/channel/edit': {
    POST: 'postChatroomV2ChannelEdit',
  },
})

/**
 * 设置频道密码
 */
export interface ChatroomChannelEditPasswordNoEncryptParams {
}

declare module '../internal' {
  interface Internal {
    postChatroomChannelEditPasswordNoEncrypt: (password: string, channel_id: string, room_id: string, data: ChatroomChannelEditPasswordNoEncryptParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/channel/edit_password/no_encrypt': {
    POST: 'postChatroomChannelEditPasswordNoEncrypt',
  },
})

/**
 * 修改权限组或成员权限
 * # 服务器权限管理文档

## 通用服务器权限

| 权限名称            | 位标识        | 描述                 |
|-------------------|--------------|--------------------|
| 管理员              | `1 << 0`     | 管理员权限               |
| 查看频道            | `1 << 1`     | 查看频道权限             |
| 编辑、管理频道       | `1 << 2`     | 编辑和管理频道权限        |
| 查看审核日志         | `1 << 3`     | 查看审核日志权限          |
| 管理角色             | `1 << 4`     | 管理角色权限             |
| 管理房间             | `1 << 5`     | 管理房间权限             |
| 管理语句             | `1 << 28`    | 管理语句权限             |
| 修改频道内其他人的邀约 | `1 << 29`    | 修改频道内其他人的邀约权限 |
| 管理表情包           | `1 << 30`    | 管理表情包权限            |
| 管理语音包           | `1 << 31`    | 管理语音包权限            |
| 播放语音包           | `1 << 32`    | 播放语音包权限            |
| 播放伴奏             | `1 << 33`    | 播放伴奏权限             |
| 共享屏幕             | `1 << 34`    | 共享屏幕权限             |
| 游戏组队             | `1 << 35`    | 游戏组队权限             |
| 房间活动管理         | `1 << 38`    | 房间活动管理权限          |

## 成员身份权限

| 权限名称               | 位标识        | 描述                         |
|----------------------|--------------|----------------------------|
| 创建邀请               | `1 << 6`     | 创建邀请权限                   |
| 管理邀请               | `1 << 7`     | 管理邀请权限                   |
| 修改昵称               | `1 << 8`     | 修改昵称权限                   |
| 管理昵称               | `1 << 9`     | 管理昵称权限                   |
| 踢出房间               | `1 << 10`    | 踢出房间权限                   |
| 踢出频道               | `1 << 11`    | 踢出频道权限                   |
| 封锁成员               | `1 << 12`    | 封锁成员权限                   |
| 临时禁言成员           | `1 << 13`    | 临时禁言成员权限               |

## 文字频道权限

| 权限名称                | 位标识        | 描述                       |
|----------------------|--------------|--------------------------|
| 发送消息               | `1 << 14`    | 发送消息权限                 |
| 上传文件               | `1 << 15`    | 上传文件权限                 |
| @ 群组                 | `1 << 16`    | @ 群组权限                   |
| 添加表情               | `1 << 17`    | 添加表情权限                 |
| 管理消息               | `1 << 18`    | 管理消息权限                 |
| 读取历史消息           | `1 << 19`    | 读取历史消息权限             |
| 创建开黑邀约            | `1 << 20`    | 创建开黑邀约权限              |
| 管理开黑邀约            | `1 << 21`    | 管理开黑邀约权限              |
| 使用bot命令            | `1 << 36`    | 使用bot命令权限               |
| 创建投票               | `1 << 37`    | 创建投票权限                 |
| 发送图片               | `1 << 39`    | 在频道内发送图片或markdown格式的图片消息权限 |

## 语音频道权限

| 权限名称                | 位标识        | 描述                       |
|----------------------|--------------|--------------------------|
| 加入语音频道           | `1 << 22`    | 加入语音频道权限             |
| 说话                   | `1 << 23`    | 说话权限                     |
| 使用自由麦             | `1 << 24`    | 使用自由麦权限                |
| 频道静音               | `1 << 25`    | 频道静音权限                 |
| 静音某人                | `1 << 26`    | 静音某人权限                 |
| 移动成员               | `1 << 27`    | 移动成员权限                 |
| 开启录音               | `1 << 40`    | 开启录音权限                 |

 */
export interface ChatroomV2RoleRoleUserPermParams {
  /**
   * 房间id
   */
  room_id: string;
  /**
   * 频道id
   */
  channel_id: string;
  roles: {
    /**
     * 权限组id
     */
    role_id?: string;
    /**
     * 允许的权限位
     */
    allow?: string;
    /**
     * 拒绝的权限位
     */
    deny?: string;
    /**
     * 频道类型
     */
    channel_type?: number;
    [k: string]: unknown;
  }[];
  users: {
    /**
     * 用户id
     */
    to_user_id?: number;
    /**
     * 允许的权限位
     */
    allow?: string;
    /**
     * 拒绝的权限位
     */
    deny?: string;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV2RoleRoleUserPerm: (heybox_id: string, data: ChatroomV2RoleRoleUserPermParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/role/role_user_perm': {
    POST: 'postChatroomV2RoleRoleUserPerm',
  },
})

/**
 * 获取房间用户列表
 */
export interface ChatroomV2RoomUsersParams {
  /** 用户id */
  heybox_id: string;
  offset: string;
  /** 最大值300 */
  limit: string;
  /** 房间id */
  room_id: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomV2RoomUsers: (data: ChatroomV2RoomUsersParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v2/room/users': {
    GET: 'getChatroomV2RoomUsers',
  },
})

/**
 * 推流至语音频道
 */
export interface ChatroomV3ChannelStreamPushParams {
  /**
   * 房间ID
   */
  room_id: string;
  /**
   * 频道ID
   */
  channel_id: string;
  /**
   * 源流URL
   */
  stream_url: string;
  /**
   * 音量，取值范围[0, 100]，默认100，表示原音量。
   */
  volume?: number;
  /**
   * 操作用户的UID
   */
  operator: number;
  /**
   * 回调链接 详见文档
   */
  callback_url?: string;
  /**
   * 指定视频从某个秒时间戳播放
   */
  seek_second?: number;
  /**
   * 循环播放次数, 取值范围[-1, 1000], 默认1次, -1为循环播放。线路2 不支持播放次数
   */
  repeat_num?: number;
  /**
   * 循环播放最大时长,仅支持RepeatNum设置-1时生效，取值范围[1, 10080]，单位分钟。
   */
  max_duration?: number;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV3ChannelStreamPush: (data: ChatroomV3ChannelStreamPushParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v3/channel/stream/push': {
    POST: 'postChatroomV3ChannelStreamPush',
  },
})

/**
 * 停止推流至语音频道
 */
export interface ChatroomV3ChannelStreamStopParams {
  /**
   * 任务ID
   */
  task_id: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomV3ChannelStreamStop: (data: ChatroomV3ChannelStreamStopParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/v3/channel/stream/stop': {
    POST: 'postChatroomV3ChannelStreamStop',
  },
})

/**
 * 刷新AccessToken
 */
export interface ChatroomApiTokenParams {
  /**
   * 授权类型, 目前支持 authorization_code 和 refresh_token
   */
  grant_type: string;
  /**
   * 客户端id
   */
  client_id: string;
  /**
   * 客户端密钥
   */
  client_secret: string;
  /**
   * 刷新token
   */
  refresh_token: string;
  [k: string]: unknown;
}

declare module '../internal' {
  interface Internal {
    postChatroomApiToken: (data: ChatroomApiTokenParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/api/token': {
    POST: 'postChatroomApiToken',
  },
})

/**
 * 获取用户信息-自动触发授权
 * 在发起api请求时可以携带以下query作为参数 如果没有token且用户在线则会为用户唤起授权弹窗
 */
export interface ChatroomApiAccountInfoParams {
  /** 用户ID */
  user_id: string;
  /** 客户端ID */
  client_id: string;
  /** 回调地址 */
  redirect_uri: string;
  /** 申请的权限 多个权限以空格分隔 */
  scope: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomApiAccountInfo: (data: ChatroomApiAccountInfoParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/api/account/info': {
    GET: 'getChatroomApiAccountInfo',
  },
})

/**
 * 获取用户房间内语音游戏时长
 * 时间跨度不能超过30天
appid可通过[获取房间信息]((apifox://link/endpoint/226373528))中的bind_game_infos获取
 */
export interface ChatroomApiDurationChatParams {
  /** 房间ID */
  room_id: string;
  /** 开始时间 unix时间戳 秒级 */
  begin_time: string;
  /** 结束时间 unix时间戳 秒级 */
  end_time: string;
  /** 游戏id */
  appid: string;
}

declare module '../internal' {
  interface Internal {
    getChatroomApiDurationChat: (data: ChatroomApiDurationChatParams) => Promise<void>
  }
}
Internal.define({
  '/chatroom/api/duration/chat': {
    GET: 'getChatroomApiDurationChat',
  },
})
