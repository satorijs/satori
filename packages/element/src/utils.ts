type Global = NodeJS.Global & Window & typeof globalThis

type GlobalClass = {
  [K in keyof Global]: Global[K] extends new (...args: any[]) => infer T ? T : never
}

const root: any = typeof self !== 'undefined' ? self : global

export function isType<K extends keyof GlobalClass>(type: K, value: any): value is GlobalClass[K] {
  return type in root && value instanceof root[type]
    || Object.prototype.toString.call(value).slice(8, -1) === type
}
