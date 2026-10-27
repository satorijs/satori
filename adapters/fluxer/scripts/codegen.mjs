import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import openapiTS, { astToString, COMMENT_HEADER } from 'openapi-typescript'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = process.argv[2] ?? 'https://api.fluxer.app/openapi.json'
const output = join(root, 'src/protocol/schema.ts')

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

const pruned = {
  openapi: spec.openapi,
  info: spec.info,
  components: { schemas: Object.fromEntries([...kept].sort().map((name) => [name, schemas[name]])) },
}

const ast = await openapiTS(pruned)
writeFileSync(output, COMMENT_HEADER + astToString(ast))

process.stdout.write(`generated ${output} from ${kept.size}/${Object.keys(schemas).length} schemas (source: ${source})\n`)
