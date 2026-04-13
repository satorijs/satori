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

// Track cross-file type imports: resource name → Set of type names
const crossImports = new Map<string, Set<string>>()

// ===================== Pass 1: Collect all type definitions =====================
// Maps full PascalCase name → { resource, namespaceName, shortName }
interface TypeInfo {
  resource: string // e.g., "guild"
  namespaceName: string // e.g., "Guild"
  shortName: string // e.g., "Member" (inside namespace) or "Guild" (main type)
  isMain: boolean // true for the first/main object
}
const typeRegistry = new Map<string, TypeInfo>()

for (const source of sources) {
  for (const [file, outName] of Object.entries(source.files)) {
    const path = join(source.dir, file)
    if (!existsSync(path)) continue
    const content = readFileSync(path, 'utf-8')
    const resource = outName || basename(file, '.mdx')
    const namespaceName = toPascalCase(resource)

    // Collect object headings
    const objRe = /<ManualAnchor id="([^"]+)" \/>\s*\n###### (.+Structure)\s*\n/g
    let m: RegExpExecArray | null
    let isFirst = true
    while ((m = objRe.exec(content)) !== null) {
      const fullName = toPascalCase(m[2].replace(/\s*Structure$/, ''))
      const shortName = fullName.startsWith(namespaceName) && fullName !== namespaceName
        ? fullName.slice(namespaceName.length) || fullName
        : fullName
      typeRegistry.set(fullName, { resource, namespaceName, shortName, isMain: isFirst })
      isFirst = false
    }

    // Collect enum headings
    const enumRe = /<ManualAnchor id="([^"]+)" \/>\s*\n###### (.+(?:Types?|Flags?|Modes?|Levels?))\s*\n/g
    while ((m = enumRe.exec(content)) !== null) {
      if (m[2].includes('Structure') || m[2].includes('Params')) continue
      const fullName = toPascalCase(m[2])
      const shortName = fullName.startsWith(namespaceName) && fullName !== namespaceName
        ? fullName.slice(namespaceName.length) || fullName
        : fullName
      typeRegistry.set(fullName, { resource, namespaceName, shortName, isMain: false })
    }
  }
}

console.log(`Type registry: ${typeRegistry.size} types collected`)

// ===================== Pass 2: Generate code =====================

