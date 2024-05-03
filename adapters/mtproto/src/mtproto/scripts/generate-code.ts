import {
  api,
  type Constructor,
  type Definition,
  type Method,
  mtproto,
} from "../gen/schemas";

const typemaps = {
  "#": "int32",
  Bool: "bool",
  True: "true",
  int: "int32",
  long: "int64",
  future_salt: "FutureSalt",
  // Object: "mt.Object",
};

const tstypemaps = {
  true: "true",
  bool: "boolean",
  int32: "number",
  int64: "bigint",
  int128: "Uint8Array",
  int256: "Uint8Array",
  double: "number",
  bytes: "Uint8Array",
  string: "string",
  X: "any",
} as const;

const commontypes = [...Object.keys(tstypemaps)];

const builtintypes = ["Bool", "True", "Null", "Error"];

type ParamType = {
  type: string;
  flag?: {
    name: string;
    pos: number;
  };
  vector: boolean;
  bare: boolean;
};

function parseParamType(name: string): ParamType {
  const matched = name.match(
    /(?:(?<id>flags\d?)\.(?<pos>\d+)\?)?(?<vector>[Vv]ector<)?(?<bare>%)?(?<base>(?:\w|\.)+|#)>?/,
  );
  if (!matched || !matched.groups) {
    throw new Error(`Type ${name} could not parsed`);
  }
  let flag: { name: string; pos: number } | undefined;
  if (matched.groups.id != null) {
    flag = {
      name: matched.groups.id,
      pos: +matched.groups.pos,
    };
  }
  const vector = matched.groups.vector != null;
  let type = matched.groups.base;
  if (type in typemaps) type = (typemaps as any)[type];
  return { type, vector, flag, bare: matched.groups.bare != null };
}

function mapSimpleType(type: string): string {
  if (type in tstypemaps) return (tstypemaps as any)[type];
  return type;
}

function generateParamDecl(type: ParamType): string {
  let base = mapSimpleType(type.type);
  if (type.type == "mt.Object") return ": AnyObject";
  if (type.vector) base += "[]";
  if (type.flag != null) return "?: " + base;
  return ": " + base;
}

function generateMethodReturnType(
  type: ParamType,
  skipnamespace: string | undefined,
): string {
  let base = mapSimpleType(type.type);
  if (skipnamespace) {
    const { namespace, name } = parseNamespace(base);
    if (namespace == skipnamespace) base = name;
  }
  if (type.vector) base += "[]";
  return base;
}

function parseNamespace(input: string) {
  const matched = input.match(/(?:(?<namespace>\S+)\.)?(?<name>\S+)/);
  if (!matched || !matched.groups) {
    throw new Error(`Predicate ${input} could not parsed`);
  }
  let { namespace, name } = matched.groups as {
    namespace?: string;
    name: string;
  };
  if (name == "Object") namespace = "mt";
  return { namespace, name };
}

class DocumentWriter {
  #data = "";
  indent = 0;

  writeraw(text: string) {
    this.#data += text;
    this.#data += "\n";
  }

  append(template: TemplateStringsArray, ...injects: any[]) {
    this.#write(String.raw(template, ...injects));
  }

  #write(text: string) {
    if (this.indent <= 0) {
      this.#data += text;
      this.#data += "\n";
      return;
    }
    for (const line of text.split("\n")) {
      this.#data += " ".repeat(this.indent * 2) + line + "\n";
    }
  }

  eat() {
    this.#data = this.#data.slice(0, -1);
  }

  empty() {
    this.#data += "\n";
  }

  toString() {
    return this.#data;
  }
}

class MultiMap<K, V> {
  #map = new Map<K, V[]>();

  #get(key: K): V[] {
    let ret = this.#map.get(key);
    if (ret == null) {
      this.#map.set(key, ret = []);
    }
    return ret;
  }

  has(key: K): boolean {
    return this.#map.has(key);
  }

  add(key: K, value: V) {
    this.#get(key).push(value);
  }

  get(key: K) {
    return this.#map.get(key);
  }

  [Symbol.iterator]() {
    return this.#map.entries();
  }
}

class Namespaced {
  data = new MultiMap<string, { name: string; constructor: Constructor }>();

  add(constructor: Constructor) {
    const { name } = parseNamespace(constructor.predicate);
    const { name: type } = parseNamespace(constructor.type);
    this.data.add(type, { name, constructor });
  }
  has(name: string) {
    return this.data.has(name);
  }
  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
}

