/**
 * Types for the Telegram client library.
 *
 * @module
 */

import type RPC from "./rpc/mod";
import type { MTStorage } from "./storage/types";
import type { ToUnderscore } from "./tl/types";

/**
 * Event emitted by transport.
 * @template K event name.
 */
export type TransportEvents = {
  /**
   * Error occurred while processing request.
   * @prop code error code.
   */
  error: { code: number };
  /**
   * Incoming data from the peer.
   * @prop data received data.
   */
  message: { data: Uint8Array };
};

/**
 * Event emitted by transport.
 * @template K event name.
 */
export type TransportEvent<
  K extends keyof TransportEvents = keyof TransportEvents,
> = ToUnderscore<TransportEvents, K>;

/**
 * Transport interface.
 */
export interface Transport {
  /**
   * Close the connection.
   */
  close(): void;
  /**
   * Send data to the peer.
   * @param packet data to send.
   */
  send(packet: Uint8Array): Promise<void>;
  /**
   * Get an async iterator over transport events.
   * The iterator will yield an event object with a single key that
   * corresponds to the event type, and the value being the event payload.
   * The iterator will stop when the connection is closed.
   */
  [Symbol.asyncIterator](): AsyncIterator<TransportEvent>;
}

/**
 * An abstract interface which when implemented provides an interface to read
 * bytes into an array buffer asynchronously.
 *
 * @category I/O */
interface Reader {
  /** Reads up to `p.byteLength` bytes into `p`. It resolves to the number of
   * bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
   * encountered. Even if `read()` resolves to `n` < `p.byteLength`, it may
   * use all of `p` as scratch space during the call. If some data is
   * available but not `p.byteLength` bytes, `read()` conventionally resolves
   * to what is available instead of waiting for more.
   *
   * When `read()` encounters end-of-file condition, it resolves to EOF
   * (`null`).
   *
   * When `read()` encounters an error, it rejects with an error.
   *
   * Callers should always process the `n` > `0` bytes returned before
   * considering the EOF (`null`). Doing so correctly handles I/O errors that
   * happen after reading some bytes and also both of the allowed EOF
   * behaviors.
   *
   * Implementations should not retain a reference to `p`.
   */
  read(p: Uint8Array): Promise<number | null>;
}

/**
 * Codec for encoding/decoding packets.
 */
export interface PacketCodec {
  /**
   * Initial packet, if any.
   * If present, it will be sent to the peer as the first packet.
   */
  readonly init?: Uint8Array;
  /**
   * Obfuscate tag, used by obfuscated codec, and used for distinguish
   * between different upper codec type.
   */
  readonly obfuscate_tag?: Uint8Array;
  /**
   * Is this codec already obfuscated?
   * If true, it means that the upper layer has already applied
   * obfuscation, so the PacketCodec should not do it again.
   */
  readonly obfuscated?: true;
  /**
   * Encode a packet into a series of packets.
   * @param data the packet to encode.
   * @returns an iterable of the encoded packets.
   */
  encode_packet(data: Uint8Array): Iterable<Uint8Array>;
  /**
   * Decode packets from a reader.
   * @param reader the reader to read from.
   * @returns an async iterable of the decoded packets.
   */
  read_packet(reader: Reader): AsyncIterable<Uint8Array>;
}

/**
 * Factory function for creating a transport.
 *
 * @param info connection information
 * @returns a promise resolving to a transport
 */
export type TransportFactory = (
  info: InitDC,
) => Promise<Transport>;

/**
 * Connection information used to establish a connection.
 */
export interface InitDC {
  /**
   * Whether to use test DC or production DC.
   */
  test: boolean;
  /**
   * DC index of the data center to connect to.
   */
  id: number;
  /**
   * IP address of the data center to connect to.
   */
  ip: string;
  /**
   * Port number of the data center to connect to.
   */
  port: number;
}

/**
 * Information about the environment the client is running in.
 */
export interface EnvironmentInformation {
  /**
   * Model of the device the client is running on.
   */
  device_model: string;
  /**
   * Version of the operating system the client is running on.
   */
  system_version: string;
  /**
   * Version of the application the client is running.
   */
  app_version: string;
}

/**
 * Specifies how the client should connect to the server.
 *
 * - "ipv4" - Prefer IPv4 connections.
 * - "ipv6" - Prefer IPv6 connections.
 * - "both" - No preference.
 */
export type IPv6Policy = "ipv4" | "ipv6" | "both";

/**
 * Options for {@link MTProto} constructor.
 */
export interface MTProtoOptions {
  /**
   * Telegram API ID.
   */
  api_id: number;
  /**
   * Telegram API hash.
   */
  api_hash: string;

  /**
   * Information about the environment the client is running in.
   */
  environment: EnvironmentInformation;
  /**
   * Initial DC identifier to connect to. If not specified, client will use
   * {test: true, id: 1, ip: "149.154.175.10", port: 443}.
   */
  initdc?: InitDC;
  /**
   * Factory function that creates a transport to use for MTProto connections.
   *
   * This function will be called each time a new connection is established
   * to a different DC.
   */
  transport_factory: TransportFactory;
  /**
   * Storage to use for auth key and other data.
   *
   * If not specified, client will use {@link KVStorageAdapter}.
   */
  storage?: MTStorage;
  /**
   * Specifies how the client should connect to the server.
   *
   * - "ipv4" - Prefer IPv4 connections.
   * - "ipv6" - Prefer IPv6 connections.
   * - "both" - No preference.
   */
  ipv6_policy?: IPv6Policy;
  /**
   * Optional function to setup RPC instance before it is used for the first
   * time.
   *
   * This function will be called just once, right after creating a new RPC
   * instance.
   *
   * @param rpc RPC instance to setup.
   */
  setup_rpc?: (rpc: RPC) => void;
}
