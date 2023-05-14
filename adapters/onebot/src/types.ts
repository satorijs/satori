import { camelize, Dict, Logger, Universal } from '@satorijs/satori'
import { CQCode } from './bot'

export interface Response {
  status: string
  retcode: number
  data: any
  echo?: number
}

export interface MessageId {
  message_id: number
}

export interface AccountInfo {
  user_id: number
  tiny_id?: string
  nickname: string
}

export interface QidianAccountInfo {
  master_id: number
  ext_name: string
  create_time: number
}

export interface StrangerInfo extends AccountInfo {
  sex: 'male' | 'female' | 'unknown'
  age: number
}

export interface TalkativeMemberInfo extends AccountInfo {
  avatar: string
  day_count: number
}

export type GroupRole = 'member' | 'admin' | 'owner'
export type HonorType = 'talkative' | 'performer' | 'legend' | 'strong_newbie' | 'emotion'

export interface HonoredMemberInfo {
  avatar: string
  description: string
}

export interface HonorInfo {
  current_talkative: TalkativeMemberInfo
  talkative_list: HonoredMemberInfo[]
  performer_list: HonoredMemberInfo[]
  legend_list: HonoredMemberInfo[]
  strong_newbie_list: HonoredMemberInfo[]
  emotion_list: HonoredMemberInfo[]
}

export interface SenderInfo extends StrangerInfo {
  area?: string
  level?: string
  title?: string
  role?: GroupRole
  card?: string
}

export interface Message extends MessageId {
  real_id?: number
  time: number
  message_seq: number
  message_type: 'private' | 'group' | 'guild'
  sender: SenderInfo
  group_id?: number
  guild_id?: string
  channel_id?: string
  message: string | CQCode[]
  anonymous?: AnonymousInfo
}

export interface AnonymousInfo {
  id: number
  name: string
  flag: string
}

export type RecordFormat = 'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac'
export type DataDirectory = 'image' | 'record' | 'show' | 'bface'

export interface FriendInfo extends AccountInfo {
  remark: string
}

export interface UnidirectionalFriendInfo extends AccountInfo {
  source: string
}

export interface Author extends Universal.Author {
  time?: string | number
  messageId?: string
}

export interface GroupBase {
  group_id: number
  group_name: string
}

export interface GroupInfo extends GroupBase {
  member_count: number
  max_member_count: number
}

export interface GroupMemberInfo extends SenderInfo {
  card_changeable: boolean
  group_id: number
  join_time: number
  last_sent_time: number
  title_expire_time: number
  unfriendly: boolean
}

export interface Credentials {
  cookies: string
  csrf_token: number
}

export interface ImageInfo {
  file: string
}

export interface RecordInfo {
  file: string
}

export interface VersionInfo {
  app_name?: string
  app_version?: string
  app_full_name?: string
  protocol_version?: string
  coolq_edition?: 'air' | 'pro'
  coolq_directory?: string
  plugin_version?: string
  plugin_build_number?: number
  plugin_build_configuration?: 'debug' | 'release'
  version?: string
  go_cqhttp?: boolean
  runtime_version?: string
  runtime_os?: string
  protocol?: string
}

export interface ImageInfo {
  size?: number
  filename?: string
  url?: string
}

export interface ForwardMessage {
  sender: AccountInfo
  time: number
  content: string
}

export interface EssenceMessage extends MessageId {
  sender_id: number
  sender_nick: string
  sender_time: number
  operator_id: number
  operator_nick: string
  operator_time: number
}

export interface VipInfo extends AccountInfo {
  level: number
  level_speed: number
  vip_level: number
  vip_growth_speed: number
  vip_growth_total: string
}

export interface GroupNotice {
  notice_id: string
  sender_id: number
  publish_time: number
  message: {
    text: string
    images: GroupNoticeImage[]
  }
}

export interface GroupNoticeImage {
  height: string
  width: string
  id: string
}

export interface Statistics {
  packet_received: number
  packet_sent: number
  packet_lost: number
  message_received: number
  message_sent: number
  disconnect_times: number
  lost_times: number
}

