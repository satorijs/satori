import { Attachment, EmailAlias, MailAddress, Mailgroup, MailgroupManager, MailgroupMember, MailgroupPermissionMember, PublicMailbox, PublicMailboxMember, User } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 发送邮件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-message/send
     */
    sendMailUserMailboxMessage(user_mailbox_id: string, body: SendMailUserMailboxMessageRequest): Promise<void>
    /**
     * 创建邮件组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/create
     */
    createMailMailgroup(body: CreateMailMailgroupRequest): Promise<CreateMailMailgroupResponse>
    /**
     * 删除邮件组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/delete
     */
    deleteMailMailgroup(mailgroup_id: string): Promise<void>
    /**
     * 修改邮件组部分信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/patch
     */
    patchMailMailgroup(mailgroup_id: string, body: PatchMailMailgroupRequest): Promise<PatchMailMailgroupResponse>
    /**
     * 修改邮件组全部信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/update
     */
    updateMailMailgroup(mailgroup_id: string, body: UpdateMailMailgroupRequest): Promise<UpdateMailMailgroupResponse>
    /**
     * 查询指定邮件组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/get
     */
    getMailMailgroup(mailgroup_id: string): Promise<GetMailMailgroupResponse>
    /**
     * 批量获取邮件组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/list
     */
    listMailMailgroup(query?: ListMailMailgroupQuery): Paginated<Mailgroup>
    /**
     * 批量创建邮件组管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_create
     */
    batchCreateMailMailgroupManager(mailgroup_id: string, body: BatchCreateMailMailgroupManagerRequest, query?: BatchCreateMailMailgroupManagerQuery): Promise<void>
    /**
     * 批量删除邮件组管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_delete
     */
    batchDeleteMailMailgroupManager(mailgroup_id: string, body: BatchDeleteMailMailgroupManagerRequest, query?: BatchDeleteMailMailgroupManagerQuery): Promise<void>
    /**
     * 批量获取邮件组管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/list
     */
    listMailMailgroupManager(mailgroup_id: string, query?: ListMailMailgroupManagerQuery): Paginated<MailgroupManager>
    /**
     * 创建邮件组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/create
     */
    createMailMailgroupMember(mailgroup_id: string, body: CreateMailMailgroupMemberRequest, query?: CreateMailMailgroupMemberQuery): Promise<CreateMailMailgroupMemberResponse>
    /**
     * 删除邮件组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/delete
     */
    deleteMailMailgroupMember(mailgroup_id: string, member_id: string): Promise<void>
    /**
     * 查询指定邮件组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/get
     */
    getMailMailgroupMember(mailgroup_id: string, member_id: string, query?: GetMailMailgroupMemberQuery): Promise<GetMailMailgroupMemberResponse>
    /**
     * 获取所有邮件组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/list
     */
    listMailMailgroupMember(mailgroup_id: string, query?: ListMailMailgroupMemberQuery): Paginated<MailgroupMember>
    /**
     * 批量创建邮件组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/batch_create
     */
    batchCreateMailMailgroupMember(mailgroup_id: string, body: BatchCreateMailMailgroupMemberRequest, query?: BatchCreateMailMailgroupMemberQuery): Promise<BatchCreateMailMailgroupMemberResponse>
    /**
     * 批量删除邮件组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/batch_delete
     */
    batchDeleteMailMailgroupMember(mailgroup_id: string, body: BatchDeleteMailMailgroupMemberRequest): Promise<void>
    /**
     * 创建邮件组别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/create
     */
    createMailMailgroupAlias(mailgroup_id: string, body: CreateMailMailgroupAliasRequest): Promise<CreateMailMailgroupAliasResponse>
    /**
     * 删除邮件组别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/delete
     */
    deleteMailMailgroupAlias(mailgroup_id: string, alias_id: string): Promise<void>
    /**
     * 获取邮件组所有别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/list
     */
    listMailMailgroupAlias(mailgroup_id: string): Promise<ListMailMailgroupAliasResponse>
    /**
     * 创建邮件组权限成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/create
     */
    createMailMailgroupPermissionMember(mailgroup_id: string, body: CreateMailMailgroupPermissionMemberRequest, query?: CreateMailMailgroupPermissionMemberQuery): Promise<CreateMailMailgroupPermissionMemberResponse>
    /**
     * 删除邮件组权限成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/delete
     */
    deleteMailMailgroupPermissionMember(mailgroup_id: string, permission_member_id: string): Promise<void>
    /**
     * 获取邮件组权限成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/get
     */
    getMailMailgroupPermissionMember(mailgroup_id: string, permission_member_id: string, query?: GetMailMailgroupPermissionMemberQuery): Promise<GetMailMailgroupPermissionMemberResponse>
    /**
     * 批量获取邮件组权限成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/list
     */
    listMailMailgroupPermissionMember(mailgroup_id: string, query?: ListMailMailgroupPermissionMemberQuery): Paginated<MailgroupPermissionMember>
    /**
     * 批量创建邮件组权限成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/batch_create
     */
    batchCreateMailMailgroupPermissionMember(mailgroup_id: string, body: BatchCreateMailMailgroupPermissionMemberRequest, query?: BatchCreateMailMailgroupPermissionMemberQuery): Promise<BatchCreateMailMailgroupPermissionMemberResponse>
    /**
     * 批量删除邮件组权限成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/batch_delete
     */
    batchDeleteMailMailgroupPermissionMember(mailgroup_id: string, body: BatchDeleteMailMailgroupPermissionMemberRequest): Promise<void>
    /**
     * 创建公共邮箱
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/create
     */
    createMailPublicMailbox(body: CreateMailPublicMailboxRequest): Promise<CreateMailPublicMailboxResponse>
    /**
     * 修改公共邮箱部分信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/patch
     */
    patchMailPublicMailbox(public_mailbox_id: string, body: PatchMailPublicMailboxRequest): Promise<PatchMailPublicMailboxResponse>
    /**
     * 修改公共邮箱全部信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/update
     */
    updateMailPublicMailbox(public_mailbox_id: string, body: UpdateMailPublicMailboxRequest): Promise<UpdateMailPublicMailboxResponse>
    /**
     * 查询指定公共邮箱
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/get
     */
    getMailPublicMailbox(public_mailbox_id: string): Promise<GetMailPublicMailboxResponse>
    /**
     * 查询所有公共邮箱
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/list
     */
    listMailPublicMailbox(query?: Pagination): Paginated<PublicMailbox>
    /**
     * 永久删除公共邮箱
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/delete
     */
    deleteMailPublicMailbox(public_mailbox_id: string): Promise<void>
    /**
     * 添加公共邮箱成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/create
     */
    createMailPublicMailboxMember(public_mailbox_id: string, body: CreateMailPublicMailboxMemberRequest, query?: CreateMailPublicMailboxMemberQuery): Promise<CreateMailPublicMailboxMemberResponse>
    /**
     * 删除公共邮箱单个成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/delete
     */
    deleteMailPublicMailboxMember(public_mailbox_id: string, member_id: string): Promise<void>
    /**
     * 删除公共邮箱所有成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/clear
     */
    clearMailPublicMailboxMember(public_mailbox_id: string): Promise<void>
    /**
     * 查询指定公共邮箱成员信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/get
     */
    getMailPublicMailboxMember(public_mailbox_id: string, member_id: string, query?: GetMailPublicMailboxMemberQuery): Promise<GetMailPublicMailboxMemberResponse>
    /**
     * 查询所有公共邮箱成员信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/list
     */
    listMailPublicMailboxMember(public_mailbox_id: string, query?: ListMailPublicMailboxMemberQuery): Paginated<PublicMailboxMember>
    /**
     * 批量添加公共邮箱成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/batch_create
     */
    batchCreateMailPublicMailboxMember(public_mailbox_id: string, body: BatchCreateMailPublicMailboxMemberRequest, query?: BatchCreateMailPublicMailboxMemberQuery): Promise<BatchCreateMailPublicMailboxMemberResponse>
    /**
     * 批量删除公共邮箱成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/batch_delete
     */
    batchDeleteMailPublicMailboxMember(public_mailbox_id: string, body: BatchDeleteMailPublicMailboxMemberRequest): Promise<void>
    /**
     * 创建公共邮箱别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/create
     */
    createMailPublicMailboxAlias(public_mailbox_id: string, body: CreateMailPublicMailboxAliasRequest): Promise<CreateMailPublicMailboxAliasResponse>
    /**
     * 删除公共邮箱别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/delete
     */
    deleteMailPublicMailboxAlias(public_mailbox_id: string, alias_id: string): Promise<void>
    /**
     * 查询公共邮箱的所有别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/list
     */
    listMailPublicMailboxAlias(public_mailbox_id: string): Promise<ListMailPublicMailboxAliasResponse>
    /**
     * 从回收站删除用户邮箱地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox/delete
     */
    deleteMailUserMailbox(user_mailbox_id: string, query?: DeleteMailUserMailboxQuery): Promise<void>
    /**
     * 创建用户邮箱别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/create
     */
    createMailUserMailboxAlias(user_mailbox_id: string, body: CreateMailUserMailboxAliasRequest): Promise<CreateMailUserMailboxAliasResponse>
    /**
     * 删除用户邮箱别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/delete
     */
    deleteMailUserMailboxAlias(user_mailbox_id: string, alias_id: string): Promise<void>
    /**
     * 获取用户邮箱所有别名
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/list
     */
    listMailUserMailboxAlias(user_mailbox_id: string, query?: Pagination): Promise<ListMailUserMailboxAliasResponse>
    /**
     * 查询邮箱地址状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user/query
     */
    queryMailUser(body: QueryMailUserRequest): Promise<QueryMailUserResponse>
  }
}

