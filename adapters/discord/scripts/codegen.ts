/* eslint-disable no-console */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { execSync } from 'node:child_process'

const DOCS_REPO = process.env.DOCS_REPO || 'https://github.com/discord/discord-api-docs.git'
const docsDir = join('/tmp', 'discord-api-docs')
const outDir = join(import.meta.dirname!, '../src/types')

// Clone or pull discord-api-docs
if (existsSync(join(docsDir, '.git'))) {
  console.log('Updating discord-api-docs...')
  execSync('git pull --ff-only', { cwd: docsDir, stdio: 'inherit' })
} else {
  console.log('Cloning discord-api-docs...')
  execSync(`git clone --depth=1 ${DOCS_REPO} ${docsDir}`, { stdio: 'inherit' })
}

// Source directories and their file mappings
const sources: { dir: string; files: Record<string, string> }[] = [
  {
    dir: join(docsDir, 'developers/resources'),
    files: Object.fromEntries(
      readdirSync(join(docsDir, 'developers/resources'))
        .filter(f => f.endsWith('.mdx'))
        .map(f => [f, basename(f, '.mdx')]),
    ),
  },
  {
    dir: join(docsDir, 'developers/interactions'),
    files: {
      'application-commands.mdx': 'command',
      'receiving-and-responding.mdx': 'interaction',
    },
  },
  {
    dir: join(docsDir, 'developers/components'),
    files: {
      'reference.mdx': 'component',
    },
  },
  {
    dir: join(docsDir, 'developers/events'),
    files: {
      'gateway-events.mdx': 'gateway',
      'gateway.mdx': 'gateway-connection',
      'webhook-events.mdx': 'webhook-event',
    },
  },
  {
    dir: join(docsDir, 'developers/topics'),
    files: {
      'permissions.mdx': 'permission',
    },
  },
]

const generatedFiles: string[] = []

for (const source of sources) {
  for (const [file, outName] of Object.entries(source.files)) {
    const path = join(source.dir, file)
    if (existsSync(path)) {
      processResource(path, outName)
      generatedFiles.push(outName)
    }
  }
}

function generateIndex() {
  const manualFiles = ['internal', 'device', 'team']
  const allExports = [...manualFiles, ...generatedFiles].sort()

  const lines: string[] = []
  for (const name of allExports) {
    lines.push(`export * from './${name}'`)
  }
  lines.push('')
  lines.push('export type integer = number')
  lines.push('export type snowflake = string')
  lines.push('export type timestamp = string')
  lines.push('')

  const refPath = join(docsDir, 'developers/reference.mdx')
  const content = readFileSync(refPath, 'utf-8')
  const match = content.match(/## Locales\n\n([\s\S]*?)(?=\n## |\n---\s*$|$)/)
  if (!match) {
    console.error('Could not find Locales section in reference.mdx')
    return
  }
  const table = extractTable(match[1])
  if (!table) return
  const rows = parseTable(table)
  if (rows.length < 2) return
  const locales = rows.slice(1).map(row => (row[0] || '').trim()).filter(Boolean)
  console.log(`=== locales (${locales.length}) ===`)

  lines.push(`/** @see https://discord.com/developers/docs/reference#locales */`)
  lines.push(`export type Locale = typeof Locale[number]`)
  lines.push('')
  lines.push(`export const Locale = [`)
  for (let i = 0; i < locales.length; i += 5) {
    const chunk = locales.slice(i, i + 5).map(l => `'${l}'`).join(', ')
    lines.push(`  ${chunk},`)
  }
  lines.push(`] as const`)

  const outPath = join(outDir, 'index.ts')
  writeFileSync(outPath, lines.join('\n') + '\n')
  console.log(`Written: ${outPath}\n`)
}

generateIndex()

interface Field {
  name: string
  rawType: string
  tsType: string
  description: string
  optional: boolean
  nullable: boolean
}

interface EnumValue {
  name: string
  value: string
  description: string
}

interface ObjectDef {
  anchor: string
  heading: string
  fields: Field[]
}

interface EnumDef {
  anchor: string
  heading: string
  values: EnumValue[]
}

interface Endpoint {
  method: string
  path: string
  title: string
  description: string
  params?: ObjectDef
  multipart: boolean
  returnDesc: string
}

// ===================== Helpers =====================

function toPascalCase(str: string): string {
  return str.split(/[\s-]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
}

function toCamelCase(str: string): string {
  const p = toPascalCase(str)
  return p.charAt(0).toLowerCase() + p.slice(1)
}

/** Extract consecutive table lines from a text block */
function extractTable(block: string): string | undefined {
  const lines = block.split('\n')
  const tableLines: string[] = []
  let inTable = false
  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      inTable = true
      tableLines.push(line)
    } else if (inTable) break
  }
  return tableLines.length >= 3 ? tableLines.join('\n') : undefined
}