for (const source of sources) {
  // Extract docs category from dir path: "developers/resources" → "resources"
  const docsCategory = source.dir.replace(docsDir + '/', '').replace('developers/', '')
  for (const [file, outName] of Object.entries(source.files)) {
    const path = join(source.dir, file)
    if (existsSync(path)) {
      processResource(path, outName, file, docsCategory)
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
  console.log(`locales: ${locales.length} entries`)

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
  // Handle slash-separated alternatives: "Delete/Close Channel" → "Delete Channel"
  str = str.replace(/\/\w+/, '')
  // Strip parenthetical suffixes: "Pin Message (Deprecated)" → "Pin Message"
  str = str.replace(/\s*\([^)]*\)\s*$/, '')
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

/** Extract resource file name from a Discord docs URL */
function extractResourceFromUrl(url: string): string | undefined {
  const match = url.match(/\/developers\/(?:resources|interactions|topics|events|components)\/([^#]+)/)
  if (!match) return undefined
  return match[1]
}

/** Resolve a markdown link type to a TS type name, tracking imports from other files */
function resolveTypeRef(raw: string, currentResource: string): string {
  // Strip footnote markers like \* and trailing *
  raw = raw.replace(/\\\*/g, '').replace(/\s*\*\s*$/g, '').trim()

  // Try to extract type from markdown link FIRST (before stripping parens)
  const linkMatch = raw.match(/^(?:(?:array|list) of\s+)?(?:(?:a|the)\s+)?\[([^\]]+)\]\(([^)]+)\)\s*objects?$/i)
    || raw.match(/^(?:(?:array|list) of\s+)?(?:(?:a|the)\s+)?\[([^\]]+)\]\(([^)]+)\)\s*(?:ids?)?$/i)
  if (linkMatch) {
    const isArray = /^(?:array|list) of\s+/i.test(raw)
    const [, linkText, url] = linkMatch
    const resource = extractResourceFromUrl(url)
    const resourceName = resource ? toPascalCase(resource) : ''
    const rawTypeName = toPascalCase(linkText.replace(/\s*objects?$/i, ''))

    // Handle "ids" suffix: [role] object ids → snowflake[]
    if (/\bids?\s*$/i.test(raw)) return 'snowflake[]'

    // Look up in type registry for accurate resolution
    let typeName = rawTypeName
    const info = typeRegistry.get(rawTypeName)
    if (info) {
      if (info.resource === currentResource) {
        // Same file: always use Namespace.ShortName for sub-types (works both inside and outside namespace)
        typeName = info.isMain ? info.namespaceName : `${info.namespaceName}.${info.shortName}`
      } else {
        // Cross file: Namespace.ShortName
        typeName = info.isMain ? info.namespaceName : `${info.namespaceName}.${info.shortName}`
        if (!crossImports.has(currentResource)) crossImports.set(currentResource, new Set())
        crossImports.get(currentResource)!.add(info.namespaceName)
      }
    } else if (resource && resource !== currentResource) {
      // Not in registry but cross-file — import the namespace
      if (!crossImports.has(currentResource)) crossImports.set(currentResource, new Set())
      crossImports.get(currentResource)!.add(resourceName)
    }

    return isArray ? typeName + '[]' : typeName
  }

  // Strip parenthetical annotations: "String(canBeNullOnly...)" → "String"
  raw = raw.replace(/\([^)]*\)/g, '').trim()
  // Remove markdown links but keep link text
  let cleaned = raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
  // Strip standalone brackets: [user] → user, [boolean] → boolean
  cleaned = cleaned.replace(/\[([^\]]+)\]/g, '$1').trim()
  // "partial X object" → Partial<X>
  if (/^partial\s+/i.test(cleaned)) {
    const inner = cleaned.replace(/^partial\s+/i, '').replace(/\s*objects?$/i, '').trim()
    return `Partial<${resolveTypeRef(inner, currentResource)}>`
  }
  // "array of X objects" → X[]
  if (/^array of\s+/i.test(cleaned)) {
    const inner = cleaned.replace(/^array of\s+/i, '').replace(/\s*objects?$/i, '').trim()
    return resolveTypeRef(inner, currentResource) + '[]'
  }
  // "list of X objects" → X[]
  if (/^list of\s+/i.test(cleaned)) {
    const inner = cleaned.replace(/^list of\s+/i, '').replace(/\s*objects?$/i, '').trim()
    return resolveTypeRef(inner, currentResource) + '[]'
  }
  // "X object" → X
  cleaned = cleaned.replace(/\s*objects?$/i, '').trim()
  if (!cleaned) return 'any'
  // Standalone "array" without element type
  if (cleaned.toLowerCase() === 'array') return 'unknown[]'
  // "null" type
  if (cleaned.toLowerCase() === 'null') return 'null'
  // "one of X" → X
  if (/^one of\s+/i.test(cleaned)) return resolveTypeRef(cleaned.replace(/^one of\s+/i, ''), currentResource)
  // "dictionary with keys in/of ..." → Record<string, ...>
  if (/^dictionary/i.test(cleaned)) return 'Record<string, any>'
  // "map of snowflakes to X" → Record<snowflake, X>
  if (/^map of snowflakes to\s+/i.test(cleaned)) {
    const inner = cleaned.replace(/^map of snowflakes to\s+/i, '').replace(/\s*objects?$/i, '').trim()
    return `Record<snowflake, ${resolveTypeRef(inner, currentResource)}>`
  }
  // Complex conditional types → simplify to number
  if (/integer for .* options.*double for/i.test(cleaned)) return 'number'
  // Map primitives (including plurals)
  const lower = cleaned.toLowerCase()
  if (lower === 'snowflake' || lower === 'snowflakes') return 'snowflake'
  if (lower === 'string' || lower === 'strings') return 'string'
  if (lower === 'integer' || lower === 'int' || lower === 'integers') return 'integer'
  if (lower === 'boolean' || lower === 'bool') return 'boolean'
  if (lower === 'float' || lower === 'number' || lower === 'double') return 'number'
  if (lower === 'file contents' || lower === 'file') return 'any'
  if (lower === 'iso8601 timestamp' || lower === 'timestamp' || lower === 'iso8601timestamp') return 'timestamp'
  // dict<K, V> or dict\<K, V\> → Record<K, V>
  const dictMatch = cleaned.match(/^dict\\?<(.+?),\s*(.+?)\\?>$/i)
  if (dictMatch) {
    const key = resolveTypeRef(dictMatch[1].replace(/\\/g, ''), currentResource)
    const value = resolveTypeRef(dictMatch[2].replace(/\\/g, ''), currentResource)
    return `Record<${key}, ${value}>`
  }
  // "string; comma-delimited ..." → string
  if (cleaned.includes(';')) return resolveTypeRef(cleaned.split(';')[0].trim(), currentResource)
  // "string, integer, or double" / "string, integer, double, or boolean" → union
  if (/,.*\bor\b/i.test(cleaned)) {
    const parts = cleaned.split(/,\s*|\s+or\s+/i).map(p => p.trim()).filter(Boolean)
    return parts.map(p => resolveTypeRef(p, currentResource)).join(' | ')
  }
  // Compound types with "or" (no comma): "X or Y" → X | Y
  if (/\bor\b/i.test(cleaned) && cleaned.split(/\s+or\s+/i).length >= 2) {
    const parts = cleaned.split(/\s+or\s+/i).map(p => p.trim()).filter(Boolean)
    if (parts.length >= 2) return parts.map(p => resolveTypeRef(p, currentResource)).join(' | ')
  }
  // Special Discord doc types
  if (lower === 'data uri' || lower === 'datauri' || lower === 'image data') return 'string'
  if (lower === 'dict') return 'Record<string, string>'
  if (/^two integers/i.test(lower)) return '[integer, integer]'
  if (/^comma.delimited/i.test(lower)) return 'string'
  // Check if it looks like a valid identifier (PascalCase-able)
  if (/^[a-zA-Z][\w\s-]*$/.test(cleaned)) {
    const typeName = toPascalCase(cleaned)
    // Look up in type registry
    let info = typeRegistry.get(typeName)
      // Also try prefixed with current resource namespace: "Member" → "GuildMember"
      || typeRegistry.get(toPascalCase(currentResource) + typeName)
    // If still not found, search registry for any type ending with this name
    if (!info) {
      for (const [key, val] of typeRegistry) {
        if (key.endsWith(typeName) && val.shortName === typeName) { info = val; break }
      }
    }
    if (info) {
      if (info.resource === currentResource) {
        return info.isMain ? info.namespaceName : `${info.namespaceName}.${info.shortName}`
      } else {
        if (!crossImports.has(currentResource)) crossImports.set(currentResource, new Set())
        crossImports.get(currentResource)!.add(info.namespaceName)
        return info.isMain ? info.namespaceName : `${info.namespaceName}.${info.shortName}`
      }
    }
    return typeName
  }
  // Unrecognized type → unknown with warning
  console.warn(`  ⚠ unrecognized type: "${raw}" → unknown`)
  return 'unknown'
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

