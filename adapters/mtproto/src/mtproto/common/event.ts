// deno-lint-ignore-file ban-types
import MultiMap from "./multimap";

export default interface EventEmitter<T> {
  _emitter_sig: T;
}

export default class EventEmitter<T> {
  #handlers = new MultiMap<keyof T, Function>();
  #once = new WeakSet<Function>();
  #hooks = new Set<Function>();

  emit<K extends keyof T>(event: K, argument: T[K]) {
    for (const hook of this.#hooks) {
      hook(event, argument);
    }
    const set = this.#handlers.get(event);
    for (const receiver of set) {
      receiver(argument);
      if (this.#once.has(receiver)) {
        set.delete(receiver);
      }
    }
  }

  on<K extends keyof T>(event: K, fn: (input: T[K]) => void) {
    this.#handlers.add(event, fn);
  }

  once<K extends keyof T>(event: K, fn: (input: T[K]) => void) {
    this.#handlers.add(event, fn);
    this.#once.add(fn);
  }

  off<K extends keyof T>(event: K, fn: (input: T[K]) => void) {
    this.#handlers.del(event, fn);
  }

  hook(fn: Function) {
    this.#hooks.add(fn);
  }

  unhook(fn: Function) {
    this.#hooks.delete(fn);
  }
}