/** Parse a markdown table into rows (skipping separator line) */
function parseTable(table: string): string[][] {
  const lines = table.split('\n').filter(l => l.trim().startsWith('|'))
  if (lines.length < 3) return []
  return [lines[0], ...lines.slice(2)].map(line => line.split('|').slice(1, -1).map(cell => cell.trim()))
}

/** Resolve a markdown link type to a TS type name: [user](/developers/resources/user#user-object) object → User */
function resolveTypeRef(raw: string): string {
  // Remove markdown links but keep link text
  let cleaned = raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
  // "array of X objects" → X[]
  if (/^array of\s+/i.test(cleaned)) {
    const inner = cleaned.replace(/^array of\s+/i, '').replace(/\s*objects?$/i, '').trim()
    return toPascalCase(inner) + '[]'
  }
  // "X object" → X
  cleaned = cleaned.replace(/\s*objects?$/i, '').trim()
  if (!cleaned) return 'any'
  // Map primitives
  const lower = cleaned.toLowerCase()
  if (lower === 'snowflake') return 'snowflake'
  if (lower === 'string') return 'string'
  if (lower === 'integer' || lower === 'int') return 'integer'
  if (lower === 'boolean' || lower === 'bool') return 'boolean'
  if (lower === 'float' || lower === 'number') return 'number'
  if (lower === 'file contents' || lower === 'file') return 'any'
  if (lower === 'iso8601 timestamp' || lower === 'timestamp') return 'timestamp'
  // Otherwise PascalCase it
  return toPascalCase(cleaned)
}

/** Check if a field description links to an enum, return the enum anchor if so */
function extractEnumRef(description: string): string | undefined {
  const match = description.match(/\[([^\]]*(?:type|format)[^\]]*)\]\(([^)]+)\)/i)
  if (match) {
    const anchor = match[2].split('#')[1]
    if (anchor) return anchor
  }
  return undefined
}

// ===================== Parser =====================

function processResource(filePath: string, outputName?: string) {
  const content = readFileSync(filePath, 'utf-8')
  const resourceName = outputName || basename(filePath, '.mdx')

  const objects = parseObjects(content)
  const enums = parseEnums(content)
  const endpoints = parseEndpoints(content)

  // Build enum anchor → enum name map for field type resolution
  const enumMap = new Map<string, string>()
  const mainName = toPascalCase(resourceName)
  for (const e of enums) {
    const name = extractEnumName(e.heading, mainName)
    enumMap.set(e.anchor, `${mainName}.${name}`)
  }

  // Resolve enum references in object fields
  for (const obj of objects) {
    for (const field of obj.fields) {
      const enumRef = extractEnumRef(field.description)
      if (enumRef && enumMap.has(enumRef)) {
        field.tsType = enumMap.get(enumRef)!
      }
    }
  }

  console.log(`=== ${resourceName} ===`)
  console.log(`Objects: ${objects.map(o => o.heading).join(', ')}`)
  console.log(`Enums: ${enums.map(e => e.heading).join(', ')}`)
  console.log(`Endpoints: ${endpoints.map(e => `${e.method} ${e.path}`).join(', ')}`)

  const ts = generateTypeScript(resourceName, objects, enums, endpoints)
  const outPath = join(outDir, `${resourceName}.ts`)
  writeFileSync(outPath, ts)
  console.log(`Written: ${outPath}\n`)
}

