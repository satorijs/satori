import { todv } from "../common/utils";
import { $encoder } from "../gen/api.js";
import type { BaseSerializer, GenericObject } from "../tl/types";

class Counter implements BaseSerializer {
  #count = 0;
  true(_value: true): void {
  }
  bool(_value: boolean): void {
    this.#count += 4;
  }
  uint32(_value: number): void {
    this.#count += 4;
  }
  int32(_value: number): void {
    this.#count += 4;
  }
  int64(_value: bigint): void {
    this.#count += 8;
  }
  int128(_value: Uint8Array): void {
    this.#count += 16;
  }
  int256(_value: Uint8Array): void {
    this.#count += 32;
  }
  double(_value: number): void {
    this.#count += 8;
  }
  bytes(value: Uint8Array): void {
    const length = value.byteLength;

    this.#count += length <= 253 ? 1 : 4;

    this.#count += length;
    const lost = this.#count % 4;
    if (lost) this.#count += 4 - lost;
  }
  string(value: string): void {
    const bytes = new TextEncoder().encode(value);
    this.bytes(bytes);
  }
  raw(value: Uint8Array): void {
    this.#count += value.byteLength;
  }
  vector<T>(
    value: T[],
    fn: (this: BaseSerializer, value: T) => void,
  ): void {
    this.#count += 8;
    for (const item of value) fn.call(this, item);
  }
  object(value: GenericObject): void {
    const fn = $encoder[value._];
    fn.call(this, value as any);
  }

  get count() {
    return this.#count;
  }
}

export class Serializer implements BaseSerializer {
  #data: Uint8Array;
  #view: DataView;
  #offset = 0;
  out: any;

  constructor(
    fn: (this: BaseSerializer, ...params: any) => any,
    ...params: any
  ) {
    // @ts-ignore: fix ref
    if (fn.ref in $encoder) fn = $encoder[fn.ref];
    const counter = new Counter();
    fn.call(counter, ...params);
    this.#data = new Uint8Array(counter.count);
    this.#view = todv(this.#data);
    this.out = fn.call(this, ...params);
    console.assert(this.#offset == this.#data.byteLength);
  }

  get data() {
    return this.#data;
  }

  true(_: true): void {
  }
  bool(value: boolean): void {
    if (value) {
      this.int32(-1_720_552_011);
    } else {
      this.int32(-1_132_882_121);
    }
  }
  uint32(value: number): void {
    this.#view.setUint32(this.#offset, value, true);
    this.#offset += 4;
  }
  int32(value: number): void {
    this.#view.setInt32(this.#offset, value, true);
    this.#offset += 4;
  }
  int64(value: bigint): void {
    this.#view.setBigUint64(this.#offset, value, true);
    this.#offset += 8;
  }
  int128(value: Uint8Array): void {
    console.assert(value.length == 16, "int128 should has length = 16");
    this.#data.set(value, this.#offset);
    this.#offset += 16;
  }
  int256(value: Uint8Array): void {
    console.assert(value.length == 32, "int256 should has length = 32");
    this.#data.set(value, this.#offset);
    this.#offset += 32;
  }
  double(value: number): void {
    this.#view.setFloat64(this.#offset, value, true);
    this.#offset += 4;
  }
  bytes(u8: Uint8Array): void {
    const length = u8.length;
    if (length <= 253) {
      this.#data[this.#offset++] = length;
    } else {
      this.#data[this.#offset++] = 254;
      this.#data[this.#offset++] = length >> 0;
      this.#data[this.#offset++] = length >> 8;
      this.#data[this.#offset++] = length >> 16;
    }

    this.#data.set(u8, this.#offset);
    this.#offset += length;
    const lost = this.#offset % 4;
    if (lost) this.#offset += 4 - lost;
  }
  string(value: string): void {
    this.bytes(new TextEncoder().encode(value));
  }
  raw(u8: Uint8Array): void {
    this.#data.set(u8, this.#offset);
    this.#offset += u8.length;
  }
  vector<T>(
    value: T[],
    fn: (this: BaseSerializer, value: T) => void,
  ): void {
    this.int32(0x1c_b5_c4_15);
    this.int32(value.length);
    for (const item of value) fn.call(this, item);
  }
  object(value: GenericObject): void {
    const fn = $encoder[value._];
    fn.call(this, value as any);
  }
}

export function serialize<Params extends any[]>(
  fn: (this: BaseSerializer, ...params: Params) => void,
  ...params: Params
) {
  const serializer = new Serializer(fn, ...params);
  return serializer.data;
}
