import { $decoder } from "../gen/api.js";
import type { BaseDeserializer } from "../tl/types";
import { sha1, tobig, todv, tou8, view_arr } from "../common/utils";

export class Deserializer implements BaseDeserializer {
  #buffer: Uint8Array;
  #view: DataView;
  #offset = 0;

  constructor(buffer: BufferSource) {
    this.#buffer = tou8(buffer);
    this.#view = todv(buffer);
  }

  get offset() {
    return this.#offset;
  }

  get remain() {
    return this.#buffer.subarray(this.#offset);
  }

  true(): true {
    return true;
  }
  bool(): boolean {
    const value = this.#view.getInt32(this.#offset, true);
    this.#offset += 4;
    if (value == -1_720_552_011) return true;
    if (value == -1_132_882_121) return false;
    throw new Error(`expected bool, bot got ${value}`);
  }
  uint32(): number {
    const value = this.#view.getUint32(this.#offset, true);
    this.#offset += 4;
    return value;
  }
  int32(): number {
    const value = this.#view.getInt32(this.#offset, true);
    this.#offset += 4;
    return value;
  }
  int64(): bigint {
    const value = this.#view.getBigUint64(this.#offset, true);
    this.#offset += 8;
    return value;
  }
  int128(): Uint8Array {
    const value = view_arr(this.#buffer, this.#offset, 16);
    this.#offset += 16;
    return value;
  }
  int256(): Uint8Array {
    const value = view_arr(this.#buffer, this.#offset, 32);
    this.#offset += 32;
    return value;
  }
  double(): number {
    const value = this.#view.getFloat64(this.#offset, true);
    this.#offset += 8;
    return value;
  }
  bytes(): Uint8Array {
    let length = this.#buffer[this.#offset++];
    if (length === 254) {
      length = this.#buffer[this.#offset++] |
        (this.#buffer[this.#offset++] << 8) |
        (this.#buffer[this.#offset++] << 16);
    }
    const bytes = view_arr(this.#buffer, this.#offset, length);
    this.#offset += length;
    const lost = this.#offset % 4;
    if (lost) this.#offset += 4 - lost;
    return bytes;
  }
  string(): string {
    return new TextDecoder().decode(this.bytes());
  }
  vector<T = any>(fn: (this: BaseDeserializer) => T): T[];
  vector<T = any>(
    fn: (this: BaseDeserializer, id: number) => T,
    id: number,
  ): T[];
  vector(fn: any, id?: any): any[] {
    if (id == null) {
      const vid = this.int32();
      if (vid != 481_674_261) {
        throw new Error(`expected vector(481674261) but got ${vid}`);
      }
    }
    const length = this.int32();
    const result: any[] = [];
    if (id == null) {
      for (let i = 0; i < length; i++) {
        result.push(fn.call(this));
      }
    } else {
      for (let i = 0; i < length; i++) {
        result.push(fn.call(this, id));
      }
    }
    return result;
  }
  object<T = any>(id: number = this.int32()): T {
    if (id == -1_132_882_121) return false as any;
    if (id == -1_720_552_011) return true as any;
    const fn = $decoder.get(id);
    if (fn == null) {
      const filename = `diag_${tobig(sha1(this.#buffer))}.bin`;
      console.warn(`${filename}:${this.#offset} generated`);
      Deno.writeFileSync(filename, this.#buffer);
      throw new Error(`unknown tag ${id}`);
    }
    return fn.call(this) as unknown as T;
  }
}

export function deserialize<T = any>(buffer: BufferSource) {
  return new Deserializer(buffer).object<T>();
}