class TypeList {
  data = new Map<string | undefined, Namespaced>();

  #get(key: string | undefined): Namespaced {
    let ret = this.data.get(key);
    if (ret == null) {
      this.data.set(key, ret = new Namespaced());
    }
    return ret;
  }
  get(key?: string) {
    return this.data.get(key);
  }
  add(constructor: Constructor) {
    const { namespace } = parseNamespace(constructor.type);
    this.#get(namespace).add(constructor);
  }
  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }
}

function encodeType(jsfile: DocumentWriter, name: string, type: string) {
  const parsed = parseParamType(type);
  const decl = generateParamDecl(parsed);
  const comments = `${decl} - ${type}`;
  let base: string | undefined;
  switch (parsed.type) {
    case "true":
    case "bool":
    case "double":
    case "bytes":
    case "string":
    case "int32":
    case "int64":
    case "int128":
    case "int256":
      base = `this.${parsed.type}`;
      break;
    default:
      base = `this.object`;
  }
  if (base == undefined) {
    jsfile.append`// ERROR: ${name}${comments}`;
  } else {
    if (parsed.vector) {
      base = parsed.bare
        ? `this.vector(_.${name}, ${base}, true);`
        : `this.vector(_.${name}, ${base});`;
    } else {
      base = `${base}(_.${name});`;
    }
    if (parsed.flag == null) {
      jsfile.append`${`${base.padEnd(39)}`} // ${comments}`;
    } else {
      if (parsed.vector) {
        jsfile.append`if (_.${name} != null && _.${name}.length > 0)`;
      } else {
        jsfile.append`if (_.${name} != null)`;
      }
      jsfile.append`${`  ${base}`.padEnd(39)} // ${comments}`;
    }
  }
}

class DefinitionProcessor {
  jsfile = new DocumentWriter();
  tsfile = new DocumentWriter();
  typesubs = new MultiMap<string, string>();
  filtered: Constructor[] = [];
  typelist = new TypeList();
  types = new Set<string>();
  methods = new MultiMap<
    string | undefined,
    { name: string; method: Method }
  >();

  constructor() {
    const { jsfile, tsfile } = this;
    jsfile.append`/// <reference types="./api.d" />`;
    jsfile.append`// Generated by scripts/generate-code`;
    tsfile.append`// Generated by scripts/generate-code`;
    tsfile.append`import type {`;
    tsfile.indent++;
    tsfile.append`BaseSerializer,`;
    tsfile.append`BaseDeserializer,`;
    tsfile.append`ToUnderscore,`;
    tsfile.append`TLMethod,`;
    tsfile.append`TLApiMethod,`;
    tsfile.append`TLConstructor,`;
    tsfile.append`TLConstructorEmpty,`;
    tsfile.indent--;
    tsfile.append`} from "../tl/types";`;
    tsfile.empty();
  }

  get js() {
    return this.jsfile.toString();
  }

  get ts() {
    return thisfile.toString();
  }

  add(definition: Definition, mt = false) {
    const {
      filtered,
      typelist,
      typesubs,
      types,
      methods,
    } = this;
    for (const item of definition.constructors) {
      if (
        !item.type.startsWith("Vector ") && !builtintypes.includes(item.type)
      ) {
        if (mt) {
          item.type = "mt." + item.type;
          item.predicate = "mt." + item.predicate;
        }
        types.add(item.type);
        filtered.push(item);
        typelist.add(item);
        if (item.type.includes(".")) {
          typesubs.add(item.type, item.predicate);
        } else {
          typesubs.add("api." + item.type, item.predicate);
        }
      }
    }
    for (const item of filtered) {
      for (const param of item.params) {
        const parsed = parseParamType(param.type);
        if (mt && !commontypes.includes(parsed.type)) {
          parsed.type = "mt." + parsed.type;
          console.assert(parsed.flag == null);
          let base = parsed.type;
          if (parsed.bare) base = `%${base}`;
          if (parsed.vector) base = `vector<${base}>`;
          param.type = base;
        }
        if (!types.has(parsed.type) && !commontypes.includes(parsed.type)) {
          console.error(parsed);
          throw new Error(
            `Could not find definition for type ${param.type} in constructor ${item.predicate}#${item.id}`,
          );
        }
      }
    }
    for (const item of definition.methods) {
      if (mt) {
        item.method = "mt." + item.method;
        item.type = "mt." + item.type;
      }
      // methods.add("mt", { name: item.method, method: item });
      const { namespace, name } = parseNamespace(item.method);
      methods.add(namespace, { name, method: item });
      for (const param of item.params) {
        const parsed = parseParamType(param.type);
        if (!types.has(parsed.type) && !commontypes.includes(parsed.type)) {
          throw new Error(
            `Could not find definition for type ${param.type} in method ${item.method}#${item.id}`,
          );
        }
      }
    }
  }

