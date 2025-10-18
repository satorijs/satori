import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    event: Event.Methods
  }
}

export namespace Event {
  export interface Methods {
    outboundIp: OutboundIp.Methods
  }

  export namespace OutboundIp {
    export interface Methods {
      /**
       * 获取事件出口 IP
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
       */
      list(query?: Pagination): Paginated<string, 'ip_list'>
    }
  }
}

Internal.define({
  '/event/v1/outbound_ip': {
    GET: { name: 'event.outboundIp.list', pagination: { argIndex: 0, itemsKey: 'ip_list' } },
  },
})
