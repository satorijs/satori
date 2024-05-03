const crc_table = new Uint32Array(256);

for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  }
  crc_table[i] = c;
}

export class Crc32 {
  #value = -1;
  update(bytes: Uint8Array) {
    for (const byte of bytes) {
      this.#value = (this.#value >>> 8) ^
        crc_table[(this.#value ^ byte) & 0xFF];
    }
  }
  get value() {
    return ~this.#value >>> 0;
  }
}

export default function crc32(...arrays: Uint8Array[]) {
  const ins = new Crc32();
  for (const array of arrays) {
    ins.update(array);
  }
  return ins.value;
}