  resolve_global_type(type: string) {
    const parsed = parseParamType(type);
    const { namespace: typenamespace, name: barename } = parseNamespace(
      parsed.type,
    );
    if (!typenamespace && !(barename in tstypemaps)) {
      if (this.typelist.get()!.has(barename)) {
        parsed.type = `api.${parsed.type}`;
      } else {
        console.error(`${parsed.type} not found`);
      }
    }
    return parsed;
  }

  codegen() {
    const {
      tsfile,
      jsfile,
      filtered,
      typelist,
      typesubs,
      methods,
      types,
    } = this;
    const globals = new Set<string>();
    tsfile.append`// #region "constructors"`;
    tsfile.empty();
    jsfile.append`// #region "constructors"`;
    jsfile.empty();
    for (const [namespace = "api", content] of typelist) {
      if (namespace) {
        tsfile.append`export namespace ${namespace} {`;
        tsfile.indent++;
        jsfile.append`export const ${namespace} = {`;
        jsfile.indent++;
        globals.add(namespace);
      }
      for (const [typename, constructors] of content) {
        tsfile.append`export type ${typename}<`;
        tsfile.indent++;
        tsfile.append`K extends keyof _${typename} = keyof _${typename}`;
        tsfile.indent--;
        tsfile.append`> = ToUnderscore<_${typename}, K>;`;
        tsfile.append`export type _${typename} = {`;
        tsfile.indent++;
        jsfile.append`// type ${typename}`;
        for (const { constructor: { predicate, params } } of constructors) {
          if (params.length == 0) {
            tsfile.append`"${predicate}": {}`;
          } else {
            tsfile.append`"${predicate}": {`;
            tsfile.indent++;
            for (const { name, type } of params) {
              if (type == "#") continue;
              const parsed = this.resolve_global_type(type);
              const decl = generateParamDecl(parsed);
              tsfile.append`${`${name}${decl};`.padEnd(39)} // ${type}`;
            }
            tsfile.indent--;
            tsfile.append`},`;
          }
        }
        tsfile.indent--;
        tsfile.append`};`;
        tsfile.empty();
        for (
          const { name, constructor: { predicate, params } } of constructors
        ) {
          if (params.length == 0) {
            tsfile
              .append`export const ${name}: TLConstructorEmpty<"${predicate}">;`;
            jsfile.append`${name}() {`;
            jsfile.indent++;
            jsfile.append`return { _: "${predicate}" };`;
          } else {
            tsfile
              .append`export const ${name}: TLConstructor<_${typename}, "${predicate}">;`;
            jsfile.append`${name}(params) {`;
            jsfile.indent++;
            jsfile.append`return { ...params, _: "${predicate}" };`;
          }
          jsfile.indent--;
          jsfile.append`},`;
        }
        jsfile.empty();
      }
      tsfile.indent--;
      tsfile.append`}`;
      tsfile.empty();
      jsfile.indent--;
      jsfile.append`};`;
      jsfile.empty();
      for (const [typename, constructors] of content) {
        jsfile.append`// type ${typename}`;
        for (const { constructor: { predicate } } of constructors) {
          const { namespace = "api", name } = parseNamespace(predicate);
          jsfile.append`${namespace ?? "global"}.${name}.ref = "${predicate}";`;
        }
        jsfile.empty();
      }
      if (!namespace) {
        tsfile.append`export default global;`;
        tsfile.empty();
        jsfile.append`export default global;`;
        jsfile.empty();
      }
    }
    tsfile.append`// #endregion "constructors"`;
    tsfile.empty();
    jsfile.append`// #endregion "constructors"`;
    jsfile.empty();

    tsfile.append`export type AnyObject =`;
    tsfile.indent++;
    for (const type of types) {
      const { namespace = "api", name } = parseNamespace(type);
      tsfile.append`| ${namespace}.${name}`;
    }
    tsfile.eat();
    tsfile.writeraw(`;`);
    tsfile.indent--;
    tsfile.empty();

    tsfile
      .append`export const $encoder: Record<string, (this: BaseSerializer, input: AnyObject) => void>;`;
    jsfile.append`export const $encoder = {`;
    jsfile.indent++;
    for (const { predicate, params, id } of filtered) {
      jsfile.append`["${predicate}"](_) {`;
      jsfile.indent++;
      jsfile.append`this.int32(${id});`;
      for (const { name, type } of params) {
        if (type == "#") {
          jsfile.append`this.int32(`;
          jsfile.indent++;
          const flags = params.map(({ name, type }) => ({
            name,
            type: parseParamType(type),
          })).filter(({ type }) => type.flag?.name === name).map((
            { name, type: { flag, vector } },
          ) =>
            vector
              ? `(+(_.${name} != null && _.${name}.length > 0) << ${flag!.pos})`
              : `(+(_.${name} != null) << ${flag!.pos})`
          ).join("\n| ");
          jsfile.append`${flags}`;
          jsfile.indent--;
          jsfile.append`)`;
          continue;
        }
        encodeType(jsfile, name, type);
      }
      jsfile.indent--;
      jsfile.append`},`;
    }
    jsfile.indent--;
    jsfile.append`};`;
    jsfile.empty();

    tsfile
      .append`export const $decoder: Map<number, (this: BaseDeserializer) => AnyObject>;`;
    jsfile.append`export const $decoder = new Map([`;
    jsfile.indent++;
    for (const { predicate, params, id } of filtered) {
      jsfile.append`[${id}, function decode$${
        predicate.replace(".", "__")
      }() {`;
      jsfile.indent++;
      if (params.length == 0) {
        jsfile.append`return { _: "${predicate}" }`;
        jsfile.indent--;
        jsfile.append`}],`;
        continue;
      }
      jsfile.append`const _ = { _: "${predicate}" }`;
      for (const { name, type } of params) {
        if (type == "#") {
          jsfile.append`const ${name} = this.int32();`;
          continue;
        }
        const parsed = this.resolve_global_type(type);
        const decl = generateParamDecl(parsed);
        const comments = `${decl} - ${type}`;
        let base: string | undefined;
        switch (parsed.type) {
          case "true":
          case "bool":
          case "double":
          case "bytes":
          case "string":
          case "int32":
          case "int64":
          case "int128":
          case "int256":
            base = `this.${parsed.type}`;
            break;
          default:
            base = `this.object`;
        }

        if (base == undefined) {
          jsfile.append`// ERROR: ${name}${comments}`;
        } else {
          if (parsed.vector) {
            if (parsed.bare) {
              console.assert(parsed.type == "mt.Message");
              base = `this.vector(${base}, 1538843921)`;
            } else {
              base = `this.vector(${base})`;
            }
          } else {
            base = `${base}()`;
          }
          if (parsed.flag == null) {
            base = `_.${name} = ${base};`;
          } else {
            const cond = `${parsed.flag.name} & ${1 << parsed.flag.pos}`;
            if (parsed.type == "true") {
              console.assert(!parsed.vector);
              base = `if (${cond}) _.${name} = true`;
            } else {
              base = `if (${cond}) _.${name} = ${base}`;
            }
          }
          jsfile.append`${`${base.padEnd(39)}`} // ${comments}`;
        }
      }
      jsfile.append`return _;`;
      jsfile.indent--;
      jsfile.append`}],`;
    }
    jsfile.indent--;
    jsfile.append`]);`;
    jsfile.empty();

    tsfile.append`// #region "method"`;
    tsfile.empty();
    jsfile.append`// #region "method"`;
    jsfile.empty();
    for (const [namespace, methodlist] of methods) {
      if (namespace) {
        tsfile.append`export namespace ${namespace} {`;
        tsfile.indent++;
      }
      if (namespace && !globals.has(namespace)) {
        jsfile.append`export const ${namespace} = {};`;
      }
      for (
        const { name, method: { method: origname, id, params, type } }
          of methodlist
      ) {
        let paramtypestr = "void";
        if (params.length) {
          const paramtype = new DocumentWriter();
          paramtype.append`{`;
          paramtype.indent++;
          for (const { name, type } of params) {
            if (type == "#") continue;
            const parsed = this.resolve_global_type(type);
            const decl = generateParamDecl(parsed);
            paramtype.append`${`${name}${decl}`.padEnd(39)} // ${type}`;
          }
          paramtype.indent--;
          paramtype.append`}`;
          paramtype.eat();
          paramtypestr = paramtype.toString();
        }
        const parsed = this.resolve_global_type(type);
        const decl = !commontypes.includes(parsed.type) &&
            typesubs.get(parsed.type) == null
          ? "unknown"
          : generateMethodReturnType(parsed, namespace);
        if (namespace == "mt") {
          tsfile
            .append`export const ${name}: TLMethod<${paramtypestr}, ${decl}>`;
        } else {
          tsfile
            .append`export const ${name}: TLApiMethod<"${origname}", ${paramtypestr}, ${decl}>`;
        }
        const paramstext = params.length ? "_" : "";
        if (namespace) {
          jsfile
            .append`${namespace}.${name} = function ${name}(${paramstext}) {`;
        } else {
          jsfile.append`export function ${name}(${paramstext}) {`;
        }
        if (namespace != "mt") {
          jsfile.indent++;
          if (params.length) {
            jsfile.append`return { ..._, _: "${origname}" }`;
          } else {
            jsfile.append`return { _: "${origname}" }`;
          }
          jsfile.indent--;
          jsfile.append`}`;
          jsfile.append`$encoder["${origname}"] = function (_) {`;
        }
        jsfile.indent++;
        jsfile.append`this.int32(${id});`;
        for (const { name, type } of params) {
          if (type == "#") {
            jsfile.append`this.int32(`;
            jsfile.indent++;
            const flags = params.map(({ name, type }) => ({
              name,
              type: parseParamType(type),
            })).filter(({ type }) => type.flag?.name === name).map((
              { name, type: { flag, vector } },
            ) =>
              vector
                ? `(+(_.${name} != null && _.${name}.length > 0) << ${
                  flag!.pos
                })`
                : `(+(_.${name} != null) << ${flag!.pos})`
            ).join("\n| ");
            jsfile.append`${flags}`;
            jsfile.indent--;
            jsfile.append`)`;
            continue;
          }
          encodeType(jsfile, name, type);
        }
        jsfile.indent--;
        jsfile.append`};`;

        if (namespace) {
          if (namespace != "mt") {
            jsfile.append`${namespace}.${name}.ref = "${origname}";`;
          }
          jsfile.append`${namespace}.${name}.verify = function($$) {`;
        } else {
          jsfile.append`${name}.ref = "${origname}";`;
          jsfile.append`${name}.verify = function($$) {`;
        }
        jsfile.indent++;
        if (type != "X") {
          let base: string | undefined;
          if (parsed.type == "true") {
            base = "$ === true";
          } else if (parsed.type == "bool") {
            base = `typeof $ == "boolean"`;
          } else if (parsed.type == "int32" || parsed.type == "double") {
            base = `typeof $ == "number"`;
          } else if (parsed.type == "int64") {
            base = `typeof $ == "bigint"`;
          } else if (
            parsed.type == "int128" || parsed.type == "int256" ||
            parsed.type == "bytes"
          ) {
            base = `$ instanceof Uint8Array`;
          } else if (parsed.type == "string") {
            base = `typeof $ == "string"`;
          } else {
            const subs = typesubs.get(parsed.type);
            if (subs) {
              const txt = subs.map((x) => JSON.stringify(x)).join(", ");
              base = `typeof $ == "object" && [${txt}].includes($._)`;
            } else {
              base = `typeof $ == "object"`;
            }
          }
          if (parsed.vector) {
            jsfile
              .append`if (!Array.isArray($$)) throw new TypeError("require array");`;
            jsfile.append`for (const $ of $$)`;
            jsfile.indent++;
            jsfile
              .append`if (!(${base})) throw new TypeError("array element");`;
            jsfile.indent--;
          } else {
            jsfile.append`const $ = $$;`;
            jsfile.append`if (!(${base})) throw new TypeError("element");`;
          }
        }
        jsfile.append`return $$;`;
        jsfile.indent--;
        jsfile.append`};`;
      }
      if (namespace) {
        tsfile.indent--;
        tsfile.append`}`;
      }
      tsfile.empty();
      jsfile.empty();
    }
    tsfile.append`// #endregion "method"`;
    jsfile.append`// #endregion "method"`;
  }
}

const processor = new DefinitionProcessor();

processor.add(mtproto, true);
processor.add(api);

processor.codegen();

await Deno.writeTextFile("gen/api.js", processor.js);
await Deno.writeTextFile("gen/api.d", processor);

// await processDefinition(mtproto, "gen/mtproto.js");
// await processDefinition(api, "gen/api.js");

// console.log(unseen);