function processResource(filePath: string, outputName?: string, sourceFile?: string, docsCategory?: string) {
  const content = readFileSync(filePath, 'utf-8')
  const resourceName = outputName || basename(filePath, '.mdx')
  // Build docs path slug: "interactions" + "application-commands.mdx" → "interactions/application-commands"
  const docsSlug = docsCategory
    ? `${docsCategory}/${(sourceFile || basename(filePath, '.mdx')).replace('.mdx', '')}`
    : `resources/${resourceName}`

  const objects = parseObjects(content, resourceName)
  const enums = parseEnums(content)
  const endpoints = parseEndpoints(content, resourceName)

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

  console.log(`${resourceName}: ${objects.length} objects, ${enums.length} enums, ${endpoints.length} endpoints`)
  const ts = generateTypeScript(resourceName, docsSlug, objects, enums, endpoints)
  const outPath = join(outDir, `${resourceName}.ts`)
  writeFileSync(outPath, ts)
  console.log(`Written: ${outPath}\n`)
}

function parseObjects(content: string, resourceName: string): ObjectDef[] {
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
      let name = (row[0] || '').replace(/\\\*/g, '').replace(/\*/g, '').replace(/\\/g, '').trim()
      // Strip field[n] patterns (e.g., files[n])
      name = name.replace(/\[.*?\]/g, '')
      // Strip trailing whitespace that might have been between name and ?
      name = name.trim()
      const optional = name.endsWith('?')
      if (optional) name = name.slice(0, -1).trim()
      let rawType = (row[1] || '').trim()
      let nullable = rawType.startsWith('?')
      if (nullable) rawType = rawType.slice(1)
      // Also handle trailing ? as nullable: "String?" → nullable String
      if (rawType.endsWith('?')) {
        nullable = true
        rawType = rawType.slice(0, -1)
      }
      const description = (row[2] || '').trim()
      // const descClean = description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      const tsType = resolveTypeRef(rawType, resourceName)
      return { name, rawType, tsType, description, optional, nullable }
    }).filter(f => f.name)
    results.push({ anchor, heading, fields })
  }
  return results
}

