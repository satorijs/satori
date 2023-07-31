import { Internal } from "../internal";
// GENERATED CONTENT

export interface SendLinkParams {
  /** 文件所在空间ID，调用[添加空间](https://open.dingtalk.com/document/orgapp-server/add-space)接口获取id参数值。 */
  spaceId: string;
  /** 文件ID，调用[获取文件或文件夹列表](https://open.dingtalk.com/document/orgapp-server/obtain-the-file-list-storage)接口获取id参数值。 */
  dentryId: string;
  /** 目标会话的openConversationId，调用[创建群会话](https://open.dingtalk.com/document/orgapp-server/create-group-session)接口获取openConversationId参数值。 */
  openConversationId: string;
}

export interface SendLinkQuery {
  /** 操作人的unionId，调用[查询用户详情](https://open.dingtalk.com/document/orgapp-server/query-user-details)接口获取unionid参数值。 */
  unionId: string;
}

export interface SendLinkResponse {
  file?: {
    id?: string;
    conversationId?: string;
    spaceId?: string;
    parentId?: string;
    type?: string;
    name?: string;
    size?: number;
    path?: string;
    version?: number;
    status?: string;
    extension?: string;
    creatorId?: string;
    modifierId?: string;
    createTime?: string;
    modifiedTime?: string;
    uuid?: string;
  };
}

export interface SendParams {
  /** 空间ID，调用[添加空间](https://open.dingtalk.com/document/orgapp-server/add-space)接口获取id参数值。 */
  spaceId: string;
  /** 文件ID，调用[获取文件或文件夹列表](https://open.dingtalk.com/document/orgapp-server/obtain-the-file-list-storage)接口获取id参数值。 */
  dentryId: string;
  /** 目标会话的openConversationId，调用[创建群会话](https://open.dingtalk.com/document/orgapp-server/create-group-session)接口获取openConversationId参数值。 */
  openConversationId: string;
}

export interface SendQuery {
  /** 操作人的unionId，调用[查询用户详情](https://open.dingtalk.com/document/orgapp-server/query-user-details)接口获取unionid参数值。 */
  unionId: string;
}

export interface SendResponse {
  file?: {
    id?: string;
    conversationId?: string;
    spaceId?: string;
    parentId?: string;
    type?: string;
    name?: string;
    size?: number;
    path?: string;
    version?: number;
    status?: string;
    extension?: string;
    creatorId?: string;
    modifierId?: string;
    createTime?: string;
    modifiedTime?: string;
    uuid?: string;
  };
}

export interface ConvFileGetSpaceParams {
  /** 会话openConversationId。 */
  openConversationId: string;
}

export interface ConvFileGetSpaceQuery {
  /** 操作人的unionId。 */
  unionId: string;
}

export interface ConvFileGetSpaceResponse {
  space?: {
    spaceId?: string;
    corpId?: string;
    createTime?: string;
    modifiedTime?: string;
  };
}

export interface SendByAppParams {
  /** 文件所在空间ID。 */
  spaceId: string;
  /** 文件ID。 */
  dentryId: string;
}

export interface SendByAppQuery {
  /** 接收文件的用户unionId。 */
  unionId: string;
}

export interface SendByAppResponse {
  file?: {
    id?: string;
    conversationId?: string;
    spaceId?: string;
    parentId?: string;
    type?: string;
    name?: string;
    size?: number;
    path?: string;
    version?: number;
    status?: string;
    extension?: string;
    creatorId?: string;
    modifierId?: string;
    createTime?: string;
    modifiedTime?: string;
    uuid?: string;
  };
}

// funcName: isOldApi
Internal.define({
  "/convFile/conversations/files/links/send": { POST: { sendLink: false } },
  "/convFile/conversations/files/send": { POST: { send: false } },
  "/convFile/conversations/spaces/query": { POST: { convFileGetSpace: false } },
  "/convFile/apps/conversations/files/send": { POST: { sendByApp: false } },
});
declare module "../internal" {
  interface Internal {
    /**
     * 发送文件链接到指定会话
     * @see https://developers.dingtalk.com/document/orgapp/send-a-file-link-to-the-specified-session
     */
    sendLink(
      query: SendLinkQuery,
      params: SendLinkParams,
    ): Promise<SendLinkResponse>;
    /**
     * 发送文件到指定会话
     * @see https://developers.dingtalk.com/document/orgapp/send-file-to-specified-session
     */
    send(query: SendQuery, params: SendParams): Promise<SendResponse>;
    /**
     * 获取IM会话存储空间信息
     * @see https://developers.dingtalk.com/document/orgapp/obtain-group-storage-space-information
     */
    convFileGetSpace(
      query: ConvFileGetSpaceQuery,
      params: ConvFileGetSpaceParams,
    ): Promise<ConvFileGetSpaceResponse>;
    /**
     * 以应用身份发送文件给自己
     * @see https://developers.dingtalk.com/document/isvapp/sends-a-storage-file-to-a-specified-user
     */
    sendByApp(
      query: SendByAppQuery,
      params: SendByAppParams,
    ): Promise<SendByAppResponse>;
  }
}
