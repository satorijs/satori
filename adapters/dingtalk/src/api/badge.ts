import { Internal } from "../internal";
// GENERATED CONTENT

export interface CreateBadgeNotifyParams {
  /** 用户userid。 */
  userId: string;
  /** 消息传入，调用方传入，唯一标识消息。 */
  msgId: string;
  /** 消息类型，取值： */
  msgType: string;
  /** 通知内容 */
  content: string;
}

export interface CreateBadgeNotifyResponse {
  result: unknown;
}

export interface NotifyBadgeCodeVerifyResultParams {
  /** 码值，接入方硬件设备扫描钉工牌二维码获取的码值。 */
  payCode: string;
  /** 企业corpId。 */
  corpId: string;
  /** 用户和企业的关系类型，用于区分内部员工，外部联系人，无关系普通用户。 */
  userCorpRelationType: string;
  /** 用户身份标识。 */
  userIdentity: string;
  /** 验证时间。 */
  verifyTime: string;
  /** 验证结果。 */
  verifyResult: unknown;
  /** 验证地点。 */
  verifyLocation?: string;
  /** 验证流水号，可随机生成，确保用户下唯一 */
  verifyNo?: string;
  /** 验证事件。8个汉字以内，如门禁验证、班车登记、餐盘绑定等。 */
  verifyEvent?: string;
  /** 备注信息。 */
  remark?: string;
}

export interface NotifyBadgeCodeVerifyResultResponse {
  result: string;
}

export interface SaveBadgeCodeCorpInstanceParams {
  /** 码标识，取值： */
  codeIdentity: string;
  /** 开通的企业corpId。 */
  corpId: string;
  /** 状态，传入关闭状态需要用户手动开启后才会渲染二维码。 */
  status: string;
  /** 扩展参数，是否关联支付宝。 */
  extInfo?: unknown;
}

export interface SaveBadgeCodeCorpInstanceResponse {
  codeIdentity?: string;
  corpId?: string;
  status?: string;
  extInfo?: unknown;
}

export interface NotifyBadgeCodePayResultParams {
  /** 码值，接入方硬件设备扫描钉工牌二维码获取的码值。 */
  payCode: string;
  /** 企业corpId。 */
  corpId: string;
  /** 用户userid，需要与生成码时传入的**userid**保持一致。 */
  userId: string;
  /** 交易开始时间。 */
  gmtTradeCreate: string;
  /** 交易结束时间。 */
  gmtTradeFinish: string;
  /** 交易号，接入方自身系统针对交易生成的唯一订单号。 */
  tradeNo: string;
  /** 交易状态，取值： */
  tradeStatus: string;
  /** 订单标题。 */
  title: string;
  /** 备注。 */
  remark: string;
  /** 订单金额。 */
  amount: string;
  /** 订单优惠金额。 */
  promotionAmount: string;
  /** 收费金额。 */
  chargeAmount: string;
  /** 支付渠道明细信息。 */
  payChannelDetailList: object[];
  /** 支付失败错误码，当**tradeStatus**为**FAIL**时必须传入。 */
  tradeErrorCode?: string;
  /** 支付失败信息，当**tradeStatus**为**FAIL**时必须传入。 */
  tradeErrorMsg?: string;
  /** 扩展信息。 */
  extInfo?: string;
  /** 商户名称。 */
  merchantName: string;
}

export interface NotifyBadgeCodePayResultResponse {
  result: string;
}

export interface CreateBadgeCodeUserInstanceParams {
  /** 业务幂等ID，由调用方随机生成。 */
  requestId: string;
  /** 码标识，取值： */
  codeIdentity: string;
  /** 码值，由调用方生成。 */
  codeValue?: string;
  /** 码值类型，可不传，默认为DING_STATIC */
  codeValueType?: string;
  /** 状态，传入关闭状态需要用户手动开启后才会渲染二维码。 */
  status: string;
  /** 企业corpId。 */
  corpId: string;
  /** 用户和企业的关系类型，用于区分内部员工，外部联系人，无关系普通用户。 */
  userCorpRelationType: string;
  /** 用户身份标识。 */
  userIdentity: string;
  /** 临时码过期时间，格式：yyyy-MM-dd HH:mm:ss。 */
  gmtExpired: string;
  /** 有效时间列表，对于连续时间段，只需传入一个对象即可。 */
  availableTimes: object[];
  /** 扩展参数。 */
  extInfo: unknown;
}

export interface CreateBadgeCodeUserInstanceResponse {
  codeId: string;
  codeDetailUrl?: string;
}

export interface NotifyBadgeCodeRefundResultParams {
  /** 企业的corpId。 */
  corpId: string;
  /** 用户userid，需要与生成码时使用的**userid**保持一致。 */
  userId: string;
  /** 交易订单号，自定义，接入方针对交易生成的唯一订单号。 */
  tradeNo: string;
  /** 本次退款订单号，自定义，接入方针对交易生成的唯一退款订单号。 */
  refundOrderNo: string;
  /** 备注。 */
  remark: string;
  /** 退款金额。 */
  refundAmount: string;
  /** 退款的优惠金额。 */
  refundPromotionAmount: string;
  /** 退款时间。 */
  gmtRefund: string;
  /** 支付渠道明细信息。 */
  payChannelDetailList: object[];
  /** 支付时使用的付款码。 */
  payCode: string;
}

