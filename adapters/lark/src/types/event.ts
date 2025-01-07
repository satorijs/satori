import { Internal, Paginated } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取事件出口 IP
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
     */
    listEventOutboundIp(query?: Pagination): Promise<Paginated<string, 'ip_list'>>
    /**
     * 获取事件出口 IP
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
     */
    listEventOutboundIpIter(): AsyncIterator<string>
  }
}

Internal.define({
  '/event/v1/outbound_ip': {
    GET: { name: 'listEventOutboundIp', pagination: { argIndex: 0, itemsKey: 'ip_list' } },
  },
})
