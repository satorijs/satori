import type { Discovery } from './protocol/gateway'

const WELL_KNOWN = 'https://api.fluxer.app/.well-known/fluxer'

export let currentCdn: Cdn | undefined
/** 已解析的实例端点（webapp 等），发现成功后挂上 */
export let currentEndpoints: Discovery['endpoints'] | undefined

let cached: Promise<Discovery> | undefined

export function discover(base = WELL_KNOWN): Promise<Discovery> {
  cached ||= fetch(base).then((res) => {
    if (!res.ok) throw new Error(`discovery failed: ${res.status}`)
    return res.json() as Promise<Discovery>
  }).then((discovery) => {
    currentCdn = Cdn.from(discovery)
    currentEndpoints = discovery.endpoints
    return discovery
  })
  return cached
}

export class Cdn {
  constructor(
    public media: string,
    public staticCdn: string,
  ) {}

  static from(discovery: Discovery): Cdn {
    const { media, static_cdn } = discovery.endpoints
    return new Cdn(media.replace(/\/+$/, ''), static_cdn.replace(/\/+$/, ''))
  }

  private ext(hash: string | null | undefined, fallback = 'png'): string {
    return hash?.startsWith('a_') ? 'gif' : fallback
  }

  avatar(userId: string, hash?: string | null): string | undefined {
    if (!hash) return this.defaultAvatar(userId)
    return `${this.media}/avatars/${userId}/${hash}.${this.ext(hash)}`
  }

  defaultAvatar(userId: string | number): string {
    const index = typeof userId === 'number' ? Math.abs(userId % 6) : Number(BigInt(userId) % 6n)
    return `${this.staticCdn}/avatars/${index}.png`
  }

  guildIcon(id: string, hash?: string | null): string | undefined {
    if (!hash) return
    return `${this.media}/icons/${id}/${hash}.png`
  }

  emoji(id: string, animated = false): string {
    return `${this.media}/emojis/${id}.${animated ? 'gif' : 'png'}`
  }

  sticker(id: string, animated = false): string {
    return `${this.media}/stickers/${id}.${animated ? 'gif' : 'png'}`
  }
}