export interface StatusInfo {
  app_initialized: boolean
  app_enabled: boolean
  plugins_good: boolean
  app_good: boolean
  online: boolean
  good: boolean
  stat: Statistics
}

export interface TextDetection {
  text: string
  confidence: string
  coordinates: any
}

export interface OcrResult {
  language: string
  texts: TextDetection[]
}

export interface GroupRequest extends GroupBase {
  request_id: number
  invitor_uin: number
  invitor_nick: string
  checked: boolean
  actor: number
}

export interface InvitedRequest extends GroupRequest { }

export interface JoinRequest extends GroupRequest {
  message: string
}

export interface GroupSystemMessageInfo {
  invited_qequests: InvitedRequest[]
  join_requests: JoinRequest[]
}

export interface GroupFileSystemInfo {
  file_count: number
  limit_count: number
  used_space: number
  total_space: number
}

export interface GroupFile {
  file_id: string
  file_name: string
  busid: number
  file_size: number
  upload_time: number
  dead_time: number
  modify_time: number
  download_time: number
  uploader: number
  uploader_name: string
}

export interface GroupFolder {
  folder_id: string
  folder_name: string
  create_time: number
  creator: number
  creator_name: string
  total_file_count: number
}

export interface GroupFileList {
  files: GroupFile[]
  folders: GroupFolder[]
}

export interface AtAllRemain {
  can_at_all: boolean
  remain_at_all_count_for_group: number
  remain_at_all_count_for_uin: number
}

export interface Device {
  app_id: number
  device_name: string
  device_kind: string
}

export interface ModelVariant {
  model_show: string
  need_pay: boolean
}

export enum SafetyLevel {
  safe,
  unknown,
  danger,
}

export interface GuildServiceProfile {
  nickname: string
  tiny_id: string
  avatar_url: string
}

export interface GuildBaseInfo {
  guild_id: string
  guild_name: string
}

export interface GuildInfo extends GuildBaseInfo {
  guild_display_id: string
}

export interface GuildMeta extends GuildBaseInfo {
  guild_profile: string
  create_time: number
  max_member_count: number
  max_robot_count: number
  max_admin_count: number
  member_count: number
  owner_id: string
}

export interface ChannelInfo {
  owner_guild_id: string
  channel_id: string
  channel_type: number
  channel_name: string
  create_time: number
  creator_id: string
  creator_tiny_id: string
  talk_permission: number
  visible_type: number
  current_slow_mode: number
  slow_modes: SlowModeInfo[]
}

export interface SlowModeInfo {
  slow_mode_key: number
  slow_mode_text: string
  speak_frequency: number
  slow_mode_circle: number
}

export interface GuildMemberListData {
  members: GuildMemberInfo[]
  finished: boolean
  next_token: string
}

export interface GuildMemberRole {
  role_id: string
  role_name: string
}

export interface GuildMemberInfo extends GuildMemberRole {
  tiny_id: string
  title: string
  nickname: string
  role: number
}

export interface GuildMemberProfile {
  tiny_id: string
  nickname: string
  avatar_url: string
  join_time: number
  roles: GuildMemberRole[]
}

export interface ReactionInfo {
  emoji_id: string
  emoji_index: number
  emoji_type: number
  emoji_name: string
  count: number
  clicked: boolean
}

export interface Payload extends Message {
  time: number
  self_id: number
  self_tiny_id?: string
  post_type: string
  request_type: string
  notice_type: string
  meta_event_type: string
  honor_type: string
  sub_type: string
  message_id: number
  user_id: number
  target_id: number
  operator_id: number
  raw_message: string
  font: number
  comment: string
  flag: string
  old_info: ChannelInfo
  new_info: ChannelInfo
  channel_info: ChannelInfo
  current_reactions: ReactionInfo[]
  file: File
}

export interface File {
  name: string
  size: number
  url: string
}

type id = string | number

