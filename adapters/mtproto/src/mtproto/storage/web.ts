/**
 * Module for Web Storage API-based storage.
 *
 * This module provides an implementation of MTStorage using
 * Web Storage API as backend. This is the default storage used
 * by the library if none is provided.
 *
 * The Web Storage API is a simple key-value storage API provided
 * by the browser. It is backed by localStorage or sessionStorage
 * depending on how it is used.
 *
 * @module
 */

import KVStorageAdapter from "./kv";
import type { MTStorage } from "./types";

/**
 * WebStorageAdapter implements MTStorage using Web Storage API as backend.
 */
export default class WebStorageAdapter extends KVStorageAdapter
  implements MTStorage {
  constructor(storage: Storage = localStorage) {
    super({
      get(key) {
        return storage.getItem(key) ?? undefined;
      },
      set(key, value) {
        storage.setItem(key, value);
      },
      delete(key) {
        storage.removeItem(key);
      },
      *[Symbol.iterator]() {
        for (const k in localStorage) yield [k, storage.getItem(k)!];
      },
    });
  }
}