function parseObjects(content: string): ObjectDef[] {
  const results: ObjectDef[] = []
  const re = /<ManualAnchor id="([^"]+)" \/>\s*\n###### (.+Structure)\s*\n([\s\S]*?)(?=\n(?:###|<ManualAnchor|<Route|\*|<Info|<Warning|<Note|```)|\$)/g
  let match
  while ((match = re.exec(content)) !== null) {
    const [, anchor, heading, block] = match
    const table = extractTable(block)
    if (!table) continue
    const rows = parseTable(table)
    if (rows.length < 2) continue
    const fields: Field[] = rows.slice(1).map(row => {
      let name = (row[0] || '').replace(/\\\*/g, '').trim()
      const optional = name.endsWith('?')
      if (optional) name = name.slice(0, -1)
      let rawType = (row[1] || '').trim()
      const nullable = rawType.startsWith('?')
      if (nullable) rawType = rawType.slice(1)
      const description = (row[2] || '').trim()
      // const descClean = description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      const tsType = resolveTypeRef(rawType)
      return { name, rawType, tsType, description, optional, nullable }
    }).filter(f => f.name)
    results.push({ anchor, heading, fields })
  }
  return results
}

function parseEnums(content: string): EnumDef[] {
  const results: EnumDef[] = []
  const re = /<ManualAnchor id="([^"]+)" \/>\s*\n###### (.+(?:Types?|Flags))\s*\n([\s\S]*?)(?=\n(?:###|<ManualAnchor|<Route|```)|\$)/g
  let match
  while ((match = re.exec(content)) !== null) {
    const [, anchor, heading, block] = match
    if (heading.includes('Structure') || heading.includes('Params')) continue
    const table = extractTable(block)
    if (!table) continue
    const rows = parseTable(table)
    if (rows.length < 2) continue
    const header = rows[0].map(h => h.toLowerCase())
    const typeIdx = header.indexOf('type') >= 0 ? header.indexOf('type')
      : header.indexOf('permission') >= 0 ? header.indexOf('permission')
        : header.indexOf('flag') >= 0 ? header.indexOf('flag')
          : header.indexOf('name') >= 0 ? header.indexOf('name') : 0
    const valueIdx = header.indexOf('value') >= 0 ? header.indexOf('value') : 1
    const descIdx = header.indexOf('description')
    const values: EnumValue[] = rows.slice(1).map(row => {
      const name = (row[typeIdx] || '').replace(/\\\*/g, '').replace(/\*/g, '').trim()
      let value = (row[valueIdx] || '').trim()
      // Extract bit shift: `0x...` `(1 << N)` → 1 << N
      const bitShift = value.match(/\((\d+\s*<<\s*\d+)\)/)
      if (bitShift) value = bitShift[1].replace(/\s+/g, ' ')
      // Strip backticks
      value = value.replace(/`/g, '').trim()
      const description = descIdx >= 0 ? (row[descIdx] || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim() : ''
      return { name, value, description }
    }).filter(v => v.name && v.value)
    if (values.length > 0) results.push({ anchor, heading, values })
  }
  return results
}

function parseEndpoints(content: string): Endpoint[] {
  const results: Endpoint[] = []
  const re = /## (.+)\n<Route method="(\w+)">(.+?)<\/Route>\s*\n\n([\s\S]*?)(?=\n## |\n---\s*$|$)/g
  let match
  while ((match = re.exec(content)) !== null) {
    const [, title, method, rawPath, body] = match
    const path = rawPath.replace(/\\\{/g, '{').replace(/\\\}/g, '}').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    const description = body.split('\n')[0].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()

    let params: ObjectDef | undefined
    const paramsMatch = body.match(/<ManualAnchor id="([^"]+)" \/>\s*\n###### .+Params\s*\n([\s\S]*?)(?=\n(?:##|<ManualAnchor)|$)/)
    if (paramsMatch) {
      const table = extractTable(paramsMatch[2])
      if (table) {
        const rows = parseTable(table)
        if (rows.length >= 2) {
          params = {
            anchor: paramsMatch[1],
            heading: 'Params',
            fields: rows.slice(1).map(row => {
              let name = (row[0] || '').replace(/\\\*/g, '').trim()
              const optional = name.endsWith('?')
              if (optional) name = name.slice(0, -1)
              let rawType = (row[1] || '').trim()
              const nullable = rawType.startsWith('?')
              if (nullable) rawType = rawType.slice(1)
              const desc = (row[2] || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
              return { name, rawType, tsType: resolveTypeRef(rawType), description: desc, optional, nullable }
            }).filter(f => f.name),
          }
        }
      }
    }

    const multipart = body.includes('multipart/form-data')
    results.push({ method, path, title, description, params, multipart, returnDesc: description })
  }
  return results
}

// ===================== Code Generator =====================

function extractEnumName(heading: string, mainName: string): string {
  const name = heading.replace(new RegExp(`^${mainName}\\s*`, 'i'), '').replace(/s$/, '').trim()
  return toPascalCase(name) || 'Type'
}

function resolveReturnType(desc: string, mainName: string): string {
  if (desc.includes('204 No Content') || desc.includes('Returns `204')) return 'void'
  // "Returns an array of X objects"
  const arrayMatch = desc.match(/Returns (?:an )?(?:array|list) of (.+?) objects?/i)
  if (arrayMatch) return toPascalCase(arrayMatch[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')) + '[]'
  // "Returns the/a X object"
  const objMatch = desc.match(/Returns (?:a |the (?:new |updated )?)(.+?) object/i)
  if (objMatch) return toPascalCase(objMatch[1].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'))
  return 'void'
}

function generateTypeScript(
  resourceName: string,
  objects: ObjectDef[],
  enums: EnumDef[],
  endpoints: Endpoint[],
): string {
  const lines: string[] = []
  const mainName = toPascalCase(resourceName)

  // Collect imports based on types used
  const imports = new Set(['Internal'])
  const allFields = [...objects.flatMap(o => o.fields), ...endpoints.flatMap(e => e.params?.fields || [])]
  for (const f of allFields) {
    if (f.tsType === 'snowflake' || f.tsType.includes('snowflake')) imports.add('snowflake')
    if (f.tsType === 'integer' || f.tsType.includes('integer')) imports.add('integer')
    if (f.tsType === 'timestamp' || f.tsType.includes('timestamp')) imports.add('timestamp')
    if (f.tsType === 'User' || f.tsType.includes('User')) imports.add('User')
  }
  lines.push(`import { ${[...imports].sort().join(', ')} } from '.'`)
  lines.push('')

  // Main interface (first object)
  const mainObj = objects[0]
  if (mainObj) {
    lines.push(`/** https://discord.com/developers/docs/resources/${resourceName}#${mainObj.anchor} */`)
    lines.push(`export interface ${mainName} {`)
    for (const f of mainObj.fields) {
      lines.push(`  /** ${f.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} */`)
      lines.push(`  ${f.name}${f.optional ? '?' : ''}: ${f.tsType}${f.nullable ? ' | null' : ''}`)
    }
    lines.push('}')
    lines.push('')
  }

  // Namespace: sub-interfaces, enums, params
  const subObjects = objects.slice(1).filter(o => !o.heading.toLowerCase().includes('response'))
  const responseObjects = objects.filter(o => o.heading.toLowerCase().includes('response'))
  const hasNamespaceContent = subObjects.length > 0 || enums.length > 0 || endpoints.some(e => e.params) || responseObjects.length > 0

  if (hasNamespaceContent) {
    lines.push(`export namespace ${mainName} {`)

    // Enums
    for (const e of enums) {
      const name = extractEnumName(e.heading, mainName)
      const isNumeric = e.values.every(v => /^\d+$/.test(v.value))
      const isBitfield = e.values.some(v => v.value.includes('<<'))
      lines.push(`  /** https://discord.com/developers/docs/resources/${resourceName}#${e.anchor} */`)
      lines.push(`  export enum ${name} {`)
      for (const v of e.values) {
        if (v.description) lines.push(`    /** ${v.description} */`)
        const val = isBitfield ? v.value : isNumeric ? v.value : `'${v.value}'`
        lines.push(`    ${v.name} = ${val},`)
      }
      lines.push('  }')
      lines.push('')
    }

    // Sub-interfaces (StickerItem → Item, StickerPack → Pack)
    for (const obj of subObjects) {
      const fullName = toPascalCase(obj.heading.replace(/\s*Structure$/, ''))
      const shortName = fullName.replace(new RegExp(`^${mainName}`, 'i'), '') || fullName
      lines.push(`  /** https://discord.com/developers/docs/resources/${resourceName}#${obj.anchor} */`)
      lines.push(`  export interface ${shortName} {`)
      for (const f of obj.fields) {
        lines.push(`    /** ${f.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} */`)
        lines.push(`    ${f.name}${f.optional ? '?' : ''}: ${f.tsType}${f.nullable ? ' | null' : ''}`)
      }
      lines.push('  }')
      lines.push('')
    }

    // Response structures
    for (const obj of responseObjects) {
      const name = 'PackResult' // TODO: generalize
      lines.push(`  /** https://discord.com/developers/docs/resources/${resourceName}#${obj.anchor} */`)
      lines.push(`  export interface ${name} {`)
      for (const f of obj.fields) {
        lines.push(`    /** ${f.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} */`)
        lines.push(`    ${f.name}${f.optional ? '?' : ''}: ${f.tsType}${f.nullable ? ' | null' : ''}`)
      }
      lines.push('  }')
      lines.push('')
    }

    // Params
    const paramDefs = endpoints.filter(e => e.params)
    if (paramDefs.length > 0) {
      lines.push('  export namespace Params {')
      for (const ep of paramDefs) {
        const name = ep.title.includes('Create') ? 'Create'
          : ep.title.includes('Modify') || ep.title.includes('Edit') ? 'Modify'
            : toPascalCase(ep.title)
        lines.push(`    /** https://discord.com/developers/docs/resources/${resourceName}#${ep.params!.anchor} */`)
        lines.push(`    export interface ${name} {`)
        for (const f of ep.params!.fields) {
          lines.push(`      /** ${f.description} */`)
          lines.push(`      ${f.name}${f.optional ? '?' : ''}: ${f.tsType}${f.nullable ? ' | null' : ''}`)
        }
        lines.push('    }')
        lines.push('')
      }
      lines.push('  }')
    }

    lines.push('}')
    lines.push('')
  }

  // Internal methods
  if (endpoints.length > 0) {
    lines.push(`declare module './internal' {`)
    lines.push('  interface Internal {')
    for (const ep of endpoints) {
      const methodName = toCamelCase(ep.title)
      const args: string[] = []

      // Path params: {entity.field} → entity_field
      const pathParams = [...ep.path.matchAll(/\{(\w+)\.(\w+)\}/g)]
      for (const [, entity, field] of pathParams) {
        args.push(`${entity}_${field}: snowflake`)
      }

      // Body params
      if (ep.params) {
        const paramName = ep.title.includes('Create') ? 'Create'
          : ep.title.includes('Modify') || ep.title.includes('Edit') ? 'Modify'
            : 'Params'
        args.push(`params: ${mainName}.Params.${paramName}`)
      }

      // Return type
      const returnType = resolveReturnType(ep.returnDesc, mainName)

      lines.push('    /**')
      lines.push(`     * ${ep.description}`)
      lines.push(`     * @see https://discord.com/developers/docs/resources/${resourceName}#${ep.title.toLowerCase().replace(/\s+/g, '-')}`)
      lines.push('     */')
      lines.push(`    ${methodName}(${args.join(', ')}): Promise<${returnType}>`)
    }
    lines.push('  }')
    lines.push('}')
    lines.push('')

    // Internal.define
    const routeMap = new Map<string, Map<string, string>>()
    for (const ep of endpoints) {
      if (!routeMap.has(ep.path)) routeMap.set(ep.path, new Map())
      const methodName = toCamelCase(ep.title)
      const extras: string[] = []
      if (ep.multipart) extras.push('multipart: true')
      routeMap.get(ep.path)!.set(ep.method, extras.length ? `{ name: '${methodName}', ${extras.join(', ')} }` : `'${methodName}'`)
    }

    lines.push('Internal.define({')
    for (const [route, methods] of routeMap) {
      lines.push(`  '${route}': {`)
      for (const [method, value] of methods) {
        lines.push(`    ${method}: ${value},`)
      }
      lines.push('  },')
    }
    lines.push('})')
  }

  return lines.join('\n') + '\n'
}
