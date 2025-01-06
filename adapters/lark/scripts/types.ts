/* eslint-disable no-console */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { capitalize } from 'cosmokit'
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
  options?: {
    name: string
    value: string
    description: string
  }[]
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

function toHump(name: string) {
  return name.replace(/[\_\.](\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

function formatType(schema: Schema, imports: Set<string>) {
  if (!schema.ref) return _formatType(schema, imports)
  const name = capitalize(toHump(schema.ref))
  imports.add(name)
  if (refs[name]) return name
  refs[name] = schema.type === 'object' && schema.properties
    ? `export interface ${name} ${_formatType(schema)}`
    : `export type ${name} = ${_formatType(schema)}`
  return name
}

function _formatType(schema: Schema, imports = new Set<string>()) {
  if (schema.type === 'file') return 'Blob'
  if (schema.type === 'int') {
    if (schema.options) {
      return schema.options.map(v => v.value).join(' | ')
    } else {
      return 'number'
    }
  }
  if (schema.type === 'float') return 'number'
  if (schema.type === 'string') {
    if (schema.options) {
      return schema.options.map(v => `'${v.value}'`).join(' | ')
    } else {
      return 'string'
    }
  }
  if (schema.type === 'boolean') return 'boolean'
  if (schema.type === 'object') {
    if (!schema.properties) return 'unknown'
    return `{\n${generateParams(schema.properties, imports)}\n}`
  } else if (schema.type === 'list') {
    return formatType(schema.items!, imports) + '[]'
  }
  return 'unknown'
}

function generateParams(properties: Schema[], imports: Set<string>): string {
  const getDesc = (v: Schema) => v.description ? `  /** ${v.description.replace(/\n/g, '').trim()} */\n` : ''
  return properties.map((schema: Schema) => {
    return `${getDesc(schema)}  ${schema.name}${schema.required ? '' : '?'}: ${formatType(schema, imports)}`
  }).join('\n')
}

function getApiName(detail: ApiDetail) {
  let project = detail.project
  if (project === 'task' || project === 'drive') {
    project = project + detail.version.toUpperCase()
  }
  if (detail.project === detail.resource) {
    return toHump(`${detail.apiName}.${project}`)
  } else {
    return toHump(`${detail.apiName}.${project}.${detail.resource}`)
  }
}

interface Project {
  methods: string[]
  requests: string[]
  responses: string[]
  internals: string[]
  imports: Set<string>
  defines: Record<string, Record<string, string>>
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

  details.forEach((detail, index) => {
    const summary = data.apis[index]
    const project = projects[detail.project] ||= {
      methods: [],
      requests: [],
      responses: [],
      internals: [],
      imports: new Set(),
      defines: {},
    }

    const method = getApiName(detail)
    const apiType = capitalize(method)
    const args: string[] = []
    const extras: string[] = []
    let returnType = `${apiType}Response`
    // if (api.pagination) console.log(apiName, 'pagination')

    for (const property of detail.request.path?.properties || []) {
      args.push(`${property.name}: ${formatType(property, project.imports)}`)
    }
    if (detail.supportFileUpload && detail.request.body?.properties?.length) {
      const name = `${apiType}Form`
      args.push(`form: ${name}`)
      project.requests.push(`export interface ${name} {\n${generateParams(detail.request.body!.properties, project.imports)}\n}`)
      extras.push(`multipart: true`)
    } else if (detail.request.body?.properties?.length) {
      const name = `${apiType}Request`
      project.requests.push(`export interface ${name} {\n${generateParams(detail.request.body.properties, project.imports)}\n}`)
      args.push(`body: ${name}`)
    }
    if (detail.request.query?.properties?.length) {
      const name = `${apiType}Query`
      project.requests.push(`export interface ${name} {\n${generateParams(detail.request.query.properties, project.imports)}\n}`)
      args.push(`query?: ${name}`)
    }

    if (detail.supportFileDownload) {
      // detail.response.contentType === ''
      returnType = 'ArrayBuffer'
      extras.push(`type: 'binary'`)
    } else {
      const keys = (detail.response.body?.properties || []).map(v => v.name)
      if (!keys.includes('code') || !keys.includes('msg')) {
        console.log(`unknown response body keys: ${keys}, see https://open.feishu.cn${summary.fullPath}}`)
        return
      } else if (keys.length === 2) {
        returnType = 'void'
      } else if (keys.length === 3 && keys.includes('data')) {
        const data = detail.response.body.properties!.find(v => v.name === 'data')!
        if (!data.properties?.length) {
          returnType = 'void'
        } else {
          project.responses.push(`export interface ${returnType} {\n${generateParams(data.properties, project.imports)}\n}`)
        }
      } else {
        project.responses.push(`export interface ${returnType} extends BaseResponse {\n${generateParams(detail.response.body.properties!, project.imports)}\n}`)
        extras.push(`type: 'raw-json'`)
      }
    }

    project.methods.push(dedent`
      /**
       * ${summary.name}
       * @see https://open.feishu.cn${summary.fullPath}
       */
      ${method}(${args.join(', ')}): Promise<${returnType}>
    `)

    const path = detail.apiPath.replace(/:([0-9a-zA-Z_]+)/g, '{$1}')
    project.defines[path] ||= {}
    project.defines[path][detail.httpMethod] = extras.length
      ? `{ name: '${method}', ${extras.join(', ')} }`
      : `'${method}'`
  })

  await Promise.all(Object.entries(projects).map(async ([name, project]) => {
    const path = new URL(`../src/types/${name}.ts`, import.meta.url)
    const defines = Object.entries(project.defines).map(([path, methods]) => {
      const content = Object.entries(methods).map(([method, value]) => {
        return `    ${method}: ${value},`
      }).join('\n')
      return `'${path}': {\n${content}\n  },`
    }).join('\n  ')
    const imports = [`import { Internal } from '../internal'`]
    if (project.imports.size) {
      imports.push(`import { ${[...project.imports].sort().join(', ')} } from '.'`)
    }
    await writeFile(path, [
      imports.join('\n'),
      dedent`
        declare module '../internal' {
          interface Internal {
            __METHODS__
          }
        }
      `.replace('__METHODS__', project.methods.join('\n').split('\n').join('\n    ')),
      ...project.requests,
      ...project.responses,
      dedent`
        Internal.define({
          __DEFINES__
        })
      `.replace('__DEFINES__', defines),
    ].join('\n\n') + '\n')
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