export interface Internal {
  sendPrivateMsg(user_id: id, message: string | readonly CQCode[], auto_escape?: boolean): Promise<number>
  sendPrivateMsgAsync(user_id: id, message: string | readonly CQCode[], auto_escape?: boolean): Promise<void>
  sendGroupMsg(group_id: id, message: string | readonly CQCode[], auto_escape?: boolean): Promise<number>
  sendGroupMsgAsync(group_id: id, message: string | readonly CQCode[], auto_escape?: boolean): Promise<void>
  sendGroupForwardMsg(group_id: id, messages: readonly CQCode[]): Promise<number>
  sendGroupForwardMsgAsync(group_id: id, messages: readonly CQCode[]): Promise<void>
  sendPrivateForwardMsg(user_id: id, messages: readonly CQCode[]): Promise<number>
  sendPrivateForwardMsgAsync(user_id: id, messages: readonly CQCode[]): Promise<void>
  deleteMsg(message_id: id): Promise<void>
  deleteMsgAsync(message_id: id): Promise<void>
  setEssenceMsg(message_id: id): Promise<void>
  setEssenceMsgAsync(message_id: id): Promise<void>
  deleteEssenceMsg(message_id: id): Promise<void>
  deleteEssenceMsgAsync(message_id: id): Promise<void>
  markMsgAsRead(message_id: id): Promise<void>
  sendLike(user_id: id, times?: number): Promise<void>
  sendLikeAsync(user_id: id, times?: number): Promise<void>
  sendGroupSign(group_id: id): Promise<void>
  sendGroupSignAsync(group_id: id): Promise<void>
  getMsg(message_id: id): Promise<Message>
  getForwardMsg(message_id: id): Promise<ForwardMessage[]>
  getEssenceMsgList(group_id: id): Promise<EssenceMessage[]>
  getWordSlices(content: string): Promise<string[]>
  ocrImage(image: string): Promise<OcrResult>
  getGroupMsgHistory(group_id: id, message_seq?: number): Promise<{ messages: Message[] }>
  deleteFriend(user_id: id): Promise<void>
  deleteFriendAsync(user_id: id): Promise<void>
  deleteUnidirectionalFriend(user_id: id): Promise<void>
  deleteUnidirectionalFriendAsync(user_id: id): Promise<void>
  setFriendAddRequest(flag: string, approve: boolean, remark?: string): Promise<void>
  setFriendAddRequestAsync(flag: string, approve: boolean, remark?: string): Promise<void>
  setGroupAddRequest(flag: string, subType: 'add' | 'invite', approve: boolean, reason?: string): Promise<void>
  setGroupAddRequestAsync(flag: string, subType: 'add' | 'invite', approve: boolean, reason?: string): Promise<void>

  setGroupKick(group_id: id, user_id: id, reject_add_request?: boolean): Promise<void>
  setGroupKickAsync(group_id: id, user_id: id, reject_add_request?: boolean): Promise<void>
  setGroupBan(group_id: id, user_id: id, duration?: number): Promise<void>
  setGroupBanAsync(group_id: id, user_id: id, duration?: number): Promise<void>
  setGroupWholeBan(group_id: id, enable?: boolean): Promise<void>
  setGroupWholeBanAsync(group_id: id, enable?: boolean): Promise<void>
  setGroupAdmin(group_id: id, user_id: id, enable?: boolean): Promise<void>
  setGroupAdminAsync(group_id: id, user_id: id, enable?: boolean): Promise<void>
  setGroupAnonymous(group_id: id, enable?: boolean): Promise<void>
  setGroupAnonymousAsync(group_id: id, enable?: boolean): Promise<void>
  setGroupCard(group_id: id, user_id: id, card?: string): Promise<void>
  setGroupCardAsync(group_id: id, user_id: id, card?: string): Promise<void>
  setGroupLeave(group_id: id, is_dismiss?: boolean): Promise<void>
  setGroupLeaveAsync(group_id: id, is_dismiss?: boolean): Promise<void>
  setGroupSpecialTitle(group_id: id, user_id: id, special_title?: string, duration?: number): Promise<void>
  setGroupSpecialTitleAsync(group_id: id, user_id: id, special_title?: string, duration?: number): Promise<void>
  setGroupName(group_id: id, name: string): Promise<void>
  setGroupNameAsync(group_id: id, name: string): Promise<void>
  setGroupPortrait(group_id: id, file: string, cache?: boolean): Promise<void>
  setGroupPortraitAsync(group_id: id, file: string, cache?: boolean): Promise<void>
  getGroupAtAllRemain(group_id: id): Promise<AtAllRemain>
  sendGroupNotice(group_id: id, content: string): Promise<void>
  sendGroupNoticeAsync(group_id: id, content: string): Promise<void>
  getGroupNotice(group_id: id): Promise<GroupNotice[]>
  delGroupNotice(group_id: id, notice_id: id): Promise<void>

