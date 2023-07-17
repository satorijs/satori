import { h, MessageEncoder } from '@satorijs/satori'
import { DingtalkBot } from './bot'

export class DingtalkMessageEncoder extends MessageEncoder<DingtalkBot> {
  buffer = ''

  async flush(): Promise<void> {
    console.log(await this.bot.http.post('/robot/groupMessages/send', {
      // https://open.dingtalk.com/document/orgapp/types-of-messages-sent-by-robots
      msgKey: 'sampleText',
      msgParam: JSON.stringify({
        content: this.buffer
      }),
      robotCode: this.bot.config.appkey,
      openConversationId: this.channelId
    }))
  }


  async visit(element: h) {
    const { type, attrs, children } = element

    if (type === 'text') {
      this.buffer += attrs.content
    }
  }
}
