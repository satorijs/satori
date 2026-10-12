// 拉取 Fluxer 全量 OpenAPI，裁剪成适配器用到的最小闭包，写入 src/protocol/fluxer.openapi.json。
// 根集合直接从 src/types/index.ts 的 `Schema['X']` 引用读出；闭包按 $ref 递归。
// 用法：node scripts/prune-openapi.mjs [source-url]  （缺省官方实例）
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = process.argv[2] ?? 'https://api.fluxer.app/openapi.json'
const output = join(root, 'src/protocol/fluxer.openapi.json')

const types = readFileSync(join(root, 'src/types/index.ts'), 'utf8')
const roots = [...types.matchAll(/Schema\['([^']+)'\]/g)].map((match) => match[1])
if (!roots.length) throw new Error('no Schema[...] references found in src/types/index.ts')

const spec = await (await fetch(source)).json()
const schemas = spec.components?.schemas ?? {}
const kept = new Set()
const stack = roots.filter((name) => name in schemas)

while (stack.length) {
  const name = stack.pop()
  if (kept.has(name)) continue
  kept.add(name)
  const visit = (node) => {
    if (Array.isArray(node)) return node.forEach(visit)
    if (!node || typeof node !== 'object') return
    if (typeof node.$ref === 'string') {
      const ref = node.$ref.split('/').pop()
      if (ref !== name && !kept.has(ref)) stack.push(ref)
    }
    for (const value of Object.values(node)) visit(value)
  }
  visit(schemas[name])
}

const missing = [...kept].filter((name) => !(name in schemas))
if (missing.length) throw new Error(`unknown schemas referenced: ${missing.join(', ')}`)

writeFileSync(output, JSON.stringify({
  openapi: spec.openapi,
  info: {
    title: spec.info?.title ?? 'Fluxer API',
    version: spec.info?.version ?? '0.0.0',
    description: 'Pruned subset of the Fluxer OpenAPI document: only the schemas referenced by this adapter. '
      + 'Regenerate with `yarn sync-openapi`.',
  },
  components: {
    schemas: Object.fromEntries([...kept].sort().map((name) => [name, schemas[name]])),
  },
}, null, 2) + '\n')

process.stdout.write(`pruned ${Object.keys(schemas).length} → ${kept.size} schemas (source: ${source})\n`)
