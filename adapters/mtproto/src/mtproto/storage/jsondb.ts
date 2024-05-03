import { debounce } from "../common/debounce";
import {
  KVStorage,
  MTStorage,
  serialize_storage_kind,
  StorageKind,
} from "./types";
import fs from 'fs';

class JsonKV extends Map<string, string> implements KVStorage {
  constructor(private update: () => void, source?: Iterable<[string, string]>) {
    super(source);
  }

  set(key: string, value: string): this {
    super.set(key, value);
    this.update?.();
    return this;
  }

  delete(key: string): boolean {
    const ret = super.delete(key);
    if (ret) {
      this.update?.();
    }
    return ret;
  }
}

export default class JsonDBAdapter implements MTStorage {
  data: Map<string, JsonKV> = new Map();

  constructor(public name: string) {
    try {
      const content = fs.readFileSync(name, 'utf-8');
      const obj = JSON.parse(content) as Record<string, Record<string, string>>;
      for (const [type, kv] of Object.entries(obj)) {
        this.data.set(type, new JsonKV(this.sync, Object.entries(kv)));
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        fs.writeFileSync(name, "{}");
        return;
      }
      throw e;
    }
  }

  readonly sync: () => void = debounce(() => {
    const json: Record<string, Record<string, string>> = Object.fromEntries(
      [...this.data.entries()].map(([k, v]) => [k, Object.fromEntries(v.entries())]),
    );
    const text = JSON.stringify(json);
    fs.writeFileSync(this.name, text);
  }, 500);

  get(kind: StorageKind): KVStorage {
    const key = serialize_storage_kind(kind);
    let ret = this.data.get(key);
    if (!ret) {
      ret = new JsonKV(this.sync);
      this.data.set(key, ret);
      this.sync();
    }
    return ret;
  }

  reset(kind: StorageKind): void {
    const key = serialize_storage_kind(kind);
    if (this.data.delete(key)) this.sync();
  }
}
