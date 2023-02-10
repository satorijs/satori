import { Awaitable, Dict, defineProperty } from 'cosmokit'
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
  public transformers: Dict<Component> = Object.create(null)

  constructor(private app: Context) {
    defineProperty(this, Context.current, app)
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
    this.transformers[name] = render
    return this.caller.collect('component', () => {
      const shouldDelete = this.transformers[name] === render
      if (shouldDelete) delete this.transformers[name]
      return shouldDelete
    })
  }
}