function parseEnums(content: string): EnumDef[] {
  const results: EnumDef[] = []
  const re = /<ManualAnchor id="([^"]+)" \/>\s*\n###### (.+(?:Types?|Flags?|Modes?|Levels?))\s*\n([\s\S]*?)(?=\n(?:###|<ManualAnchor|<Route|```)|\$)/g
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
    const valueIdx = header.indexOf('value') >= 0 ? header.indexOf('value') : -1
    const descIdx = header.indexOf('description') >= 0 ? header.indexOf('description')
      : header.findIndex((h, i) => i !== typeIdx && i !== valueIdx)
    const values: EnumValue[] = rows.slice(1).map(row => {
      let name = (row[typeIdx] || '').replace(/\\\*/g, '').replace(/\*/g, '').trim()
      // Strip backticks from enum names
      name = name.replace(/`/g, '')
      // Strip escaped brackets like \[1\]
      name = name.replace(/\\\[.*?\\\]/g, '').trim()
      // Normalize enum member names to UPPER_SNAKE_CASE
      name = name.replace(/[\s-]+/g, '_').toUpperCase()
      // When no value column, use name as value (lowercased for string enums)
      let value = valueIdx >= 0 ? (row[valueIdx] || '').trim() : name.toLowerCase()
      // Extract bit shift: `0x...` `(1 << N)` → 1 << N
      const bitShift = value.match(/\((\d+\s*<<\s*\d+)\)/)
      if (bitShift) value = bitShift[1].replace(/\s+/g, ' ')
      // Strip backticks
      value = value.replace(/`/g, '').trim()
      // Strip embedded double quotes from string values: "roles" → roles
      value = value.replace(/^"(.*)"$/, '$1')
      const description = descIdx >= 0 ? (row[descIdx] || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim() : ''
      return { name, value, description }
    }).filter(v => v.name && v.value)
    if (values.length > 0) results.push({ anchor, heading, values })
  }
  return results
}

