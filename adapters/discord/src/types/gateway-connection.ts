import { Internal } from '.'


declare module './internal' {
  interface Internal {
    /**
     * <Info>
     * @see https://discord.com/developers/docs/resources/gateway-connection#get-gateway
     */
    getGateway(): Promise<void>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/gateway-connection#get-gateway-bot
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