  getLoginInfo(): Promise<AccountInfo>
  qidianGetLoginInfo(): Promise<QidianAccountInfo>
  setQqProfile(nickname: string, company: string, email: string, college: string, personal_note: string): Promise<void>
  setQqProfileAsync(nickname: string, company: string, email: string, college: string, personal_note: string): Promise<void>
  getVipInfo(): Promise<VipInfo>
  getStrangerInfo(user_id: id, no_cache?: boolean): Promise<StrangerInfo>
  getFriendList(): Promise<FriendInfo[]>
  getUnidirectionalFriendList(): Promise<UnidirectionalFriendInfo[]>
  getGroupInfo(group_id: id, no_cache?: boolean): Promise<GroupInfo>
  getGroupList(): Promise<GroupInfo[]>
  getGroupMemberInfo(group_id: id, user_id: id, no_cache?: boolean): Promise<GroupMemberInfo>
  getGroupMemberList(group_id: id, no_cache?: boolean): Promise<GroupMemberInfo[]>
  getGroupHonorInfo(group_id: id, type: HonorType): Promise<HonorInfo>
  getGroupSystemMsg(): Promise<GroupSystemMessageInfo>

  // files
  getGroupFileSystemInfo(group_id: id): Promise<GroupFileSystemInfo>
  getGroupRootFiles(group_id: id): Promise<GroupFileList>
  getGroupFilesByFolder(group_id: id, folder_id: string): Promise<GroupFileList>
  getGroupFileUrl(group_id: id, file_id: string, busid: number): Promise<string>
  downloadFile(url: string, headers?: string | readonly string[], thread_count?: number): Promise<string>
  uploadPrivateFile(user_id: id, file: string, name: string): Promise<void>
  uploadGroupFile(group_id: id, file: string, name: string, folder?: string): Promise<void>
  createGroupFileFolder(group_id: id, folder_id: string, name: string): Promise<void>
  deleteGroupFolder(group_id: id, folder_id: string): Promise<void>
  deleteGroupFile(group_id: id, folder_id: string, file_id: string, busid: number): Promise<void>

  getOnlineClients(no_cache?: boolean): Promise<Device[]>
  checkUrlSafely(url: string): Promise<SafetyLevel>
  getModelShow(model: string): Promise<ModelVariant[]>
  setModelShow(model: string, model_show: string): Promise<void>

  getCookies(domain?: string): Promise<string>
  getCsrfToken(): Promise<number>
  getCredentials(domain?: string): Promise<Credentials>
  getRecord(file: string, out_format: RecordFormat, full_path?: boolean): Promise<RecordInfo>
  getImage(file: string): Promise<ImageInfo>
  canSendImage(): Promise<boolean>
  canSendRecord(): Promise<boolean>
  getStatus(): Promise<StatusInfo>
  getVersionInfo(): Promise<VersionInfo>
  setRestart(delay?: number): Promise<void>
  reloadEventFilter(): Promise<void>

  getGuildServiceProfile(): Promise<GuildServiceProfile>
  getGuildList(): Promise<GuildInfo[]>
  getGuildMetaByGuest(guild_id: id): Promise<GuildMeta>
  getGuildChannelList(guild_id: id, no_cache: boolean): Promise<ChannelInfo[]>
  getGuildMemberList(guild_id: id, next_token?: string): Promise<GuildMemberListData>
  getGuildMemberProfile(guild_id: id, user_id: id): Promise<GuildMemberProfile>
  sendGuildChannelMsg(guild_id: id, channel_id: id, message: string | readonly CQCode[]): Promise<number>
}

