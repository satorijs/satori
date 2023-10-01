import { Internal } from '../internal'
// GENERATED CONTENT

export interface BillSettementBtripTrainQuery {
  /** 企业id。 */
  corpId?: string
  /** 类目：机酒火车： */
  category?: number
  /** 每页数据量，默认100，最高100。 */
  pageSize?: number
  /** 记账更新开始日期。 */
  periodStart?: string
  /** 页数，从1开始。 */
  pageNumber?: number
  /** 记账更新结束日期。 */
  periodEnd?: string
}

export interface BillSettementBtripTrainResponse {
  resultMsg?: string
  module?: {
    category?: number
    corpId?: string
    dataList?: number
    periodEnd?: string
    periodStart?: string
    totalNum?: number
  }
  success?: unknown
  resultCode?: number
}

export interface BillSettementHotelQuery {
  /** 第三方企业。 */
  corpId?: string
  /** 类目：机酒火车： */
  category?: number
  /** 每页数据量，默认100，最高500。 */
  pageSize?: number
  /** 记账更新开始日期。 */
  periodStart?: string
  /** 页数，从1开始。 */
  pageNumber?: number
  /** 记账更新结束日期。 */
  periodEnd?: string
}

export interface BillSettementHotelResponse {
  resultMsg?: string
  module?: {
    category?: number
    corpId?: string
    dataList?: number
    periodEnd?: string
    periodStart?: string
    totalNum?: number
  }
  success?: unknown
  resultCode?: number
}

export interface BillSettementCarQuery {
  /** 企业id。 */
  corpId?: string
  /** 类目：机酒火车： */
  category?: number
  /** 每页数据量，默认100，最高100。 */
  pageSize?: number
  /** 记账更新开始日期。 */
  periodStart?: string
  /** 记账更新结束日期。 */
  periodEnd?: string
  /** 页数，从1开始。 */
  pageNumber?: number
}

export interface BillSettementCarResponse {
  resultMsg?: string
  module?: {
    category?: number
    corpId?: string
    dataList?: number
    periodEnd?: string
    periodStart?: string
    totalNum?: number
  }
  success?: unknown
  resultCode?: number
}

export interface BillSettementFlightQuery {
  /** 第三方企业的CorpId。 */
  corpId?: string
  /** 类目，取值： */
  category?: number
  /** 分页参数，每页数据量。默认值100，最大值500。 */
  pageSize?: number
  /** 记账更新开始日期。 */
  periodStart?: string
  /** 分页参数，页码，从1开始。 */
  pageNumber?: number
  /** 记账更新结束日期。 */
  periodEnd?: string
}

export interface BillSettementFlightResponse {
  resultMsg?: string
  module?: {
    category?: number
    corpId?: string
    dataList?: number
    periodEnd?: string
    periodStart?: string
    totalNum?: number
  }
  success?: unknown
  resultCode?: number
}

export interface GetFlightExceedApplyQuery {
  /** 第三方企业的corpId。 */
  corpId: string
  /** 商旅超标审批单ID。 */
  applyId: string
}

export interface GetFlightExceedApplyResponse {
  corpId: string
  applyId: number
  status: number
  btripCause: string
  exceedType: number
  exceedReason: string
  originStandard: string
  submitTime: string
  userId: string
  applyIntentionInfoDO: {
    arrCity: string
    arrCityName: string
    arrTime: string
    cabin: string
    cabinClass: number
    cabinClassStr: string
    depCity: string
    depCityName: string
    depTime: string
    discount: number
    flightNo: string
    price: number
    type: number
  }
  thirdpartApplyId: string
}

export interface QueryUnionOrderQuery {
  /** 第三方企业corpId。 */
  corpId: string
  /** 第三方申请单ID。 */
  thirdPartApplyId?: string
  /** 关联单号ID。 */
  unionNo?: string
}

export interface QueryUnionOrderResponse {
  flightList?: {
    flightOrderId?: number
    flightOrderStatus?: number
  }[]
  corpId?: string
  trainList?: {
    trainOrderId?: number
    trainOrderstatus?: number
  }[]
  hotelList?: {
    hotelOrderId?: number
    hotelOrderStatus?: number
  }[]
  vehicleList?: {
    vehicleOrderId?: number
    vehicleOrderStatus?: number
  }[]
}

export interface GetTrainExceedApplyQuery {
  /** 第三方企业的corpId。 */
  corpId: string
  /** 商旅审批单ID。 */
  applyId: string
}

