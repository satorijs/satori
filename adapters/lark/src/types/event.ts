import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取事件出口 IP
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
     */
    listEventOutboundIp(query?: ListEventOutboundIpQuery): Promise<ListEventOutboundIpResponse>
  }
}

export interface ListEventOutboundIpQuery {
  /** 分页大小，默认10，取值范围 10-50 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface ListEventOutboundIpResponse {
  /** outbound ip */
  ip_list?: string[]
  /** 分页下次调用的page_token值 */
  page_token?: string
  /** 是否还有分页数据 */
  has_more?: boolean
}

Internal.define({
  '/open-apis/event/v1/outbound_ip': {
    GET: 'listEventOutboundIp',
  },
})
