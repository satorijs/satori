/**
 * Abridged codec.
 *
 * See https://core.telegram.org/mtproto/mtproto-transports#abridged
 * @module
 */

import { concat_array, view_arr } from "../../common/utils";
import type { PacketCodec } from "../../types";

const init: Uint8Array = new Uint8Array([0xef]);
const obfuscate_tag: Uint8Array = new Uint8Array([0xef, 0xef, 0xef, 0xef]);

/**
 * Abridged codec.
 *
 * This codec omits the length prefix from the packets, instead sending
 * packets with a single byte that is equal to the number of words in the
 * packet (i.e. the length divided by 4). If the length is greater than
 * 127, it sends the length using three bytes.
 *
 * The codec sends a special "init" packet with a single byte set to 0xef.
 *
 * @implements {PacketCodec}
 */
export default class Abridged implements PacketCodec {
  init = init;
  obfuscate_tag = obfuscate_tag;
  #lengthbuf = new Uint8Array(4);

  *encode_packet(data: Uint8Array): Iterable<Uint8Array> {
    const length = data.length >> 2;
    if (length < 127) {
      this.#lengthbuf[0] = length;
      yield view_arr(this.#lengthbuf, 0, 1);
    } else {
      this.#lengthbuf[0] = 0x7f;
      this.#lengthbuf[1] = length;
      this.#lengthbuf[2] = length >> 8;
      this.#lengthbuf[3] = length >> 16;
      yield this.#lengthbuf;
    }
    yield data;
  }
  async *read_packet(reader: Deno.Reader): AsyncIterable<Uint8Array> {
    let stream = new Uint8Array();
    const temp = new Uint8Array(4096);
    let res: number | null = null;

    while ((res = await reader.read(temp)) != null) {
      stream = concat_array(
        stream,
        temp.subarray(0, res),
      );
      while (stream.length > 1) {
        let len = stream[0];
        let header = 1;
        if (len >= 127) {
          if (stream.length < 4) break;
          len = stream[1];
          len |= stream[2] << 8;
          len |= stream[3] << 16;
          header = 4;
        }
        len <<= 2;
        if (len > stream.length - header) break;
        yield view_arr(stream, header, len);
        stream = stream.subarray(header + len);
      }
    }
  }
}
