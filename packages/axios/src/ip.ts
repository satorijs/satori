import { promises as dns } from 'dns'

/* eslint-disable no-multi-spaces */
const bogonV4 = [
  '0.0.0.0/8',          // RFC 1122 'this' network
  '10.0.0.0/8',         // RFC 1918 private space
  '100.64.0.0/10',      // RFC 6598 Carrier grade nat space
  '127.0.0.0/8',        // RFC 1122 localhost
  '169.254.0.0/16',     // RFC 3927 link local
  '172.16.0.0/12',      // RFC 1918 private space
  '192.0.2.0/24',       // RFC 5737 TEST-NET-1
  '192.88.99.0/24',     // RFC 7526 6to4 anycast relay
  '192.168.0.0/16',     // RFC 1918 private space
  '198.18.0.0/15',      // RFC 2544 benchmarking
  '198.51.100.0/24',    // RFC 5737 TEST-NET-2
  '203.0.113.0/24',     // RFC 5737 TEST-NET-3
  '224.0.0.0/4',        // multicast
  '240.0.0.0/4',        // reserved
]

const bogonV6 = [
  '::/8',             // RFC 4291 IPv4-compatible, loopback, et al
  '0100::/64',        // RFC 6666 Discard-Only
  '2001:2::/48',      // RFC 5180 BMWG
  '2001:10::/28',     // RFC 4843 ORCHID
  '2001:db8::/32',    // RFC 3849 documentation
  '2002::/16',        // RFC 7526 6to4 anycast relay
  '3ffe::/16',        // RFC 3701 old 6bone
  'fc00::/7',         // RFC 4193 unique local unicast
  'fe80::/10',        // RFC 4291 link local unicast
  'fec0::/10',        // RFC 3879 old site local unicast
  'ff00::/8',         // RFC 4291 multicast
]
/* eslint-enable no-multi-spaces */

export async function isPrivate(hostname: string): Promise<boolean> {
  try {
    const { address, family } = await dns.lookup(hostname)
    if (family !== 4 && family !== 6) return false
    const { bogons, length, parse } = family === 4
      ? { bogons: bogonV4, length: 32, parse: parseIPv4 }
      : { bogons: bogonV6, length: 128, parse: parseIPv6 }
    const num = parse(address)
    for (const bogon of bogons) {
      const [prefix, cidr] = bogon.split('/')
      const mask = ((1n << BigInt(cidr)) - 1n) << BigInt(length - +cidr)
      if ((num & mask) === parse(prefix)) return true
    }
    return false
  } catch (e) {
    return false
  }
}

function parseIPv4(ip: string): bigint {
  return ip.split('.').reduce((a, b) => (a << 8n) + BigInt(b), 0n)
}

function parseIPv6(ip: string): bigint {
  const exp = ip.indexOf('::')
  let num = 0n
  // :: 左边有内容
  if (exp !== -1 && exp !== 0) {
    ip.slice(0, exp).split(':').forEach((piece, i) => {
      num |= BigInt(`0x${piece}`) << BigInt((7 - i) * 16)
    })
  }
  // :: 在最右边
  if (exp === ip.length - 2) {
    return num
  }
  // :: 右边的内容
  const rest = exp === -1 ? ip : ip.slice(exp + 2)
  const v4 = rest.includes('.')
  const pieces = rest.split(':')
  let start = 0
  if (v4) {
    start += 2
    const [addr] = pieces.splice(-1, 1)
    num |= parseIPv4(addr)
  }
  pieces.reverse().forEach((piece, i) => {
    num |= BigInt(`0x${piece}`) << BigInt((start + i) * 8)
  })
  return num
}
