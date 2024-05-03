export default class MultiMap<K, V> {
  #map = new Map<K, Set<V>>();

  #get(key: K): Set<V> {
    let ret = this.#map.get(key);
    if (ret == null) {
      this.#map.set(key, ret = new Set());
    }
    return ret;
  }

  has(key: K): boolean {
    return this.#map.has(key);
  }

  add(key: K, value: V) {
    this.#get(key).add(value);
  }

  del(key: K, value: V) {
    this.#map.get(key)?.delete(value);
  }

  del_all(key: K) {
    this.#map.delete(key);
  }

  get(key: K) {
    return this.#get(key);
  }

  [Symbol.iterator]() {
    return this.#map.entries();
  }
}
