/**
 * Intermediate codec.
 *
 * See https://core.telegram.org/mtproto/mtproto-transports#intermediate
 * @module
 */

import { concat_array, todv, view_arr } from "../../common/utils";
import type { PacketCodec } from "../../types";

const init: Uint8Array = new Uint8Array([0xee, 0xee, 0xee, 0xee]);

/**
 * Intermediate codec.
 *
 * This codec sends a length prefix for each packet, followed by the data.
 * The length prefix is a big-endian 32-bit integer.
 *
 * @implements {PacketCodec}
 */
export default class Intermediate implements PacketCodec {
  init = init;
  obfuscate_tag = init;
  #lengthbuf = new Uint8Array(4);
  #lengthdv = todv(this.#lengthbuf);

  *encode_packet(data: Uint8Array): Iterable<Uint8Array> {
    this.#lengthdv.setInt32(0, data.length, true);
    yield this.#lengthbuf;
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
      while (stream.length >= 8) {
        const dataView = todv(stream);
        const payloadLength = dataView.getUint32(0, true);
        if (payloadLength > stream.length - 4) break;
        yield view_arr(stream, 4, payloadLength);
        stream = stream.subarray(payloadLength + 4);
      }
    }
  }
}
