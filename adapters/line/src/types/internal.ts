import { Dict, makeArray, Quester } from '@satorijs/satori'

export class Internal {
  constructor(private http: Quester) { }

  static define(routes: Dict<Partial<Record<Quester.Method, string | string[]>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as Quester.Method
        for (const name of makeArray(routes[path][method])) {
          Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
            const raw = args.join(', ')
            const url = path.replace(/\{([^}]+)\}/g, () => {
              if (!args.length) throw new Error(`too few arguments for ${path}, received ${raw}`)
              return args.shift()
            })
            const config: Quester.AxiosRequestConfig = {}
            if (args.length === 1) {
              if (method === 'GET' || method === 'DELETE') {
                config.params = args[0]
              } else {
                config.data = args[0]
              }
            } else if (args.length === 2 && method !== 'GET' && method !== 'DELETE') {
              config.data = args[0]
              config.params = args[1]
            } else if (args.length > 1) {
              throw new Error(`too many arguments for ${path}, received ${raw}`)
            }
            try {
              return await this.http(method, url, config)
            } catch (error) {
              if (!Quester.isAxiosError(error) || !error.response) throw error
              throw new Error(`[${error.response.status}] ${JSON.stringify(error.response.data)}`)
            }
          }
        }
      }
    }
  }
}

Internal.define({
  '/v2/bot/channel/webhook/endpoint': {
    GET: 'getWebhookEndpoint',
    PUT: 'setWebhookEndpoint',
  },
  '/v2/bot/channel/webhook/test': {
    POST: 'testWebhookEndpoint',
  },
  '/v2/bot/message/{messageId}/content': {
    GET: 'getMessageContent',
  },
  '/v2/bot/message/{messageId}/content/preview': {
    GET: 'getMessageContentPreview',
  },
  '/v2/bot/message/{messageId}/content/transcoding': {
    GET: 'getMessageContentTranscodingByMessageId',
  },
  '/v2/bot/message/reply': {
    POST: 'replyMessage',
  },
  '/v2/bot/message/push': {
    POST: 'pushMessage',
  },
  '/v2/bot/message/multicast': {
    POST: 'multicast',
  },
  '/v2/bot/message/narrowcast': {
  },
  '/v2/bot/message/progress/narrowcast': {
    GET: 'getNarrowcastProgress',
  },
  '/v2/bot/message/broadcast': {
    POST: 'broadcast',
  },
  '/v2/bot/message/quota': {
    GET: 'getMessageQuota',
  },
  '/v2/bot/message/quota/consumption': {
    GET: 'getMessageQuotaConsumption',
  },
  '/v2/bot/message/delivery/reply': {
    GET: 'getNumberOfSentReplyMessages',
  },
  '/v2/bot/message/delivery/push': {
    GET: 'getNumberOfSentPushMessages',
  },
  '/v2/bot/message/delivery/multicast': {
    GET: 'getNumberOfSentMulticastMessages',
  },
  '/v2/bot/message/delivery/broadcast': {
    GET: 'getNumberOfSentBroadcastMessages',
  },
  '/v2/bot/message/validate/reply': {
    POST: 'validateReply',
  },
  '/v2/bot/message/validate/push': {
    POST: 'validatePush',
  },
  '/v2/bot/message/validate/multicast': {
    POST: 'validateMulticast',
  },
  '/v2/bot/message/validate/narrowcast': {
    POST: 'validateNarrowcast',
  },
  '/v2/bot/message/validate/broadcast': {
    POST: 'validateBroadcast',
  },
  '/v2/bot/message/aggregation/info': {
    GET: 'getAggregationUnitUsage',
  },
  '/v2/bot/message/aggregation/list': {
    GET: 'getAggregationUnitNameList',
  },
  '/v2/bot/profile/{userId}': {
    GET: 'getProfile',
  },
  '/v2/bot/followers/ids': {
    GET: 'getFollowers',
  },
  '/v2/bot/info': {
    GET: 'getBotInfo',
  },
  '/v2/bot/group/{groupId}/member/{userId}': {
    GET: 'getGroupMemberProfile',
  },
  '/v2/bot/room/{roomId}/member/{userId}': {
    GET: 'getRoomMemberProfile',
  },
  '/v2/bot/group/{groupId}/members/ids': {
    GET: 'getGroupMembersIds',
  },
  '/v2/bot/room/{roomId}/members/ids': {
    GET: 'getRoomMembersIds',
  },
  '/v2/bot/group/{groupId}/leave': {
    POST: 'leaveGroup',
  },
  '/v2/bot/room/{roomId}/leave': {
    POST: 'leaveRoom',
  },
  '/v2/bot/group/{groupId}/summary': {
    GET: 'getGroupSummary',
  },
  '/v2/bot/group/{groupId}/members/count': {
    GET: 'getGroupMemberCount',
  },
  '/v2/bot/room/{roomId}/members/count': {
    GET: 'getRoomMemberCount',
  },
  '/v2/bot/richmenu': {
    POST: 'createRichMenu',
  },
  '/v2/bot/richmenu/validate': {
    POST: 'validateRichMenuObject',
  },
  '/v2/bot/richmenu/{richMenuId}/content': {
    GET: 'getRichMenuImage',
    POST: 'setRichMenuImage',
  },
  '/v2/bot/richmenu/{richMenuId}': {
    GET: 'getRichMenu',
    DELETE: 'deleteRichMenu',
  },
  '/v2/bot/richmenu/list': {
    GET: 'getRichMenuList',
  },
  '/v2/bot/user/all/richmenu/{richMenuId}': {
    POST: 'setDefaultRichMenu',
  },
  '/v2/bot/user/all/richmenu': {
    GET: 'getDefaultRichMenuId',
    DELETE: 'cancelDefaultRichMenu',
  },
  '/v2/bot/richmenu/alias': {
    POST: 'createRichMenuAlias',
  },
  '/v2/bot/richmenu/alias/{richMenuAliasId}': {
    GET: 'getRichMenuAlias',
    POST: 'updateRichMenuAlias',
    DELETE: 'deleteRichMenuAlias',
  },
  '/v2/bot/richmenu/alias/list': {
    GET: 'getRichMenuAliasList',
  },
  '/v2/bot/user/{userId}/richmenu': {
    GET: 'getRichMenuIdOfUser',
    DELETE: 'unlinkRichMenuIdFromUser',
  },
  '/v2/bot/user/{userId}/richmenu/{richMenuId}': {
    POST: 'linkRichMenuIdToUser',
  },
  '/v2/bot/richmenu/bulk/link': {
  },
  '/v2/bot/richmenu/bulk/unlink': {
  },
  '/v2/bot/richmenu/batch': {
  },
  '/v2/bot/richmenu/validate/batch': {
    POST: 'validateRichMenuBatchRequest',
  },
  '/v2/bot/richmenu/progress/batch': {
    GET: 'getRichMenuBatchProgress',
  },
  '/v2/bot/user/{userId}/linkToken': {
    POST: 'issueLinkToken',
  },
  '/v2/bot/message/markAsRead': {
    POST: 'markMessagesAsRead',
  },
  '/bot/pnp/push': {
    POST: 'pushMessagesByPhone',
  },
  '/bot/ad/multicast/phone': {
    POST: 'audienceMatch',
  },
  '/v2/bot/message/delivery/pnp': {
    GET: 'getPNPMessageStatistics',
  },
  '/v2/bot/message/delivery/ad_phone': {
    GET: 'getAdPhoneMessageStatistics',
  },
})