export interface SendMailUserMailboxMessageRequest {
  /** MIME邮件数据，基于base64url编码 */
  raw?: string
  /** 主题 */
  subject?: string
  /** 收件人 */
  to?: MailAddress[]
  /** 抄送 */
  cc?: MailAddress[]
  /** 秘送 */
  bcc?: MailAddress[]
  /** 发件人 */
  head_from?: MailAddress
  /** 正文(base64url) */
  body_html?: string
  /** 正文纯文本(base64url) */
  body_plain_text?: string
  /** 邮件附件列表 */
  attachments?: Attachment[]
  /** 会话id */
  thread_id?: string
}

export interface CreateMailMailgroupRequest {
  /** The mail group's email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface PatchMailMailgroupRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface UpdateMailMailgroupRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface ListMailMailgroupQuery extends Pagination {
  /** 邮件组管理员用户ID，用于获取该用户有管理权限的邮件组 */
  manager_user_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchCreateMailMailgroupManagerRequest {
  /** 邮件组管理员列表 */
  mailgroup_manager_list?: MailgroupManager[]
}

export interface BatchCreateMailMailgroupManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteMailMailgroupManagerRequest {
  /** 邮件组管理员列表 */
  mailgroup_manager_list?: MailgroupManager[]
}

export interface BatchDeleteMailMailgroupManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListMailMailgroupManagerQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateMailMailgroupMemberRequest {
  /** The member's email address. Value is valid when type is one of USER/EXTERNAL_USER/MAIL_GROUP/PUBLIC_MAILBOX/OTHER_MEMBER */
  email?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department- COMPANY: member is the company- EXTERNAL_USER: internet user outside the organization- MAIL_GROUP: member is another mail group- PUBLIC_MAILBOX: member is a public mailbox- OTHER_MEMBER: other internal member */
  type?: 'USER' | 'DEPARTMENT' | 'COMPANY' | 'EXTERNAL_USER' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX' | 'OTHER_MEMBER'
}

export interface CreateMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ListMailMailgroupMemberQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface BatchCreateMailMailgroupMemberRequest {
  /** 本次添加的邮件组成员列表 */
  items?: MailgroupMember[]
}

export interface BatchCreateMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface BatchDeleteMailMailgroupMemberRequest {
  /** 本次调用删除的成员ID列表 */
  member_id_list?: string[]
}

export interface CreateMailMailgroupAliasRequest {
  /** 邮箱别名 */
  email_alias?: string
}

export interface CreateMailMailgroupPermissionMemberRequest {
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The member's email address. Value is valid when type is MAIL_GROUP/PUBLIC_MAILBOX */
  email?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department */
  type?: 'USER' | 'DEPARTMENT' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX'
}

export interface CreateMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ListMailMailgroupPermissionMemberQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface BatchCreateMailMailgroupPermissionMemberRequest {
  /** 本次添加的邮件组权限成员列表 */
  items?: MailgroupPermissionMember[]
}

export interface BatchCreateMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface BatchDeleteMailMailgroupPermissionMemberRequest {
  /** 本次调用删除的权限成员ID列表 */
  permission_member_id_list: string[]
}

export interface CreateMailPublicMailboxRequest {
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
  /** 数据驻留地 */
  geo?: string
}

export interface PatchMailPublicMailboxRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}

export interface UpdateMailPublicMailboxRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}

export interface CreateMailPublicMailboxMemberRequest {
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team */
  type?: 'USER'
}

export interface CreateMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListMailPublicMailboxMemberQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchCreateMailPublicMailboxMemberRequest {
  /** 本次调用添加的公共邮箱成员列表 */
  items: PublicMailboxMember[]
}

export interface BatchCreateMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteMailPublicMailboxMemberRequest {
  /** 本次调用删除的公共邮箱成员ID列表 */
  member_id_list: string[]
}

export interface CreateMailPublicMailboxAliasRequest {
  /** 邮箱别名 */
  email_alias?: string
}

export interface DeleteMailUserMailboxQuery {
  /** 用于接受转移的邮箱地址 */
  transfer_mailbox?: string
}

export interface CreateMailUserMailboxAliasRequest {
  /** 邮箱别名 */
  email_alias?: string
}

export interface QueryMailUserRequest {
  /** 需要查询的邮箱地址列表 */
  email_list: string[]
}

export interface CreateMailMailgroupResponse {
  /** The unique ID of a mail group */
  mailgroup_id?: string
  /** The mail group's email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** The number of mail group's direct members */
  direct_members_count?: string
  /** Value is true if this mail group has external member */
  include_external_member?: boolean
  /** Value is true if all company members are in this mail group */
  include_all_company_member?: boolean
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface PatchMailMailgroupResponse {
  /** The unique ID of a mail group */
  mailgroup_id?: string
  /** The mail group's email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** The number of mail group's direct members */
  direct_members_count?: string
  /** Value is true if this mail group has external member */
  include_external_member?: boolean
  /** Value is true if all company members are in this mail group */
  include_all_company_member?: boolean
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface UpdateMailMailgroupResponse {
  /** The unique ID of a mail group */
  mailgroup_id?: string
  /** The mail group's email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** The number of mail group's direct members */
  direct_members_count?: string
  /** Value is true if this mail group has external member */
  include_external_member?: boolean
  /** Value is true if all company members are in this mail group */
  include_all_company_member?: boolean
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface GetMailMailgroupResponse {
  /** The unique ID of a mail group */
  mailgroup_id?: string
  /** The mail group's email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** The number of mail group's direct members */
  direct_members_count?: string
  /** Value is true if this mail group has external member */
  include_external_member?: boolean
  /** Value is true if all company members are in this mail group */
  include_all_company_member?: boolean
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface CreateMailMailgroupMemberResponse {
  /** The unique ID of a member in this mail group */
  member_id?: string
  /** The member's email address. Value is valid when type is one of USER/EXTERNAL_USER/MAIL_GROUP/PUBLIC_MAILBOX/OTHER_MEMBER */
  email?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department- COMPANY: member is the company- EXTERNAL_USER: internet user outside the organization- MAIL_GROUP: member is another mail group- PUBLIC_MAILBOX: member is a public mailbox- OTHER_MEMBER: other internal member */
  type?: 'USER' | 'DEPARTMENT' | 'COMPANY' | 'EXTERNAL_USER' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX' | 'OTHER_MEMBER'
}

export interface GetMailMailgroupMemberResponse {
  /** The unique ID of a member in this mail group */
  member_id?: string
  /** The member's email address. Value is valid when type is one of USER/EXTERNAL_USER/MAIL_GROUP/PUBLIC_MAILBOX/OTHER_MEMBER */
  email?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department- COMPANY: member is the company- EXTERNAL_USER: internet user outside the organization- MAIL_GROUP: member is another mail group- PUBLIC_MAILBOX: member is a public mailbox- OTHER_MEMBER: other internal member */
  type?: 'USER' | 'DEPARTMENT' | 'COMPANY' | 'EXTERNAL_USER' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX' | 'OTHER_MEMBER'
}

export interface BatchCreateMailMailgroupMemberResponse {
  /** 添加成功后的邮件组成员信息列表 */
  items?: MailgroupMember[]
}

export interface CreateMailMailgroupAliasResponse {
  /** 邮件组别名 */
  mailgroup_alias?: EmailAlias
}

export interface ListMailMailgroupAliasResponse {
  /** 邮件组别名 */
  items?: EmailAlias[]
}

export interface CreateMailMailgroupPermissionMemberResponse {
  /** The unique ID of a member in this permission group */
  permission_member_id?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The member's email address. Value is valid when type is MAIL_GROUP/PUBLIC_MAILBOX */
  email?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department */
  type?: 'USER' | 'DEPARTMENT' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX'
}

export interface GetMailMailgroupPermissionMemberResponse {
  /** The unique ID of a member in this permission group */
  permission_member_id?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The member's email address. Value is valid when type is MAIL_GROUP/PUBLIC_MAILBOX */
  email?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department */
  type?: 'USER' | 'DEPARTMENT' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX'
}

export interface BatchCreateMailMailgroupPermissionMemberResponse {
  /** 添加成功后的邮件组权限成员信息列表 */
  items?: MailgroupPermissionMember[]
}

export interface CreateMailPublicMailboxResponse {
  /** The unique ID of a public mailbox */
  public_mailbox_id?: string
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
  /** 数据驻留地 */
  geo?: string
}

export interface PatchMailPublicMailboxResponse {
  /** The unique ID of a public mailbox */
  public_mailbox_id?: string
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}

export interface UpdateMailPublicMailboxResponse {
  /** The unique ID of a public mailbox */
  public_mailbox_id?: string
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}

export interface GetMailPublicMailboxResponse {
  /** The unique ID of a public mailbox */
  public_mailbox_id?: string
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
  /** 数据驻留地 */
  geo?: string
}

export interface CreateMailPublicMailboxMemberResponse {
  /** The unique ID of a member in this public mailbox */
  member_id?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team */
  type?: 'USER'
}

export interface GetMailPublicMailboxMemberResponse {
  /** The unique ID of a member in this public mailbox */
  member_id?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team */
  type?: 'USER'
}

export interface BatchCreateMailPublicMailboxMemberResponse {
  /** 添加成功后的公共邮箱成员信息列表 */
  items?: PublicMailboxMember[]
}

export interface CreateMailPublicMailboxAliasResponse {
  /** 公共邮箱别名 */
  public_mailbox_alias?: EmailAlias
}

export interface ListMailPublicMailboxAliasResponse {
  /** 公共邮箱别名 */
  items?: EmailAlias[]
}

export interface CreateMailUserMailboxAliasResponse {
  /** 用户邮箱别名 */
  user_mailbox_alias?: EmailAlias
}

export interface ListMailUserMailboxAliasResponse {
  /** 用户邮箱别名 */
  items?: EmailAlias[]
}

export interface QueryMailUserResponse {
  /** 邮箱地址返回 */
  user_list?: User[]
}

Internal.define({
  '/mail/v1/user_mailboxes/{user_mailbox_id}/messages/send': {
    POST: 'sendMailUserMailboxMessage',
  },
  '/mail/v1/mailgroups': {
    POST: 'createMailMailgroup',
    GET: { name: 'listMailMailgroup', pagination: { argIndex: 0 } },
  },
  '/mail/v1/mailgroups/{mailgroup_id}': {
    DELETE: 'deleteMailMailgroup',
    PATCH: 'patchMailMailgroup',
    PUT: 'updateMailMailgroup',
    GET: 'getMailMailgroup',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/managers/batch_create': {
    POST: 'batchCreateMailMailgroupManager',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/managers/batch_delete': {
    POST: 'batchDeleteMailMailgroupManager',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/managers': {
    GET: { name: 'listMailMailgroupManager', pagination: { argIndex: 1 } },
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members': {
    POST: 'createMailMailgroupMember',
    GET: { name: 'listMailMailgroupMember', pagination: { argIndex: 1 } },
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members/{member_id}': {
    DELETE: 'deleteMailMailgroupMember',
    GET: 'getMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members/batch_create': {
    POST: 'batchCreateMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members/batch_delete': {
    DELETE: 'batchDeleteMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/aliases': {
    POST: 'createMailMailgroupAlias',
    GET: 'listMailMailgroupAlias',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/aliases/{alias_id}': {
    DELETE: 'deleteMailMailgroupAlias',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members': {
    POST: 'createMailMailgroupPermissionMember',
    GET: { name: 'listMailMailgroupPermissionMember', pagination: { argIndex: 1 } },
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members/{permission_member_id}': {
    DELETE: 'deleteMailMailgroupPermissionMember',
    GET: 'getMailMailgroupPermissionMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members/batch_create': {
    POST: 'batchCreateMailMailgroupPermissionMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members/batch_delete': {
    DELETE: 'batchDeleteMailMailgroupPermissionMember',
  },
  '/mail/v1/public_mailboxes': {
    POST: 'createMailPublicMailbox',
    GET: { name: 'listMailPublicMailbox', pagination: { argIndex: 0 } },
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}': {
    PATCH: 'patchMailPublicMailbox',
    PUT: 'updateMailPublicMailbox',
    GET: 'getMailPublicMailbox',
    DELETE: 'deleteMailPublicMailbox',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members': {
    POST: 'createMailPublicMailboxMember',
    GET: { name: 'listMailPublicMailboxMember', pagination: { argIndex: 1 } },
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/{member_id}': {
    DELETE: 'deleteMailPublicMailboxMember',
    GET: 'getMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/clear': {
    POST: 'clearMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/batch_create': {
    POST: 'batchCreateMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/batch_delete': {
    DELETE: 'batchDeleteMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/aliases': {
    POST: 'createMailPublicMailboxAlias',
    GET: 'listMailPublicMailboxAlias',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/aliases/{alias_id}': {
    DELETE: 'deleteMailPublicMailboxAlias',
  },
  '/mail/v1/user_mailboxes/{user_mailbox_id}': {
    DELETE: 'deleteMailUserMailbox',
  },
  '/mail/v1/user_mailboxes/{user_mailbox_id}/aliases': {
    POST: 'createMailUserMailboxAlias',
    GET: 'listMailUserMailboxAlias',
  },
  '/mail/v1/user_mailboxes/{user_mailbox_id}/aliases/{alias_id}': {
    DELETE: 'deleteMailUserMailboxAlias',
  },
  '/mail/v1/users/query': {
    POST: 'queryMailUser',
  },
})
