/**
 * Module containing type definitions for storage adapters.
 *
 * Storage adapters are used to store data between Telegram client
 * sessions. This can be useful to persist AuthKey, message IDs,
 * etc.
 *
 * Any storage adapter must implement the `MTStorage` interface.
 *
 * This module also exports a `KVStorageAdapter` which is a simple
 * wrapper around the browser's `localStorage` or `Deno.env` on other
 * platforms.
 *
 * @module
 */

import { type DCInfo, toDCIdentifier } from "../common/dc";
import type { ToUnderscore } from "../common/magic";

type StorageKinds = {
  // deno-lint-ignore ban-types
  global: {};
  dc: DCInfo;
};

/**
 * Kind of storage.
 *
 * Used to address specific type of storage. Can be either global or per data
 * center.
 */
export type StorageKind<
  K extends keyof StorageKinds = keyof StorageKinds,
> = ToUnderscore<StorageKinds, K>;

/**
 * Interface for Key-Value storage.
 *
 * Provides operations for getting, setting and deleting values by key. Also
 * implements iterator to iterate over all keys and values in the storage.
 */
export interface KVStorage {
  get(key: string): string | undefined;
  set(key: string, value: string): void;
  delete(key: string): void;
  [Symbol.iterator](): IterableIterator<[string, string]>;
}

/**
 * Storage interface for mtproto
 */
export interface MTStorage {
  get(kind: StorageKind): KVStorage;
  reset(kind: StorageKind): void;
}

/**
 * Serialize StorageKind to string.
 *
 * Converts StorageKind to a string that can be used as a prefix for keys in
 * a key-value storage. The result is an empty string for global storage and
 * a data center identifier for per-data-center storage.
 *
 * @param kind StorageKind to serialize
 * @returns string prefix for keys
 */
export function serialize_storage_kind(kind: StorageKind): string {
  if (kind._ == "global") return "";
  return toDCIdentifier(kind);
}
