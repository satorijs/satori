import { Binary, Dict, is, isNullable } from 'cosmokit'
import Element from '@cordisjs/element'

export default Element
export * from '@cordisjs/element'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      message: {
        id?: string
        forward?: boolean
        children?: any[]
      }
      quote: {
        id?: string
        name?: string
        avatar?: string
        children?: any[]
      }
      at: {
        id?: string
        name?: string
        avatar?: string
        role?: string
        type?: string
      }
      sharp: {
        id?: string
        name?: string
        avatar?: string
      }
      img: ResourceElement
      audio: ResourceElement
      video: ResourceElement
      file: ResourceElement
    }

    interface ResourceElement {
      [key: string]: any
      src?: string
      title?: string
      width?: string | number
      height?: string | number
      duration?: string | number
      poster?: string
    }
  }
}

declare module '@cordisjs/element' {
  namespace Element {
    export function at(id: any, attrs?: Dict): Element
    export function sharp(id: any, attrs?: Dict): Element
    export function quote(id: any, attrs?: Dict): Element
    export let image: AssetFactory
    export let img: AssetFactory
    export let video: AssetFactory
    export let audio: AssetFactory
    export let file: AssetFactory
    export function i18n(path: string | Dict, children?: any[]): Element
  }
}

type Factory<R extends any[]> = (...args: [...rest: R, attrs?: Dict]) => Element
type AssetFactory = Factory<[data: string] | [data: Binary.Source, type: string]>

function createFactory<R extends any[] = any[]>(type: string, ...keys: string[]): Factory<R> {
  return (...args: any[]) => {
    const element = Element(type)
    keys.forEach((key, index) => {
      if (!isNullable(args[index])) {
        element.attrs[key] = args[index]
      }
    })
    if (args[keys.length]) {
      Object.assign(element.attrs, args[keys.length])
    }
    return element
  }
}

function createAssetFactory(type: string): AssetFactory {
  return (src, ...args) => {
    let prefix = 'base64://'
    if (typeof args[0] === 'string') {
      prefix = `data:${args.shift()};base64,`
    }
    if (is('Buffer', src)) {
      src = prefix + src.toString('base64')
    } else if (is('ArrayBuffer', src)) {
      src = prefix + Binary.toBase64(src)
    } else if (ArrayBuffer.isView(src)) {
      src = prefix + Binary.toBase64(src.buffer)
    }
    return Element(type, { ...args[0] as {}, src })
  }
}

Element.at = createFactory<[id: any]>('at', 'id')
Element.sharp = createFactory<[id: any]>('sharp', 'id')
Element.quote = createFactory<[id: any]>('quote', 'id')
Element.image = createAssetFactory('img')
Element.img = createAssetFactory('img')
Element.video = createAssetFactory('video')
Element.audio = createAssetFactory('audio')
Element.file = createAssetFactory('file')

Element.i18n = function i18n(path: string | Dict, children?: any[]) {
  return Element('i18n', typeof path === 'string' ? { path } : path, children)
}
