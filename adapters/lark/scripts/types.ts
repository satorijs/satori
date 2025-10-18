/* eslint-disable no-console */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { camelize, capitalize } from 'cosmokit'
import pMap from 'p-map'
import dedent from 'dedent'

interface Response<T = any> {
  code: number
  msg: string
  data: T
}

export interface ApiMeta {
  Name: string
  Project: string
  Resource: string
  Type: 1
  Version: string
}

interface Api {
  bizTag: string
  chargingMethod: 'none' | 'basic'
  detail: string
  fullDose: boolean
  fullPath: string
  id: string
  isCharge: boolean
  meta: ApiMeta
  name: string
  orderMark: string
  supportAppTypes: string[]
  tags: string[]
  updateTime: number
  url: string
}

interface BizInfo {
  desc: string
  name: string
}

interface ApiList {
  apis: Api[]
  bizInfos: BizInfo[]
}

export interface Schema {
  name: string
  type: string
  format: string
  description: string
  example: string
  idTypes: {} // ?
  defaultValue: string
  ref: string // ?
  required: boolean
  properties?: Schema[]
  items?: Schema
  keyType?: Schema
  valueType?: Schema
  options?: SchemaOption[]
}

export interface SchemaOption {
  name: string
  value: string
  description: string
}

interface ApiDetail {
  request: {
    query: Schema
    body?: Schema
    path?: Schema
    contentType: ''
  }
  response: {
    body: Schema
    contentType: string
  }
  project: string
  apiName: string
  scopesOfFieldRequired: [] // ?
  pagination: boolean
  supportFileDownload: boolean
  supportFileUpload: boolean
  resource: string
  apiPath: string
  description: string
  scopesOfDebugRequired: string[]
  errorMappings: {
    msg: string
    httpCode: number
    code: number
  }[]
  httpMethod: string
  version: string
  accessTokens: 'tenant'[]
  basicRateLimit: {
    tier: number
  }
}

const refs: Record<string, string> = {}
const projects: Record<string, Project> = {}

async function request<T>(url: string) {
  const response = await fetch(url)
  const body: Response<T> = await response.json()
  if (body.code) throw new Error(`${body.msg}, url: ${url}`)
  return body.data
}

async function getDetail(api: Api) {
  const path = new URL(`../temp/api/${api.id}.json`, import.meta.url)
  try {
    return JSON.parse(await readFile(path, 'utf8')) as ApiDetail
  } catch {}
  const params = new URLSearchParams({
    apiName: api.meta.Name,
    project: api.meta.Project,
    resource: api.meta.Resource,
    version: api.meta.Version,
  })
  const data = await request<ApiDetail>(`https://open.feishu.cn/api_explorer/v1/api_definition?${params}`)
  await writeFile(path, JSON.stringify(data))
  return data
}

function formatEnum(options: SchemaOption[], type: string): string {
  if (!options.length) return ''
  const quote = type === 'string' ? "'" : ''
  return options.map((option) => {
    const desc = option.description ? `  /** ${option.description.replace(/\n/g, '').trim()} */\n` : ''
    return `${desc}  ${capitalize(camelize(option.name))} = ${quote}${option.value}${quote},`
  }).join('\n') + '\n'
}

function formatObject(properties: Schema[], parentName: string, project?: Project, ns?: Namespace): string {
  if (!properties.length) return ''
  return properties.map((schema) => {
    const name = parentName ? parentName + capitalize(camelize(schema.name)) : undefined
    const desc = schema.description ? `  /** ${schema.description.replace(/\n/g, '').trim()} */\n` : ''
    return `${desc}  ${schema.name}${schema.required ? '' : '?'}: ${formatType(schema, name!, project, ns, false)}`
  }).join('\n') + '\n'
}

