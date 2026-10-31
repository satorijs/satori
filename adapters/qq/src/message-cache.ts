import type { Universal } from '@satorijs/core'
import { symbols } from '@satorijs/core'
import type { QQBot } from './bot'

type Metadata = Pick<Universal.Message, 'id' | 'user' | 'member'>
type Entry = Metadata & { reference: string; idKey: string; referenceKey: string }

// QQ's message IDs and quote indices are different. Retain both directions,
// bounded per bot and isolated by group/private conversation.
const caches = new WeakMap<QQBot, { byId: Map<string, Entry>; byReference: Map<string, Entry> }>()
const cacheLimit = 1000

function originalBot(bot: QQBot) {
  // Cordis creates different context-bound proxies for the same bot on sends.
  while (bot[symbols.original]) bot = bot[symbols.original]
  return bot
}

function key(channelId: string, isDirect: boolean, id: string) {
  return JSON.stringify([isDirect, channelId, id])
}

export function cacheMessage(bot: QQBot, channelId: string, isDirect: boolean, message: Metadata, reference: string) {
  if (!message.id || !reference) return
  bot = originalBot(bot)
  let cache = caches.get(bot)
  if (!cache) caches.set(bot, cache = { byId: new Map(), byReference: new Map() })
  const idKey = key(channelId, isDirect, message.id)
  const referenceKey = key(channelId, isDirect, reference)
  for (const old of [cache.byId.get(idKey), cache.byReference.get(referenceKey)]) {
    if (!old) continue
    cache.byId.delete(old.idKey)
    cache.byReference.delete(old.referenceKey)
  }
  const entry: Entry = {
    id: message.id,
    user: message.user && { ...message.user },
    member: message.member && { ...message.member },
    reference,
    idKey,
    referenceKey,
  }
  cache.byId.set(idKey, entry)
  cache.byReference.set(referenceKey, entry)
  if (cache.byId.size > cacheLimit) {
    const oldest = cache.byId.values().next().value
    cache.byId.delete(oldest.idKey)
    cache.byReference.delete(oldest.referenceKey)
  }
}

export function getQuotedMessage(bot: QQBot, channelId: string, isDirect: boolean, reference: string): Metadata | undefined {
  return caches.get(originalBot(bot))?.byReference.get(key(channelId, isDirect, reference))
}

export function getQuoteReference(bot: QQBot, channelId: string, isDirect: boolean, id: string) {
  return caches.get(originalBot(bot))?.byId.get(key(channelId, isDirect, id))?.reference || id
}