export interface GetTrainExceedApplyResponse {
  corpId: string
  applyId: number
  status: number
  btripCause: string
  exceedType: number
  exceedReason: string
  originStandard: string
  submitTime: string
  userId: string
  applyIntentionInfoDO: {
    price: number
    depCityName: string
    arrCityName: string
    depCity: string
    arrCity: string
    depTime: string
    arrTime: string
    arrStation: string
    depStation: string
    trainNo: string
    trainTypeDesc: string
    seatName: string
  }
  thirdpartApplyId: string
}

export interface GetHotelExceedApplyQuery {
  /** 第三方企业的corpId。 */
  corpId: string
  /** 商旅审批单ID。 */
  applyId: string
}

export interface GetHotelExceedApplyResponse {
  corpId: string
  applyId: number
  status: number
  btripCause: string
  exceedType: number
  exceedReason: string
  originStandard: string
  submitTime: string
  userId: string
  applyIntentionInfoDO: {
    checkIn: string
    checkOut: string
    cityCode: string
    cityName: string
    price: number
    together: number
    type: number
  }
  thirdpartApplyId: string
}

export interface SyncExceedApplyQuery {
  /** 审批意见。 */
  remark: string
  /** 商旅超标审批单号。 */
  applyId: string
  /** 企业的corpId。 */
  corpId: string
  /** 第三方流程实例ID。 */
  thirdpartyFlowId: string
  /** 员工的userid。 */
  userId: string
  /** 审批单状态，取值： */
  status: number
}

export interface SyncExceedApplyResponse {
  module: unknown
}

export interface QueryCityCarApplyQuery {
  /** 企业的CorpId。 */
  corpId: string
  /** 审批单创建时间小于值，例如2021-03-18 20:26:50。 */
  createdEndAt?: string
  /** 审批单创建时间大于或等于的时间，例如2021-03-18 20:26:56。 */
  createdStartAt?: string
  /** 页码，要求大于等于1，默认1。 */
  pageNumber?: number
  /** 每页数据量，要求大于等于1，默认20。 */
  pageSize?: number
  /** 三方审批单ID。 */
  thirdPartApplyId?: string
  /** 第三方员工ID。 */
  userId?: string
}

export interface QueryCityCarApplyResponse {
  applyList?: {
    approverList?: number
    departId?: string
    departName?: string
    gmtCreate?: string
    gmtModified?: string
    itineraryList?: number
    status?: number
    statusDesc?: string
    thirdPartApplyId?: string
    tripCause?: string
    tripTitle?: string
    userId?: string
    userName?: string
  }[]
  total?: number
}

export interface ApproveCityCarApplyParams {
  /** 第三方企业的corpid。 */
  corpId: string
  /** 审批时间，例如2021-03-18 20:26:56。 */
  operateTime?: string
  /** 审批备注。 */
  remark?: string
  /** 审批结果： */
  status: number
  /** 第三方审批单ID。 */
  thirdPartApplyId: string
  /** 审批的第三方员工ID。 */
  userId: string
}

export interface ApproveCityCarApplyResponse {
  approveResult?: unknown
}

export interface AddCityCarApplyParams {
  /** 出差事由。 */
  cause: string
  /** 用车城市。 */
  city: string
  /** 第三方企业的corpid。 */
  corpId: string
  /** 用车时间，按天管控，比如传值2021-03-18 20:26:56表示2021-03-18当天可用车，跨天情况配合finishedDate参数使用 */
  date: string
  /** 审批单关联的项目code。 */
  projectCode?: string
  /** 审批单关联的项目名。 */
  projectName?: string
  /** 审批单状态： */
  status: number
  /** 三方审批单ID。 */
  thirdPartApplyId: string
  /** 审批单关联的三方成本中心ID。 */
  thirdPartCostCenterId: string
  /** 审批单关联的三方发票抬头ID。 */
  thirdPartInvoiceId: string
  /** 审批单可用总次数。 */
  timesTotal: number
  /** 审批单可用次数类型： */
  timesType: number
  /** 审批单已用次数。 */
  timesUsed: number
  /** 审批单标题。 */
  title: string
  /** 发起审批的第三方员工ID。 */
  userId: string
  /** 用车截止时间，按天管控，比如date传值2021-03-18 20:26:56、finishedDate传值2021-03-30 20:26:56表示2021-03-18(含)到2021-03-30(含)之间可用车，该参数不传值情况使用date作为用车截止时间； */
  finishedDate?: string
}

export interface AddCityCarApplyResponse {
  applyId?: number
}

