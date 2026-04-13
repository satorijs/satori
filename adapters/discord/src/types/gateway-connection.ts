import { Internal } from '.'


declare module './internal' {
  interface Internal {
    /**
     * <Info>
     * @see https://discord.com/developers/docs/events/gateway#get-gateway
     */
    getGateway(): Promise<void>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/events/gateway#get-gateway-bot
     */
    getGatewayBot(): Promise<void>
  }
}

Internal.define({
  '/gateway': {
    GET: 'getGateway',
  },
  '/gateway/bot': {
    GET: 'getGatewayBot',
  },
})
