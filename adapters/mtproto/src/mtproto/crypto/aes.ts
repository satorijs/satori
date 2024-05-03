// @deno-types="../vendor/aes-js.d"
import aesjs from "../vendor/aes-js.js";

import { tou8, view_arr, xor_array } from "../common/utils";

export class IGE {
  #aes: aesjs.AES;
  #ivp: Uint8Array;
  #iv2p: Uint8Array;

  constructor(key: Uint8Array, iv: Uint8Array) {
    this.#aes = new aesjs.AES(key);
    this.#ivp = iv.subarray(0, 16);
    this.#iv2p = view_arr(iv, 16, 16);
  }

  encrypt(plaintext: Uint8Array) {
    const ciphertext = new Uint8Array(plaintext.length);
    let block = new Uint8Array(16);

    for (let i = 0; i < plaintext.length; i += 16) {
      const nextIv2p = view_arr(plaintext, i, 16);

      block.set(nextIv2p);
      xor_array(block, this.#ivp);
      block = this.#aes.encrypt(block) as Uint8Array;
      xor_array(block, this.#iv2p);
      ciphertext.set(block, i);

      this.#ivp = view_arr(ciphertext, i, 16);
      this.#iv2p = nextIv2p;
    }

    return ciphertext;
  }

  decrypt(ciphertext: Uint8Array) {
    const plaintext = new Uint8Array(ciphertext.length);
    let block = new Uint8Array(16);

    for (let i = 0; i < ciphertext.length; i += 16) {
      const nextIvp = view_arr(ciphertext, i, 16);

      block.set(nextIvp);
      xor_array(block, this.#iv2p);
      // @ts-ignore: external types
      block = this.#aes.decrypt(block) as Uint8Array;
      xor_array(block, this.#ivp);
      plaintext.set(block, i);

      this.#ivp = nextIvp;
      this.#iv2p = view_arr(plaintext, i, 16);
    }

    return plaintext;
  }
}

export class CTR {
  #internal: aesjs.ModeOfOperation.ModeOfOperationCTR;
  constructor(key: Uint8Array, iv: Uint8Array) {
    this.#internal = new aesjs.ModeOfOperation.ctr(
      key,
      new aesjs.Counter(iv),
    );
  }

  encrypt(data: BufferSource) {
    return this.#internal.encrypt(tou8(data));
  }

  decrypt(data: BufferSource) {
    return this.#internal.decrypt(tou8(data));
  }
}