export interface NotifyBadgeCodeRefundResultResponse {
  result: string;
}

export interface UpdateBadgeCodeUserInstanceParams {
  /** 用户码ID。 */
  codeId: string;
  /** 码标识，取值： */
  codeIdentity: string;
  /** 码值，由调用方生成。 */
  codeValue?: string;
  /** 状态，传入关闭状态需要用户手动开启后才会渲染二维码。 */
  status?: string;
  /** 企业corpId。 */
  corpId: string;
  /** 用户和企业的关系类型，用于区分内部员工，外部联系人，无关系普通用户。 */
  userCorpRelationType: string;
  /** 用户身份标识。 */
  userIdentity: string;
  /** 临时码过期时间，格式：yyyy-MM-dd HH:mm:ss。 */
  gmtExpired: string;
  /** 有效时间列表，对于连续时间段，只需传入一个对象即可。 */
  availableTimes: object[];
  /** 扩展参数。 */
  extInfo: unknown;
}

export interface UpdateBadgeCodeUserInstanceResponse {
  codeId?: string;
}

export interface DecodeBadgeCodeParams {
  /** 码值，解码接口仅支持钉钉侧生成的码值。 */
  payCode: string;
  /** 请求ID，由调用方随机生成幂等字符串。 */
  requestId: string;
}

export interface DecodeBadgeCodeResponse {
  corpId: string;
  userId?: string;
  codeType: string;
  alipayCode: string;
  userCorpRelationType: string;
  codeIdentity?: string;
  codeId?: string;
  outBizId?: string;
  extInfo?: string;
}

// funcName: isOldApi
Internal.define({
  "/badge/notices": { POST: { createBadgeNotify: false } },
  "/badge/codes/verifyResults": {
    POST: { notifyBadgeCodeVerifyResult: false },
  },
  "/badge/codes/corpInstances": { POST: { saveBadgeCodeCorpInstance: false } },
  "/badge/codes/payResults": { POST: { notifyBadgeCodePayResult: false } },
  "/badge/codes/userInstances": {
    POST: { createBadgeCodeUserInstance: false },
    PUT: { updateBadgeCodeUserInstance: false },
  },
  "/badge/codes/refundResults": {
    POST: { notifyBadgeCodeRefundResult: false },
  },
  "/badge/codes/decode": { POST: { decodeBadgeCode: false } },
});
declare module "../internal" {
  interface Internal {
    /**
     * 钉工牌通知消息
     * @see https://developers.dingtalk.com/document/isvapp/dingtalk-badge-notification-message
     */
    createBadgeNotify(
      params: CreateBadgeNotifyParams,
    ): Promise<CreateBadgeNotifyResponse>;
    /**
     * 通知钉工牌码验证结果
     * @see https://developers.dingtalk.com/document/isvapp/notification-dingtalk-badge-verification-result
     */
    notifyBadgeCodeVerifyResult(
      params: NotifyBadgeCodeVerifyResultParams,
    ): Promise<NotifyBadgeCodeVerifyResultResponse>;
    /**
     * 配置企业钉工牌
     * @see https://developers.dingtalk.com/document/isvapp/save-dingtalk-enterprise-instance
     */
    saveBadgeCodeCorpInstance(
      params: SaveBadgeCodeCorpInstanceParams,
    ): Promise<SaveBadgeCodeCorpInstanceResponse>;
    /**
     * 通知支付结果
     * @see https://developers.dingtalk.com/document/isvapp/sync-dingtalk-badge-code-payment-result
     */
    notifyBadgeCodePayResult(
      params: NotifyBadgeCodePayResultParams,
    ): Promise<NotifyBadgeCodePayResultResponse>;
    /**
     * 创建钉工牌电子码
     * @see https://developers.dingtalk.com/document/isvapp/create-a-badge-user-instance
     */
    createBadgeCodeUserInstance(
      params: CreateBadgeCodeUserInstanceParams,
    ): Promise<CreateBadgeCodeUserInstanceResponse>;
    /**
     * 通知退款结果
     * @see https://developers.dingtalk.com/document/isvapp/notification-dingtalk-badge-code-refund-result
     */
    notifyBadgeCodeRefundResult(
      params: NotifyBadgeCodeRefundResultParams,
    ): Promise<NotifyBadgeCodeRefundResultResponse>;
    /**
     * 更新钉工牌电子码
     * @see https://developers.dingtalk.com/document/isvapp/update-dingtalk-user-instance
     */
    updateBadgeCodeUserInstance(
      params: UpdateBadgeCodeUserInstanceParams,
    ): Promise<UpdateBadgeCodeUserInstanceResponse>;
    /**
     * 解码钉工牌电子码
     * @see https://developers.dingtalk.com/document/isvapp/stack-dingtalk-badge
     */
    decodeBadgeCode(
      params: DecodeBadgeCodeParams,
    ): Promise<DecodeBadgeCodeResponse>;
  }
}