export class TimeoutError extends Error {
  constructor(args: Dict, url: string) {
    super(`Timeout with request ${url}, args: ${JSON.stringify(args)}`)
    Object.defineProperties(this, {
      args: { value: args },
      url: { value: url },
    })
  }
}

class SenderError extends Error {
  constructor(args: Dict, url: string, retcode: number) {
    super(`Error with request ${url}, args: ${JSON.stringify(args)}, retcode: ${retcode}`)
    Object.defineProperties(this, {
      code: { value: retcode },
      args: { value: args },
      url: { value: url },
    })
  }
}

const logger = new Logger('onebot')

export class Internal {
  _request?(action: string, params: Dict): Promise<Response>

  private async _get<T = any>(action: string, params = {}): Promise<T> {
    logger.debug('[request] %s %o', action, params)
    const response = await this._request(action, params)
    logger.debug('[response] %o', response)
    const { data, retcode } = response
    if (retcode === 0) return data
    throw new SenderError(params, action, retcode)
  }

  async setGroupAnonymousBan(group_id: string, meta: string | object, duration?: number) {
    const args = { group_id, duration } as any
    args[typeof meta === 'string' ? 'flag' : 'anonymous'] = meta
    await this._get('set_group_anonymous_ban', args)
  }

  async setGroupAnonymousBanAsync(group_id: string, meta: string | object, duration?: number) {
    const args = { group_id, duration } as any
    args[typeof meta === 'string' ? 'flag' : 'anonymous'] = meta
    await this._get('set_group_anonymous_ban_async', args)
  }

  private static asyncPrefixes = ['set', 'send', 'delete', 'create', 'upload']

  private static prepareMethod(name: string) {
    const prop = camelize(name.replace(/^[_.]/, ''))
    const isAsync = Internal.asyncPrefixes.some(prefix => prop.startsWith(prefix))
    return [prop, isAsync] as const
  }

  static define(name: string, ...params: string[]) {
    const [prop, isAsync] = Internal.prepareMethod(name)
    Internal.prototype[prop] = async function (this: Internal, ...args: any[]) {
      const data = await this._get(name, Object.fromEntries(params.map((name, index) => [name, args[index]])))
      if (!isAsync) return data
    }
    isAsync && (Internal.prototype[prop + 'Async'] = async function (this: Internal, ...args: any[]) {
      await this._get(name + '_async', Object.fromEntries(params.map((name, index) => [name, args[index]])))
    })
  }

  static defineExtract(name: string, key: string, ...params: string[]) {
    const [prop, isAsync] = Internal.prepareMethod(name)
    Internal.prototype[prop] = async function (this: Internal, ...args: any[]) {
      const data = await this._get(name, Object.fromEntries(params.map((name, index) => [name, args[index]])))
      return data[key]
    }
    isAsync && (Internal.prototype[prop + 'Async'] = async function (this: Internal, ...args: any[]) {
      await this._get(name + '_async', Object.fromEntries(params.map((name, index) => [name, args[index]])))
    })
  }
}

// messages
Internal.defineExtract('send_private_msg', 'message_id', 'user_id', 'message', 'auto_escape')
Internal.defineExtract('send_group_msg', 'message_id', 'group_id', 'message', 'auto_escape')
Internal.defineExtract('send_group_forward_msg', 'message_id', 'group_id', 'messages')
Internal.defineExtract('send_private_forward_msg', 'message_id', 'user_id', 'messages')
Internal.define('delete_msg', 'message_id')
Internal.define('mark_msg_as_read', 'message_id')
Internal.define('set_essence_msg', 'message_id')
Internal.define('delete_essence_msg', 'message_id')
Internal.define('send_group_sign', 'group_id')
Internal.define('send_like', 'user_id', 'times')
Internal.define('get_msg', 'message_id')
Internal.define('get_essence_msg_list', 'group_id')
Internal.define('ocr_image', 'image')
Internal.defineExtract('get_forward_msg', 'messages', 'message_id')
Internal.defineExtract('.get_word_slices', 'slices', 'content')
Internal.define('get_group_msg_history', 'group_id', 'message_seq')
Internal.define('set_friend_add_request', 'flag', 'approve', 'remark')
Internal.define('set_group_add_request', 'flag', 'sub_type', 'approve', 'reason')
Internal.defineExtract('_get_model_show', 'variants', 'model')
Internal.define('_set_model_show', 'model', 'model_show')

