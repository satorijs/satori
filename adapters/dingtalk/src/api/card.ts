import { Internal } from "../internal";
// GENERATED CONTENT

export interface UpdateCardParams {
  /** 外部卡片实例Id。 */
  outTrackId: string;
  /** 卡片数据 */
  cardData?: unknown;
  /** 用户的私有数据。 */
  privateData?: unknown;
  /** 卡片更新选项 */
  cardUpdateOptions?: unknown;
}

export interface UpdateCardResponse {
  success?: unknown;
  result?: unknown;
}

export interface CreateCardParams {
  /** 卡片创建者的userId。 */
  userId?: string;
  /** 卡片内容模板ID，可通过登录[开发者后台 > 卡片平台](https://open-dev.dingtalk.com/fe/card)获取。 */
  cardTemplateId: string;
  /** 外部卡片实例Id。 */
  outTrackId: string;
  /** 卡片回调的类型： */
  callbackType?: string;
  /** 卡片回调HTTP模式时的路由 Key，用于查询注册的 callbackUrl。 */
  callbackRouteKey?: string;
  /** 卡片数据，示例： */
  cardData: unknown;
  /** 用户的私有数据： */
  privateData?: unknown;
  /** 动态数据源配置。 */
  openDynamicDataConfig?: unknown;
  /** IM 群聊场域信息。 */
  imGroupOpenSpaceModel?: unknown;
  /** IM 单聊场域信息。 */
  imRobotOpenSpaceModel?: unknown;
  /** 协作场域信息。 */
  coFeedOpenSpaceModel?: unknown;
  /** 吊顶场域信息。 */
  topOpenSpaceModel?: unknown;
  /** 用户id类型： */
  userIdType?: number;
}

export interface CreateCardResponse {
  success?: unknown;
  result?: string;
}

export interface CreateAndDeliverParams {
  /** 卡片创建者的userId。 */
  userId?: string;
  /** 卡片内容模板ID，可通过登录[开发者后台 > 卡片平台](https://open-dev.dingtalk.com/fe/card)获取。 */
  cardTemplateId: string;
  /** 外部卡片实例Id。 */
  outTrackId: string;
  /** 卡片回调的类型： */
  callbackType?: string;
  /** 卡片回调HTTP模式时的路由 Key，用于查询注册的 callbackUrl。 */
  callbackRouteKey?: string;
  /** 卡片数据，示例： */
  cardData: unknown;
  /** 用户的私有数据： */
  privateData?: unknown;
  /** 动态数据源配置。 */
  openDynamicDataConfig?: unknown;
  /** IM群聊场域信息。 */
  imGroupOpenSpaceModel?: unknown;
  /** IM机器人单聊场域信息。 */
  imRobotOpenSpaceModel?: unknown;
  /** 协作场域信息。 */
  coFeedOpenSpaceModel?: unknown;
  /** 吊顶场域信息。 */
  topOpenSpaceModel?: unknown;
  /** 表示场域及其场域id，其格式为`dtv1.card//spaceType1.spaceId1;spaceType2.spaceId2_1;spaceType2.spaceId2_2;spaceType3.spaceId3`。 */
  openSpaceId: string;
  /** 群聊投放参数。 */
  imGroupOpenDeliverModel?: unknown;
  /** IM机器人单聊投放参数。 */
  imRobotOpenDeliverModel?: unknown;
  /** 吊顶投放参数。 */
  topOpenDeliverModel?: unknown;
  /** 协作投放参数。 */
  coFeedOpenDeliverModel?: unknown;
  /** 文档投放参数 */
  docOpenDeliverModel?: unknown;
  /** 用户userId类型： */
  userIdType?: number;
}

export interface CreateAndDeliverResponse {
  success?: unknown;
  result?: {
    outTrackId?: string;
    deliverResults?: number;
  };
}

export interface RegisterCallbackParams {
  /** 回调地址的路由 Key，一个 callbackRouteKey 仅可映射一个 callbackUrl */
  callbackRouteKey: string;
  /** 接受动态卡片回调的 URL 地址 */
  callbackUrl: string;
  /** 加密密钥用于校验来源 */
  apiSecret?: string;
  /** 是否强制覆盖更新，默认 false。 */
  forceUpdate?: unknown;
}

export interface RegisterCallbackResponse {
  success?: unknown;
  result?: {
    callbackUrl?: string;
    apiSecret?: string;
  };
}

export interface AppendSpaceParams {
  /** 外部卡片实例Id。 */
  outTrackId: string;
  /** IM群聊场域信息 */
  imGroupOpenSpaceModel?: unknown;
  /** 机器人单聊场域参数 */
  imRobotOpenSpaceModel?: unknown;
  /** 吊顶场域信息 */
  topOpenSpaceModel?: unknown;
  /** 协作场域信息 */
  coFeedOpenSpaceModel?: unknown;
}

export interface AppendSpaceResponse {
  success?: unknown;
  result?: unknown;
}

export interface DeliverCardParams {
  /** 外部卡片实例Id。 */
  outTrackId: string;
  /** 表示场域及其场域id，其格式为dtv1.card//spaceType1.spaceId1;spaceType2,spaceId2;spaceType3,spaceId3 */
  openSpaceId: string;
  /** 单聊场域投放参数 */
  imSingleOpenDeliverModel?: unknown;
  /** 群聊投放参数 */
  imGroupOpenDeliverModel?: unknown;
  /** 吊顶投放参数 */
  topOpenDeliverModel?: unknown;
  /** 协作投放参数 */
  coFeedOpenDeliverModel?: unknown;
  /** 工作台投放参数 */
  workBenchOpenDeliverModel?: unknown;
}

export interface DeliverCardResponse {
  success?: unknown;
  result?: {
    spaceType?: string;
    spaceId?: string;
    success?: number;
  }[];
}

// funcName: isOldApi
Internal.define({
  "/card/instances": {
    PUT: { updateCard: false },
    POST: { createCard: false },
  },
  "/card/instances/createAndDeliver": { POST: { createAndDeliver: false } },
  "/card/callbacks/register": { POST: { registerCallback: false } },
  "/card/instances/spaces": { PUT: { appendSpace: false } },
  "/card/instances/deliver": { POST: { deliverCard: false } },
});
declare module "../internal" {
  interface Internal {
    /**
     * 更新卡片
     * @see https://developers.dingtalk.com/document/orgapp/interactive-card-update-interface
     */
    updateCard(params: UpdateCardParams): Promise<UpdateCardResponse>;
    /**
     * 创建卡片
     * @see https://developers.dingtalk.com/document/orgapp/interface-for-creating-a-card-instance
     */
    createCard(params: CreateCardParams): Promise<CreateCardResponse>;
    /**
     * 创建并投放卡片
     * @see https://developers.dingtalk.com/document/orgapp/create-and-deliver-cards
     */
    createAndDeliver(
      params: CreateAndDeliverParams,
    ): Promise<CreateAndDeliverResponse>;
    /**
     * 注册卡片回调地址
     * @see https://developers.dingtalk.com/document/orgapp/register-card-callback-address
     */
    registerCallback(
      params: RegisterCallbackParams,
    ): Promise<RegisterCallbackResponse>;
    /**
     * 新增或更新卡片的场域信息
     * @see https://developers.dingtalk.com/document/orgapp/add-field-interface
     */
    appendSpace(params: AppendSpaceParams): Promise<AppendSpaceResponse>;
    /**
     * 投放卡片
     * @see https://developers.dingtalk.com/document/isvapp/delivery-card-interface
     */
    deliverCard(params: DeliverCardParams): Promise<DeliverCardResponse>;
  }
}
