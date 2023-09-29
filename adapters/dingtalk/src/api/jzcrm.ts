import { Internal } from '../internal'
// GENERATED CONTENT

export interface EditContactParams {
  /** 数据类型，固定值**197**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditContactResponse {
  time: string
  msgid: number
}

export interface EditCustomerPoolParams {
  /** 数据类型，固定值**238**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditCustomerPoolResponse {
  time: string
  msgid: number
}

export interface EditExchangeParams {
  /** 数据类型，固定值**228**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditExchangeResponse {
  time: string
  msgid: number
}

export interface EditGoodsParams {
  /** 数据类型，固定值**154**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditGoodsResponse {
  time: string
  msgid: number
}

export interface EditOutstockParams {
  /** 数据类型，固定值**191**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditOutstockResponse {
  time: string
  msgid: number
}

export interface EditIntostockParams {
  /** 数据类型，固定值**189**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditIntostockResponse {
  time: string
  msgid: number
}

export interface EditProductionParams {
  /** 数据类型，固定值**156**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditProductionResponse {
  time: string
  msgid: number
}

export interface EditPurchaseParams {
  /** 数据类型，固定值**153**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditPurchaseResponse {
  time: string
  msgid: number
}

export interface EditOrderParams {
  /** 数据类型，固定填写**150**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditOrderResponse {
  time: string
  msgid: number
}

export interface EditInvoiceParams {
  /** 数据类型，固定值**169**。 */
  datatype: number
  /** 时间戳。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditInvoiceResponse {
  time: string
  msgid: number
}

export interface EditCustomerParams {
  /** 数据类型，固定值**148**。 */
  datatype: number
  /** 时间戳，单位：秒。 */
  stamp: number
  /** 数据ID。 */
  msgid?: number
  /** 编辑数据。 */
  data?: unknown
}

export interface EditCustomerResponse {
  time: string
  msgid: number
}

export interface GetDataViewQuery {
  /** 数据类型。 */
  datatype: string
  /** 数据ID。 */
  msgid: number
}

export interface GetDataViewResponse {
  data: {
    detail: number
  }
  dataname: unknown
  time: string
}

export interface GetDataListQuery {
  /** 数据类型。 */
  datatype: string
  /** 页码。 */
  page: number
  /** 分页条数。 */
  pagesize: number
}

export interface GetDataListResponse {
  data: {
    detail: number
  }[]
  dataname: unknown
  page: number
  pageSize: number
  totalCount: number
  time: string
}

// funcName: isOldApi
Internal.define({
  '/jzcrm/contacts': { POST: { editContact: false } },
  '/jzcrm/customerPools': { POST: { editCustomerPool: false } },
  '/jzcrm/exchanges': { POST: { editExchange: false } },
  '/jzcrm/goods': { POST: { editGoods: false } },
  '/jzcrm/outstocks': { POST: { editOutstock: false } },
  '/jzcrm/intostocks': { POST: { editIntostock: false } },
  '/jzcrm/productions': { POST: { editProduction: false } },
  '/jzcrm/purchases': { POST: { editPurchase: false } },
  '/jzcrm/orders': { POST: { editOrder: false } },
  '/jzcrm/invoices': { POST: { editInvoice: false } },
  '/jzcrm/customers': { POST: { editCustomer: false } },
  '/jzcrm/dataView': { GET: { getDataView: false } },
  '/jzcrm/data': { GET: { getDataList: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 联系人
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-contacts
     */
    editContact(params: EditContactParams): Promise<EditContactResponse>
    /**
     * 客户公共池
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-customer-public-pools
     */
    editCustomerPool(
      params: EditCustomerPoolParams,
    ): Promise<EditCustomerPoolResponse>
    /**
     * 编辑销售换货单数据
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-a-sales-order
     */
    editExchange(params: EditExchangeParams): Promise<EditExchangeResponse>
    /**
     * 编辑产品数据
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-product-information
     */
    editGoods(params: EditGoodsParams): Promise<EditGoodsResponse>
    /**
     * 编辑出库单信息
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-an-issue-ticket
     */
    editOutstock(params: EditOutstockParams): Promise<EditOutstockResponse>
    /**
     * 编辑入库单数据
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-a-shipment-record
     */
    editIntostock(params: EditIntostockParams): Promise<EditIntostockResponse>
    /**
     * 生产单
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-a-production-order
     */
    editProduction(
      params: EditProductionParams,
    ): Promise<EditProductionResponse>
    /**
     * 采购单
     * @see https://developers.dingtalk.com/document/isvapp/edit-purchase-order
     */
    editPurchase(params: EditPurchaseParams): Promise<EditPurchaseResponse>
    /**
     * 合同订单
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-contract-orders
     */
    editOrder(params: EditOrderParams): Promise<EditOrderResponse>
    /**
     * 发货单
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-invoices
     */
    editInvoice(params: EditInvoiceParams): Promise<EditInvoiceResponse>
    /**
     * 客户资料
     * @see https://developers.dingtalk.com/document/isvapp/add-or-edit-customer-profile
     */
    editCustomer(params: EditCustomerParams): Promise<EditCustomerResponse>
    /**
     * 获取数据详情
     * @see https://developers.dingtalk.com/document/isvapp/queries-data-details
     */
    getDataView(query: GetDataViewQuery): Promise<GetDataViewResponse>
    /**
     * 获取数据列表
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-data-list
     */
    getDataList(query: GetDataListQuery): Promise<GetDataListResponse>
  }
}
