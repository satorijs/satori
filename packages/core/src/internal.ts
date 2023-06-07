import { Awaitable, defineProperty } from 'cosmokit'
import { Context, Session } from '.'
import segment from '@satorijs/element'

declare module '.' {
  interface Context {
    internal: Internal
    component(name: string, component: Component, options?: Component.Options): () => boolean
  }
}

export type Component = segment.Render<Awaitable<segment.Fragment>, Session>

export namespace Component {
  export interface Options {
    session?: boolean
  }
}

export class Internal {
  static readonly methods = ['component']

  public counter = 0

  constructor(private root: Context) {
    defineProperty(this, Context.current, root)
  }

  protected get caller() {
    return this[Context.current] as Context
  }

  component(name: string, component: Component, options: Component.Options = {}) {
    const render: Component = async (attrs, children, session) => {
      if (options.session && session.type === 'send') {
        throw new Error('interactive components is not available outside sessions')
      }
      const result = await component(attrs, children, session)
      return session.transform(segment.normalize(result))
    }
    const ctx = this.caller
    const service = 'component:' + name
    Context.service(service)
    ctx[service] = render
    return ctx.collect('component', () => {
      ctx[service] = null
      return true
    })
  }
}
