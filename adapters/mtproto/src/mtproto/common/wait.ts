import type EventEmitter from "./event";
import Resolver from "./resolver";

type WaitInterface<S> = {
  cancel(): void;
  done(s: S): void;
};

export class WaitToken<T> {
  readonly wait: Promise<T>;
  #done = false;

  constructor(
    private resolver: Resolver<T>,
    private handler: WaitInterface<WaitToken<T>>,
  ) {
    this.wait = resolver.promise.then((x) => {
      this.#done = true;
      handler.done(this);
      return x;
    });
  }

  cancel(e?: any) {
    if (this.#done) return;
    this.#done = true;
    this.handler.cancel();
    this.resolver.reject(e);
  }
}

export class WaitManager {
  #tokens = new Set<WaitToken<any>>();

  cancel(e?: any) {
    for (const token of this.#tokens) token.cancel(e);
    this.#tokens.clear();
  }

  #enqueue<T>(resolver: Resolver<T>, cancel: () => void) {
    const token = new WaitToken<T>(resolver, { cancel, done: this.#done });
    this.#tokens.add(token);
    return token;
  }

  #done = (token: WaitToken<any>) => this.#tokens.delete(token);

  timer(time: number) {
    const resolver = new Resolver<void>();
    const handler = setTimeout(resolver.resolve, time);
    return this.#enqueue(resolver, () => clearTimeout(handler));
  }

  wait_event<X, K extends keyof X>(
    emitter: EventEmitter<X>,
    event: K,
  ): WaitToken<X[K]> {
    const resolver = new Resolver<X[K]>();
    emitter.once(event, resolver.resolve);
    return this.#enqueue(resolver, () => emitter.off(event, resolver.resolve));
  }
}
