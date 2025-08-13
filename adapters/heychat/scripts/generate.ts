import fs from 'node:fs'

import * as cmk from 'cosmokit'
import { compile } from 'json-schema-to-typescript'

import type { OpenAPIV3 } from 'openapi-types'

// Common query parameters in all endpoints, we could
// just ignore them in the generated types and then add
// them back in the actual implementation of the Internal
// class.
const ignoredQueryParams = [
  'client_type',
  'x_client_type',
  'os_type',
  'x_os_type',
  'x_app',
  'chat_os_type',
  'chat_version',
]

export interface OutputFile {
  imports: { [pkg: string]: string[] | string }
  content: string
}

async function generate(json: OpenAPIV3.Document): Promise<Record<string, OutputFile>> {
  const output: Record<string, OutputFile> = {}
  const files = new Set<string>()
  for (const path in json?.paths || {}) {
    const fileName = /^\/([^/]+)/.exec(path)?.[1] || 'default'
    files.add(fileName)
    const filePath = `./src/types/${fileName}.ts`
    if (!output[filePath]) {
      output[filePath] = { content: '', imports: { '../internal': ['Internal'] } }
    }
    const file = output[filePath]
    const methods = json.paths[path]

    for (const method in methods) {
      const operation = methods[method] as OpenAPIV3.OperationObject
      const summary = operation.summary || operation.operationId || 'Unnamed'
      const interfacePrefix = path
        .split('/')
        .map((s) => cmk.capitalize(cmk.camelCase(s)))
        .join('')
        + (Object.keys(methods).length > 1 ? cmk.capitalize(method) : '')

      // Generate the interface of request param for the operation
      // Generate comment first
      file.content += `/**\n * ${summary}`
        + (operation.description ? `\n * ${operation.description}` : '')
        + `\n */\n`

      if (method === 'get') {
        // Generate the interface
        file.content += `export interface ${interfacePrefix}Params {\n`
        for (const { name, schema, description, in: _in } of operation.parameters as OpenAPIV3.ParameterObject[] || []) {
          if (ignoredQueryParams.includes(name)) continue
          if (_in === 'header') continue
          file.content += description ? `  /** ${description} */\n` : ''
          file.content += `  ${name}: ${(schema as OpenAPIV3.SchemaObject)?.type};\n`
        }
        file.content += `}\n`
      } else if (method === 'post') {
        if (operation.requestBody) {
          const { content } = operation.requestBody as OpenAPIV3.RequestBodyObject
          const schema = (content['application/json'] || content['application/x-www-form-urlencoded'])?.schema
          {
            const schemata = [schema]
            let cur = schemata.pop() as OpenAPIV3.SchemaObject | undefined
            while (cur && cur.type === 'object') {
              if (cur.properties) {
                for (const prop of Object.values(cur.properties)) {
                  if ('$ref' in prop) {
                    continue
                  }
                  if (prop.title) {
                    prop.description = prop.title
                    delete prop.title
                  }
                  if (prop.type === 'object') {
                    schemata.push(prop)
                  }
                  if (prop.type === 'array') {
                    if ('$ref' in prop.items) {
                      continue
                    }
                    if (prop.items.type === 'object') {
                      schemata.push(prop.items)
                    }
                  }
                }
              }
              cur = schemata.pop() as OpenAPIV3.SchemaObject | undefined
            }
          }
          if (schema) {
            file.content += await compile(
              ('$ref' in schema) ? { ...schema, components: json.components } : schema,
              `${interfacePrefix}Params`,
              { bannerComment: '', declareExternallyReferenced: false, format: false },
            )
          }
        } else {
          file.content += `export interface ${interfacePrefix}Params {\n` + `}\n`
        }
      }

      file.content += '\n'

      // Generate Internal class methods
      let paramName = `${interfacePrefix}Params`
      if ('multipart/form-data' in ((operation.requestBody as OpenAPIV3.RequestBodyObject)?.content ?? {})) {
        file.imports['form-data'] = 'FormData'
        paramName = 'FormData'
      }

      const additionalParams: Record<string, string> = {}
      for (const param of (operation.parameters as OpenAPIV3.ParameterObject[]) || []) {
        if (method === 'get') continue
        if (ignoredQueryParams.includes(param.name)) continue
        if (param.in === 'header') continue
        additionalParams[param.name] = (param.schema as OpenAPIV3.SchemaObject).type!
      }
      const additionalParamsAsParameter = Object.entries(additionalParams).map(([name, type]) => `${name}: ${type}`)
      const allParameters = [...additionalParamsAsParameter, 'data: ' + paramName].filter(Boolean).join(', ')

      file.content += `declare module '../internal' {\n`
        + `  interface Internal {\n`
        + `    ${method}${cmk.capitalize(interfacePrefix)}: (${allParameters}) => Promise<void>\n`
        + `  }\n`
        + `}\n`

      // Generate Internal define statement
      file.content += 'Internal.define({\n'
        + `  '${path}': {\n`
        + `    ${method.toUpperCase()}: '${method}${cmk.capitalize(interfacePrefix)}',\n`
        + `  },\n`
        + '})\n'
    }

    file.content += '\n'
  }

  output['./src/types/index.ts'] = {
    content: Array.from(files.keys())
      .sort()
      .map(fileName => `export * from './${fileName}'`)
      .join('\n') + '\n',
    imports: {},
  }

  return output
}

async function main(argv = process.argv.slice(2)) {
  if (argv.length === 0) {
    console.error('No input files specified.')
    console.info('Usage: yarn generate openapi.json')
    process.exit(1)
  }

  const inputFile = argv[0]
  const json = JSON.parse(fs.readFileSync(inputFile, 'utf-8'))
  const generated = await generate(json)

  for (const fileName in generated) {
    const { content, imports } = generated[fileName]
    const importLine = Object.entries(imports)
      .map(([importPath, symbols]) => 'import ' + (Array.isArray(symbols) ? `{ ${symbols.join(', ')} }` : symbols) + ` from '${importPath}'`)
      .join('\n') + '\n\n'
    fs.writeFileSync(fileName, (importLine + content).trim() + '\n')
  }
}

main()
