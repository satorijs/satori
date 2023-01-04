import { Awaitable, Dict, defineProperty } from 'cosmokit'
import { Fragment, Render } from '@satorijs/element'
import { Context, Session } from '.'

declare module '.' {
  interface Context {
    internal: Internal
    component(name: string, component: Component, options?: Component.Options): () => boolean
  }
}

export type Component = Render<Awaitable<Fragment>, Session>

export namespace Component {
  export interface Options {
    session?: boolean
    passive?: boolean
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
      if (!options.passive) {
        children = await session.transform(children)
      }
      return component(attrs, children, session)
    }
    this.transformers[name] = render
    return this.caller.collect('component', () => {
      const shouldDelete = this.transformers[name] === render
      if (shouldDelete) delete this.transformers[name]
      return shouldDelete
    })
  }
}