function formatType(schema: Schema, name: string, project?: Project, ns?: Namespace, inArray?: boolean) {
  const prefix = project ? 'Lark.' : ''
  if (schema.ref) {
    name = capitalize(camelize(schema.ref.replace(/\./g, '_')))
    project?.imports.add(name)
    if (refs[name]) return `${prefix}${name}`
  }
  let isEnum = !!((project || schema.ref) && schema.options)
  if (isEnum) {
    if (schema.type === 'int') {
      isEnum = schema.options!.every(v => !/^\d+$/.test(v.name) && /^\w+$/.test(v.name))
    } else if (schema.type === 'string') {
      isEnum = !!schema.ref
    } else {
      isEnum = false
    }
  }
  if (isEnum) {
    const decl = `export const enum ${name} {\n${formatEnum(schema.options!, schema.type)}}`
    if (schema.ref) {
      refs[name] = decl
      return `${prefix}${name}`
    } else {
      ns!.interfaces.push(decl)
      return name
    }
  }
  if (!schema.ref) {
    return _formatType(schema, name, project, ns, inArray)
  }
  refs[name] = schema.type === 'object' && schema.properties
    ? `export interface ${name} ${_formatType(schema, name)}`
    : `export type ${name} = ${_formatType(schema, name)}`
  return `${prefix}${name}`
}

function _formatType(schema: Schema, parentName: string, project?: Project, ns?: Namespace, inArray?: boolean) {
  if (schema.type === 'file') return 'Blob'
  if (schema.type === 'float') return 'number'
  if (schema.type === 'int' || schema.type === 'int64') {
    if (schema.options) {
      const output = schema.options.map(v => v.value).join(' | ')
      return inArray ? `(${output})` : output
    } else {
      return 'number'
    }
  }
  if (schema.type === 'string') {
    if (schema.options) {
      const output = schema.options.map(v => `'${v.value}'`).join(' | ')
      return inArray ? `(${output})` : output
    } else {
      return 'string'
    }
  }
  if (schema.type === 'boolean') return 'boolean'
  if (schema.type === 'object') {
    if (!schema.properties) return 'unknown'
    return `{\n${formatObject(schema.properties, parentName, project, ns)}}`
  }
  if (schema.type === 'list') {
    let name = parentName
    if (name.endsWith('List')) {
      name = parentName.slice(0, -4)
    }
    return formatType(schema.items!, name, project, ns, true) + '[]'
  }
  if (schema.type === 'map') {
    const key = formatType(schema.keyType!, parentName + 'Key', project, ns)
    const value = formatType(schema.valueType!, parentName + 'Value', project, ns)
    return `Record<${key}, ${value}>`
  }
  console.log(`unknown type: ${schema.type}`)
  return 'unknown'
}

function createInterface(name: string, properties: Schema[], project: Project, ns: Namespace, parent?: string): string {
  return `export interface ${name}${parent ? ` extends ${parent}` : ''} {\n${formatObject(properties, name, project, ns)}}`
}

interface Project {
  namespace: Namespace
  imports: Set<string>
  internalImports: Set<string>
  defines: Record<string, Record<string, string>>
}

interface Namespace {
  methods: string[]
  interfaces: string[]
  namespaces: Record<string, Namespace>
}

function formatNamespace(name: string, ns: Namespace): string {
  return dedent`
    export namespace ${name} {
      export interface Methods {
        __METHODS__
      }

      __INTERFACES__

      __NAMESPACES__
    }`
    .replace('__METHODS__', [
      ...Object.entries(ns.namespaces).map(([name]) => `${name[0].toLowerCase() + name.slice(1)}: ${name}.Methods`),
      ...ns.methods.join('\n').split('\n'),
    ].join('\n    '))
    .replace('__INTERFACES__', ns.interfaces.join('\n\n').split('\n').join('\n  '))
    .replace('__NAMESPACES__', Object.entries(ns.namespaces).map(([name, ns]) => {
      return formatNamespace(name, ns)
    }).join('\n\n').split('\n').join('\n  '))
}