function parseEndpoints(content: string, resourceName: string): Endpoint[] {
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
              let name = (row[0] || '').replace(/\\\*/g, '').replace(/\*/g, '').replace(/\\/g, '').trim()
              name = name.replace(/\[.*?\]/g, '')
              name = name.trim()
              const optional = name.endsWith('?')
              if (optional) name = name.slice(0, -1).trim()
              let rawType = (row[1] || '').trim()
              let nullable = rawType.startsWith('?')
              if (nullable) rawType = rawType.slice(1)
              if (rawType.endsWith('?')) {
                nullable = true
                rawType = rawType.slice(0, -1)
              }
              const desc = (row[2] || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
              return { name, rawType, tsType: resolveTypeRef(rawType, resourceName), description: desc, optional, nullable }
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

function resolveReturnType(desc: string, mainName: string, currentResource: string): string {
  // Strip markdown links and possessives
  desc = desc.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  // Strip "on success" / "on error" suffixes
  desc = desc.replace(/\s+on success.*/i, '')
  // Strip filler: "all of the guild's" → ""
  desc = desc.replace(/all of (?:the )?\w+'s /gi, '')

  const resolve = (text: string, isArray = false): string => {
    const name = resolveTypeRef(text.trim(), currentResource)
    return isArray ? name + '[]' : name
  }

  if (desc.includes('204 No Content') || desc.includes('Returns `204') || desc.includes('204 empty response')) return 'void'
  if (/Returns (?:a )?20\d\b/i.test(desc)) {
    const withObj = desc.match(/20\d with (?:the (?:new |updated |modified )?)?(.+?) object/i)
    if (withObj) return resolve(withObj[1])
    return 'void'
  }
  const arrayMatch = desc.match(/Returns (?:an? )?(?:array|list) of (.+?) objects?/i)
  if (arrayMatch) return resolve(arrayMatch[1], true)
  const allOfMatch = desc.match(/Returns all of (?:the )?(?:\w+'s )?(.+?) objects?/i)
  if (allOfMatch) return resolve(allOfMatch[1], true)
  const objMatch = desc.match(/Returns (?:a |the (?:new |updated |modified )?)(.+?) object/i)
  if (objMatch) return resolve(objMatch[1])
  return 'void'
}

function generateTypeScript(
  resourceName: string,
  docsSlug: string,
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
  }
  // Endpoints with path params need snowflake
  if (endpoints.some(ep => ep.path.includes('{'))) imports.add('snowflake')

  // Add cross-file imports tracked by resolveTypeRef
  const crossFileTypes = crossImports.get(resourceName)
  if (crossFileTypes) {
    for (const t of crossFileTypes) imports.add(t)
  }
  // Placeholder for import — will be replaced after all types are resolved
  const IMPORT_PLACEHOLDER = '$$IMPORT_PLACEHOLDER$$'
  lines.push(IMPORT_PLACEHOLDER)
  lines.push('')

  // Main interface (first object)
  const mainObj = objects[0]
  if (mainObj) {
    lines.push(`/** https://discord.com/developers/docs/${docsSlug}#${mainObj.anchor} */`)
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
      lines.push(`  /** https://discord.com/developers/docs/${docsSlug}#${e.anchor} */`)
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
      lines.push(`  /** https://discord.com/developers/docs/${docsSlug}#${obj.anchor} */`)
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
      lines.push(`  /** https://discord.com/developers/docs/${docsSlug}#${obj.anchor} */`)
      lines.push(`  export interface ${name} {`)
      for (const f of obj.fields) {
        lines.push(`    /** ${f.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} */`)
        lines.push(`    ${f.name}${f.optional ? '?' : ''}: ${f.tsType}${f.nullable ? ' | null' : ''}`)
      }
      lines.push('  }')
      lines.push('')
    }

    // Params: methodName + Params (e.g., GetGuildParams, ModifyGuildParams)
    // These go outside the namespace
    const paramDefs = endpoints.filter(e => e.params)

    // Track types defined in the namespace for qualifying references in params
    const namespacedTypes = new Set<string>()
    for (const obj of subObjects) {
      const fullName = toPascalCase(obj.heading.replace(/\s*Structure$/, ''))
      namespacedTypes.add(fullName.replace(new RegExp(`^${mainName}`, 'i'), '') || fullName)
    }
    for (const e of enums) {
      namespacedTypes.add(extractEnumName(e.heading, mainName))
    }

    lines.push('}')
    lines.push('')

    for (const ep of paramDefs) {
      const methodName = toCamelCase(ep.title)
      const paramInterfaceName = methodName.charAt(0).toUpperCase() + methodName.slice(1) + 'Params'
      lines.push(`/** https://discord.com/developers/docs/${docsSlug}#${ep.params!.anchor} */`)
      lines.push(`export interface ${paramInterfaceName} {`)
      for (const f of ep.params!.fields) {
        // Qualify same-file namespace types
        let tsType = f.tsType
        const baseType = tsType.replace(/\[\]$/, '')
        if (namespacedTypes.has(baseType)) {
          tsType = `${mainName}.${tsType}`
        }
        lines.push(`  /** ${f.description} */`)
        lines.push(`  ${f.name}${f.optional ? '?' : ''}: ${tsType}${f.nullable ? ' | null' : ''}`)
      }
      lines.push('}')
      lines.push('')
    }
  } else {
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
        const paramInterfaceName = methodName.charAt(0).toUpperCase() + methodName.slice(1) + 'Params'
        args.push(`params: ${paramInterfaceName}`)
      }

      // Return type
      const returnType = resolveReturnType(ep.returnDesc, mainName, resourceName)

      lines.push('    /**')
      lines.push(`     * ${ep.description}`)
      lines.push(`     * @see https://discord.com/developers/docs/${docsSlug}#${ep.title.toLowerCase().replace(/\s+/g, '-')}`)
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

  // Finalize imports: collect any additional cross-file imports from return types
  const finalCrossTypes = crossImports.get(resourceName)
  if (finalCrossTypes) {
    for (const t of finalCrossTypes) imports.add(t)
  }
  const importLine = `import { ${[...imports].sort().join(', ')} } from '.'`
  // Clean up: remove blank lines before closing braces
  const output = lines.join('\n')
    .replace('$$IMPORT_PLACEHOLDER$$', importLine)
    .replace(/\n\n(\s*\})/g, '\n$1')
  return output + '\n'
}
