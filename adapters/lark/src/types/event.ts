import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取事件出口 IP
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
     */
    listEventOutboundIp(query?: ListEventOutboundIpQuery): Promise<Paginated<string, 'ip_list'>>
  }
}

export interface ListEventOutboundIpQuery extends Pagination {
}

Internal.define({
  '/open-apis/event/v1/outbound_ip': {
    GET: 'listEventOutboundIp',
  },
})