async function start() {
  await mkdir(new URL('../temp/api', import.meta.url), { recursive: true })
  await mkdir(new URL('../src/types', import.meta.url), { recursive: true })
  // https://open.feishu.cn/document/server-docs/api-call-guide/server-api-list
  const data = await request<ApiList>('https://open.feishu.cn/api/tools/server-side-api/list')
  data.apis = data.apis.filter(api => api.meta.Version !== 'old')
  await writeFile(new URL('../temp/apis.json', import.meta.url), JSON.stringify(data))
  const details = await pMap(data.apis, getDetail, {
    concurrency: 10,
  })

  const projectVersions: Record<string, Set<string>> = {}
  data.apis.forEach(api => {
    (projectVersions[api.meta.Project] ??= new Set()).add(api.meta.Version)
  })
  console.log(projectVersions)

  const methods: Record<string, number> = {}
  details.forEach((detail, index) => {
    const routeParts = [
      detail.project,
      ...detail.resource.split('.'),
      detail.apiName,
    ].map(camelize)
    if (routeParts[0] === routeParts[1]) routeParts.shift()
    const route = routeParts.join('.')
    if (!methods[route] || details[methods[route]].version < detail.version) {
      methods[route] = index
    }
  })

  Object.entries(methods).forEach(([route, index]) => {
    const detail = details[index]
    const summary = data.apis[index]
    const project = projects[detail.project] ||= {
      namespace: {
        methods: [],
        interfaces: [],
        namespaces: {},
      },
      imports: new Set(),
      internalImports: new Set(['Internal']),
      defines: {},
    }

    const method = camelize(detail.apiName)
    const apiType = capitalize(method)
    const args: string[] = []
    const extras: string[] = []

    const parts = detail.resource.split('.').map(name => capitalize(camelize(name)))
    let ns = project.namespace
    if (parts[0] === capitalize(camelize(detail.project))) {
      parts.shift()
    }
    for (const part of parts) {
      ns = ns.namespaces[part] ||= {
        methods: [],
        interfaces: [],
        namespaces: {},
      }
    }
    const lastPart = parts[parts.length - 1] ?? capitalize(camelize(detail.project))

    let returnType: string
    let paginationRequest: { queryType?: string } | undefined
    for (const property of detail.request.path?.properties || []) {
      const name = apiType + capitalize(camelize(property.name))
      args.push(`${property.name}: ${formatType(property, name, project, ns)}`)
    }
    if (detail.supportFileUpload && detail.request.body?.properties?.length) {
      const name = `${apiType}Form`
      args.push(`form: ${name}`)
      ns.interfaces.push(createInterface(name, detail.request.body!.properties, project, ns))
      extras.push(`multipart: true`)
    } else if (detail.request.body?.properties?.length) {
      const name = `${apiType}Request`
      ns.interfaces.push(createInterface(name, detail.request.body!.properties, project, ns))
      args.push(`body: ${name}`)
    }
    if (detail.request.query?.properties?.length) {
      let queryType = `${apiType}Query`
      const keys = detail.request.query.properties.map(s => s.name)
      if (keys.includes('page_token') && keys.includes('page_size')) {
        project.internalImports.add('Pagination')
        const properties = detail.request.query.properties.filter(s => s.name !== 'page_token' && s.name !== 'page_size')
        if (properties.length) {
          ns.interfaces.push(createInterface(queryType, properties, project, ns, 'Pagination'))
          paginationRequest = { queryType }
        } else {
          queryType = 'Pagination'
          paginationRequest = {}
        }
      } else {
        ns.interfaces.push(createInterface(queryType, detail.request.query.properties, project, ns))
      }
      args.push(`query?: ${queryType}`)
    }

    let paginationResponse: { innerType: string; tokenKey: string; itemsKey: string } | undefined
    if (detail.supportFileDownload) {
      returnType = 'Promise<ArrayBuffer>'
      extras.push(`type: 'binary'`)
    } else {
      const keys = (detail.response.body?.properties || []).map(v => v.name)
      if (!keys.includes('code') || !keys.includes('msg')) {
        console.log(`unsupported response body: ${keys}, see https://open.feishu.cn${summary.fullPath}}`)
        return
      } else if (keys.length === 2) {
        returnType = 'Promise<void>'
      } else if (keys.length === 3 && keys.includes('data')) {
        const data = detail.response.body.properties!.find(v => v.name === 'data')!
        if (!data.properties?.length) {
          returnType = 'Promise<void>'
        } else {
          const responseType = `${apiType}Response`
          const _keys = (data.properties || []).map(v => v.name)
          const keys = new Set(_keys)
          let pagination: [string, string, Schema] | undefined
          const isPagination = keys.delete('page_token') || keys.delete('next_page_token')
          keys.delete('has_more')
          keys.delete('count')
          keys.delete('total_count')
          keys.delete('total')
          keys.delete('page_size')
          if (isPagination && keys.size === 1) {
            const list = (data.properties || []).find(v => v.name === [...keys][0])!
            if (list.type === 'list') {
              const tokenKey = _keys.includes('page_token') ? 'page_token' : 'next_page_token'
              pagination = [list.name, tokenKey, list.items!]
            }
          }
          if (pagination) {
            const [itemsKey, tokenKey, schema] = pagination
            let innerType = formatType(schema, apiType + 'Item', project, ns)
            if (schema.type === 'object' && schema.properties && !schema.ref) {
              ns.interfaces.push(`export interface ${apiType}Item ${innerType}`)
              innerType = `${apiType}Item`
            }
            // standard pagination response
            if (_keys.length === 3 && _keys.includes('has_more') && _keys.includes('page_token')) {
              returnType = itemsKey === 'items' ? `Paginated<${innerType}>` : `Paginated<${innerType}, '${itemsKey}'>`
              project.internalImports.add('Paginated')
            } else {
              returnType = `Promise<${responseType}> & AsyncIterableIterator<${innerType}>`
              ns.interfaces.push(createInterface(responseType, data.properties, project, ns))
            }
            paginationResponse = { innerType, tokenKey, itemsKey }
          } else {
            if (detail.pagination) {
              console.log(`unsupported pagination (${_keys}), see https://open.feishu.cn${summary.fullPath}`)
            }
            ns.interfaces.push(createInterface(responseType, data.properties, project, ns))
            returnType = `Promise<${responseType}>`
          }
        }
      } else {
        const responseType = `${apiType}Response`
        const properties = detail.response.body.properties!.filter(v => !['code', 'msg'].includes(v.name))
        ns.interfaces.push(createInterface(responseType, properties, project, ns, 'BaseResponse'))
        extras.push(`type: 'raw-json'`)
        project.internalImports.add('BaseResponse')
        returnType = `Promise<${lastPart}.${responseType}>`
      }
    }

    ns.methods.push(dedent`
      /**
       * ${summary.name}
       * @see https://open.feishu.cn${summary.fullPath}
       */
      ${method}(${args.join(', ')}): ${returnType}
    `)

    if (paginationRequest && paginationResponse) {
      const argIndex = args.length - 1
      const props: string[] = [`argIndex: ${argIndex}`]
      if (paginationResponse.itemsKey !== 'items') {
        props.push(`itemsKey: '${paginationResponse.itemsKey}'`)
      }
      if (paginationResponse.tokenKey !== 'page_token') {
        props.push(`tokenKey: '${paginationResponse.tokenKey}'`)
      }
      extras.push(`pagination: { ${props.join(', ')} }`)
    }

    const path = detail.apiPath
      .slice('/open-apis'.length)
      .replace(/:([0-9a-zA-Z_]+)/g, '{$1}')
    project.defines[path] ||= {}
    project.defines[path][detail.httpMethod] = extras.length
      ? `{ name: '${route}', ${extras.join(', ')} }`
      : `'${route}'`
  })

  await Promise.all(Object.entries(projects).map(async ([name, project]) => {
    const path = new URL(`../src/types/${name}.ts`, import.meta.url)
    const defines = Object.entries(project.defines).map(([path, methods]) => {
      const content = Object.entries(methods).map(([method, value]) => {
        return `    ${method}: ${value},`
      }).join('\n')
      return `'${path}': {\n${content}\n  },`
    }).join('\n  ')
    const imports = [`import { ${[...project.internalImports]
      .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      .join(', ')} } from '../internal'`]
    if (project.imports.size) {
      imports.unshift(`import * as Lark from '.'`)
    }
    await writeFile(path, [
      imports.join('\n'),
      dedent`
        declare module '../internal' {
          interface Internal {
            ${camelize(name)}: ${capitalize(camelize(name))}.Methods
          }
        }

        __NAMESPACE__

        Internal.define({
          __DEFINES__
        })`
        .replace('__NAMESPACE__', formatNamespace(capitalize(camelize(name)), project.namespace))
        .replace('__DEFINES__', defines),
    ].join('\n\n').split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      .replace(/\n{2,}( *\})/g, '\n$1')
      .replace(/\{\n{2,}/g, '{\n')
      .replace(/\n{2,}/g, '\n\n') + '\n')
  }))

  await writeFile(new URL('../src/types/index.ts', import.meta.url), [
    Object.entries(projects)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name]) => `export * from './${name}'`)
      .join('\n'),
    ...Object.entries(refs)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, value]) => value),
  ].join('\n\n') + '\n')
}

start()