// funcName: isOldApi
Internal.define({
  '/alitrip/billSettlements/btripTrains': {
    GET: { billSettementBtripTrain: false },
  },
  '/alitrip/billSettlements/hotels': { GET: { billSettementHotel: false } },
  '/alitrip/billSettlements/cars': { GET: { billSettementCar: false } },
  '/alitrip/billSettlements/flights': { GET: { billSettementFlight: false } },
  '/alitrip/exceedapply/getFlight': { GET: { getFlightExceedApply: false } },
  '/alitrip/unionOrders': { GET: { queryUnionOrder: false } },
  '/alitrip/exceedapply/getTrain': { GET: { getTrainExceedApply: false } },
  '/alitrip/exceedapply/getHotel': { GET: { getHotelExceedApply: false } },
  '/alitrip/exceedapply/sync': { POST: { syncExceedApply: false } },
  '/alitrip/cityCarApprovals': {
    GET: { queryCityCarApply: false },
    PUT: { approveCityCarApply: false },
    POST: { addCityCarApply: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 查询商旅火车票结算记账数据
     * @see https://open.dingtalk.com/document/isvapp/business-travel-train-ticket-settlement-bookkeeping-query-interface
     */
    billSettementBtripTrain(
      query: BillSettementBtripTrainQuery,
    ): Promise<BillSettementBtripTrainResponse>
    /**
     * 查询酒店结算记账数据
     * @see https://open.dingtalk.com/document/isvapp/hotel-settlement-bookkeeping-query-interface
     */
    billSettementHotel(
      query: BillSettementHotelQuery,
    ): Promise<BillSettementHotelResponse>
    /**
     * 查询用车结算记账记录
     * @see https://open.dingtalk.com/document/isvapp/query-interface-for-vehicle-settlement-and-bookkeeping
     */
    billSettementCar(
      query: BillSettementCarQuery,
    ): Promise<BillSettementCarResponse>
    /**
     * 查询机票结算记账数据
     * @see https://open.dingtalk.com/document/isvapp/ticket-settlement-bookkeeping-query-interface
     */
    billSettementFlight(
      query: BillSettementFlightQuery,
    ): Promise<BillSettementFlightResponse>
    /**
     * 搜索第三方机票超标审批单
     * @see https://open.dingtalk.com/document/isvapp/dingtalk-oapi-alitrip-btrip-exceedapply-flight-get
     */
    getFlightExceedApply(
      query: GetFlightExceedApplyQuery,
    ): Promise<GetFlightExceedApplyResponse>
    /**
     * 关联单号查询相关订单信息列表
     * @see https://open.dingtalk.com/document/isvapp/link-no-to-query-the-list-of-related-order-information
     */
    queryUnionOrder(
      query: QueryUnionOrderQuery,
    ): Promise<QueryUnionOrderResponse>
    /**
     * 搜索第三方火车票超标审批单
     * @see https://open.dingtalk.com/document/isvapp/dingtalk-oapi-alitrip-btrip-exceedapply-train-get
     */
    getTrainExceedApply(
      query: GetTrainExceedApplyQuery,
    ): Promise<GetTrainExceedApplyResponse>
    /**
     * 搜索第三方酒店超标审批单
     * @see https://open.dingtalk.com/document/isvapp/dingtalk-oapi-alitrip-btrip-exceedapply-hotel-get
     */
    getHotelExceedApply(
      query: GetHotelExceedApplyQuery,
    ): Promise<GetHotelExceedApplyResponse>
    /**
     * 同步超标审批结果
     * @see https://open.dingtalk.com/document/isvapp/dingtalk-oapi-alitrip-btrip-exceedapply-sync
     */
    syncExceedApply(
      query: SyncExceedApplyQuery,
    ): Promise<SyncExceedApplyResponse>
    /**
     * 查询市内用车申请单
     * @see https://open.dingtalk.com/document/isvapp/query-the-application-form-for-third-party-vehicles-in-the-city
     */
    queryCityCarApply(
      query: QueryCityCarApplyQuery,
    ): Promise<QueryCityCarApplyResponse>
    /**
     * 审批市内用车申请单
     * @see https://open.dingtalk.com/document/isvapp/approval-of-third-party-city-car-application-form
     */
    approveCityCarApply(
      params: ApproveCityCarApplyParams,
    ): Promise<ApproveCityCarApplyResponse>
    /**
     * 同步市内用车申请单
     * @see https://open.dingtalk.com/document/isvapp/synchronize-third-party-city-vehicle-approval-form
     */
    addCityCarApply(
      params: AddCityCarApplyParams,
    ): Promise<AddCityCarApplyResponse>
  }
}