// group operations
Internal.define('set_group_kick', 'group_id', 'user_id', 'reject_add_request')
Internal.define('set_group_ban', 'group_id', 'user_id', 'duration')
Internal.define('set_group_whole_ban', 'group_id', 'enable')
Internal.define('set_group_admin', 'group_id', 'user_id', 'enable')
Internal.define('set_group_anonymous', 'group_id', 'enable')
Internal.define('set_group_card', 'group_id', 'user_id', 'card')
Internal.define('set_group_leave', 'group_id', 'is_dismiss')
Internal.define('set_group_special_title', 'group_id', 'user_id', 'special_title', 'duration')
Internal.define('set_group_name', 'group_id', 'group_name')
Internal.define('set_group_portrait', 'group_id', 'file', 'cache')
Internal.define('_send_group_notice', 'group_id', 'content')
Internal.define('_get_group_notice', 'group_id')
Internal.define('_del_group_notice', 'group_id', 'notice_id')
Internal.define('get_group_at_all_remain', 'group_id')

// accounts
Internal.define('get_login_info')
Internal.define('qidian_get_login_info')
Internal.define('set_qq_profile', 'nickname', 'company', 'email', 'college', 'personal_note')
Internal.define('get_stranger_info', 'user_id', 'no_cache')
Internal.define('_get_vip_info', 'user_id')
Internal.define('get_friend_list')
Internal.define('get_unidirectional_friend_list')
Internal.define('delete_friend', 'user_id')
Internal.define('delete_unidirectional_friend', 'user_id')

Internal.define('get_group_info', 'group_id', 'no_cache')
Internal.define('get_group_list')
Internal.define('get_group_member_info', 'group_id', 'user_id', 'no_cache')
Internal.define('get_group_member_list', 'group_id')
Internal.define('get_group_honor_info', 'group_id', 'type')
Internal.define('get_group_system_msg')
Internal.define('get_group_file_system_info', 'group_id')
Internal.define('get_group_root_files', 'group_id')
Internal.define('get_group_files_by_folder', 'group_id', 'folder_id')
Internal.define('upload_private_file', 'user_id', 'file', 'name')
Internal.define('upload_group_file', 'group_id', 'file', 'name', 'folder')
Internal.define('create_group_file_folder', 'group_id', 'folder_id', 'name')
Internal.define('delete_group_folder', 'group_id', 'folder_id')
Internal.define('delete_group_file', 'group_id', 'folder_id', 'file_id', 'busid')
Internal.defineExtract('get_group_file_url', 'url', 'group_id', 'file_id', 'busid')
Internal.defineExtract('download_file', 'file', 'url', 'headers', 'thread_count')
Internal.defineExtract('get_online_clients', 'clients', 'no_cache')
Internal.defineExtract('check_url_safely', 'level', 'url')

Internal.defineExtract('get_cookies', 'cookies', 'domain')
Internal.defineExtract('get_csrf_token', 'token')
Internal.define('get_credentials', 'domain')
Internal.define('get_record', 'file', 'out_format', 'full_path')
Internal.define('get_image', 'file')
Internal.defineExtract('can_send_image', 'yes')
Internal.defineExtract('can_send_record', 'yes')
Internal.define('get_status')
Internal.define('get_version_info')
Internal.define('set_restart', 'delay')
Internal.define('reload_event_filter')

Internal.define('get_guild_service_profile')
Internal.define('get_guild_list')
Internal.define('get_guild_meta_by_guest', 'guild_id')
Internal.define('get_guild_channel_list', 'guild_id', 'no_cache')
Internal.define('get_guild_member_list', 'guild_id', 'next_token')
Internal.define('get_guild_member_profile', 'guild_id', 'user_id')
Internal.defineExtract('send_guild_channel_msg', 'message_id', 'guild_id', 'channel_id', 'message')
