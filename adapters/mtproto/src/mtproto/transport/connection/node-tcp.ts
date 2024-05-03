/**
 * Node.js TCP transport adapter
 *
 * @module
 */

import { todv } from "../../common/utils";
import {
  PacketCodec,
  Transport,
  TransportEvent,
  TransportEvents,
  TransportFactory,
} from "../../types";
import net from 'net';

/**
 * TCP transport using Node.js net.Socket
 */
export class NodeJSTCP implements Transport {
  #closed = false;
  #socket: net.Socket;
  #codec: PacketCodec;
  init?: Promise<any>;

  constructor(socket: net.Socket, codec: PacketCodec) {
    this.#socket = socket;
    this.#codec = codec;
    if (codec.init) this.init = new Promise((resolve) => {
      this.#socket.write(codec.init, () => {
        resolve(void 0);
      });
    });
  }

  async send(packet: Uint8Array): Promise<void> {
    try {
      for (const piece of this.#codec.encode_packet(packet)) {
        await new Promise((resolve) => {
          this.#socket.write(piece, () => {
            resolve(void 0);
          });
        });
      }
    } catch (e) {
      if (e instanceof Error && this.#closed) {
        return;
      }
      throw e;
    }
  }

  async *[Symbol.asyncIterator](): AsyncIterator<
    TransportEvent<keyof TransportEvents>
  > {
    try {
      const socket = this.#socket
      for await (const piece of this.#codec.read_packet({
        read(p) {
          return new Promise((resolve) => {
            socket.read(p.length);
            socket.once("data", (data) => {
              p.set(data.subarray(0, p.length));
              resolve(data.length);
            });
          });
        },
      })) {
        if (piece.length == 4) {
          const code = Math.abs(todv(piece).getInt32(0, true));
          yield { _: "error", code };
        } else {
          yield { _: "message", data: piece };
        }
      }
    } catch (e) {
      if ((e instanceof Error) && this.#closed) {
        return;
      }
      console.error(e);
      throw e;
    }
  }

  close(): void {
    if (this.#closed) return;
    this.#closed = true;
    this.#socket.end();
  }
}

export default function createFactory(
  codec: () => PacketCodec,
): TransportFactory {
  return async ({ ip, port }) => {
    const socket = net.connect(port, ip);
    try {
      const transport = new NodeJSTCP(socket, codec());
      await transport.init;
      return transport;
    } catch (e) {
      socket.end();
      throw e;
    }
  };
}
