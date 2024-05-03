import Resolver from "./resolver";

export interface Task<T, R = void> {
  data: T;
  resolver: Resolver<R>;
}

export default class TaskQueue<T, R = void> {
  #tasks: Task<T, R>[] = [];
  #process: (input: T) => Promise<R>;
  #blocked = true;
  wait?: Promise<void>;

  constructor(process: (input: T) => Promise<R>) {
    this.#process = process;
  }

  unblock() {
    if (!this.#blocked) return;
    this.#blocked = false;
    if (!this.wait && this.#tasks.length) {
      this.wait = this.#runner();
    }
  }

  async #runner() {
    while (this.#tasks.length > 0 && !this.#blocked) {
      const { data, resolver } = this.#tasks.shift()!;
      await this.#process(data).then(resolver.resolve, resolver.reject);
    }
    delete this.wait;
  }

  stop(e: any = new Error("stop queue")) {
    if (this.#blocked) return;
    this.#blocked = true;
    this.#tasks.forEach(({ resolver }) => resolver.reject(e));
    this.#tasks.length = 0;
  }

  enqueue(data: T) {
    const resolver = new Resolver<R>();
    this.#tasks.push({ data, resolver });
    if (!this.#blocked && !this.wait) this.wait = this.#runner();
    return resolver.promise;
  }
}
