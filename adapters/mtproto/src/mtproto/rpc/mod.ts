/**
 * Module for rpc transport layer.
 *
 * This layer is responsible for serializing and deserializing rpc messages,
 * and sending them through a transport layer. This layer also handles
 * gzipping and encryption of messages.
 *
 * This module is responsible for handling the rpc protocol, and abstracting
 * away details like gzipping and encryption from the higher layers.
 *
 * @module
 */

import { max } from "../common/alg";
import { decodeBase64, encodeBase64 } from "../common/base64";
import cached from "../common/cached";
import type { DCIdentifier } from "../common/dc";
import EventEmitter from "../common/event";
import { decompressObject } from "../common/gzip";
import type { FilteredKeys } from "../common/magic";
import TaskQueue from "../common/queue";
import Resolver from "../common/resolver";
import {
  concat_array,
  eq_array,
  frombig,
  rand_array,
  rand_bigint,
  rand_int,
  sha1,
  sha256,
  view_arr,
} from "../common/utils";
import * as aes from "../crypto/aes";
import * as apiset from "../gen/api.js";
import {
  type api,
  initConnection,
  invokeWithLayer,
  invokeWithoutUpdates,
  mt,
} from "../gen/api.js";
import authorize from "../rpc/authorizor";
import type { KVStorage } from "../storage/types";
import { Deserializer } from "../tl/deserializer";
import { serialize } from "../tl/serializer";
import type { TLApiMethod, TLMethod } from "../tl/types";
import type { EnvironmentInformation, Transport } from "../types";

const API_LAYER = 177;

export type RPCState = "connecting" | "connected" | "disconnected";

export class RPCError extends Error {}

type GenApiMethods<T> = {
  [K in FilteredKeys<T, TLApiMethod<any, any, any>>]: T[K] extends {
    (param: infer I): any;
    verify(param: infer R): any;
  } ? (
      param: void extends I ? void : Omit<I, "api_id" | "api_hash">,
    ) => Promise<R>
    : never;
};

type GenApi<T> = {
  [K in FilteredKeys<T, Record<string, { ref: string }>>]: GenApiMethods<T[K]>;
};

class Session {
  #seq = 0;
  #session = 0n;
  #lastmsgid = 0n;
  #offset = 0;
  #first = true;

  constructor() {
    this.reset();
  }

  set offset(value: number) {
    this.#offset = value;
  }

  get first() {
    const ret = this.#first;
    this.#first = false;
    return ret;
  }

  reset() {
    this.#seq = 0;
    this.#session = rand_bigint(8);
    this.#lastmsgid = 0n;
    this.#first = true;
  }

  get related_seq() {
    return this.#seq++ * 2 + 1;
  }

  get unrelated_seq() {
    return this.#seq * 2;
  }

  get id() {
    return this.#session;
  }

  get msgid() {
    const timeTicks = Date.now();
    const timeSec = Math.floor(timeTicks / 1000) + this.#offset;
    const timeMSec = timeTicks % 1000;
    const random = rand_int(0xff_ff);

    return (this.#lastmsgid = max(
      this.#lastmsgid + 4n,
      (BigInt(timeSec) << 32n) |
        (BigInt(timeMSec) << 21n) |
        (BigInt(random) << 3n) |
        4n,
    ));
  }
}

interface PendingCall<N extends string = string, T = any, R = any> {
  method: TLApiMethod<N, T, R>;
  params: Omit<T, "api_id" | "api_hash">;
  resolver: Resolver<R>;
}

interface PendingResquest<T = any> {
  resolver: Resolver<T>;
  packet: Uint8Array;
  ack?: true;
}

class QueueHandler<T> {
  #handler: (t: T[]) => Promise<void>;
  #errhandler: (err: any) => void;
  #queue: T[] = [];
  #blocked = true;
  #next: number | undefined;
  wait?: Promise<void>;

  constructor(
    handler: (t: T[]) => Promise<void>,
    errhandler: (err: any) => void,
    blocked = true,
  ) {
    this.#handler = handler;
    this.#errhandler = errhandler;
    this.blocked = blocked;
  }

  [Symbol.iterator]() {
    return this.#queue[Symbol.iterator]();
  }

  async #runner() {
    try {
      await this.#handler(this.#queue);
    } catch (e) {
      this.#errhandler(e);
    } finally {
      delete this.wait;
    }
  }

  set blocked(value: boolean) {
    this.#blocked = value;
    if (value) {
      if (this.#next) clearTimeout(this.#next);
      this.#next = undefined;
    } else if (this.#queue.length && !this.wait && !this.#next) {
      this.wait = this.#runner();
    }
  }

  push(item: T) {
    this.#queue.push(item);
    if (this.#next == undefined && !this.#blocked) {
      this.#next = setTimeout(() => {
        this.#next = undefined;
        this.wait = this.#runner();
      });
    }
  }
}

type Events = api._Update & {
  terminate: Record<never, never>;
  authorize: { resolve?: Promise<void> };
  sent: api._Updates["updateShortSentMessage"];
};

/**
 * Main client class of this library.
 *
 * @remarks
 *
 * This class is the primary interface for interacting with Telegram's API. It
 * handles authorization, maintains the connection, and provides methods for
 * making requests.
 */
export default class RPC extends EventEmitter<Events> {
  #api_id: number;
  #api_hash: string;
  #environment_information: EnvironmentInformation;
  #dcid: DCIdentifier;
  #transport: Transport;
  #storage: KVStorage;
  #auth!: Uint8Array;
  #salt!: Uint8Array;
  #state: RPCState = "connecting";
  #handle?: (this: RPC, data: Uint8Array) => Promise<void> | void;
  #session = new Session();
  #waitlist = new Map<bigint, PendingResquest>();
  #flood_wait = 0;
  #send_queue = new TaskQueue<Uint8Array>(async (msg) => {
    if (this.#flood_wait) {
      await new Promise((resolve) => setTimeout(resolve, this.#flood_wait));
      this.#flood_wait = 0;
    }
    await this.#transport.send(msg);
  });

  subscribe = true;

  get dcid(): DCIdentifier {
    return this.#dcid;
  }

  #send(packet: Uint8Array) {
    return this.#send_queue.enqueue(packet);
  }

  #handleerr = (e: any) => {
    if (this.#state === "disconnected") return;
    console.error(new Error(e, { cause: e }));
    this.close(e);
  };

  #ack_queue = new QueueHandler<bigint>(async (msg_ids) => {
    const packet = serialize(mt.msgs_ack, { msg_ids });
    // console.log("ack", msg_ids);
    msg_ids.length = 0;
    await this.#send_encrypted(packet, { content_related: false });
  }, this.#handleerr);
  #pending_calls = new QueueHandler<PendingCall>(async (list) => {
    while (list.length) {
      const { method, params, resolver } = list.shift()!;
      try {
        const packet = this.#session.first
          ? serialize(invokeWithLayer, {
            layer: API_LAYER,
            query: initConnection({
              ...this.#environment_information,
              api_id: this.#api_id,
              lang_code: "en",
              lang_pack: "",
              system_lang_code: "en",
              query: method({
                ...params,
                api_id: this.#api_id,
                api_hash: this.#api_hash,
              }),
            }),
          })
          : this.subscribe
          ? serialize(method, {
            ...params,
            api_id: this.#api_id,
            api_hash: this.#api_hash,
          })
          : serialize(invokeWithoutUpdates, {
            query: method({
              ...params,
              api_id: this.#api_id,
              api_hash: this.#api_hash,
            }),
          });
        const msgid = await this.#send_encrypted(packet);
        this.#waitlist.set(msgid, { resolver, packet });
      } catch (e) {
        resolver.reject(e);
      }
    }
  }, this.#handleerr);

  get state(): RPCState {
    return this.#state;
  }

  /**
   * The RPC client constructor.
   *
   * @param transport - the transport to use for the connection
   * @param storage - storage to use for auth session
   * @param dcid - destination DC identifier
   * @param api_id - Telegram API ID
   * @param api_hash - Telegram API hash
   * @param environment_information - Telegram environment information
   */
  constructor(
    transport: Transport,
    storage: KVStorage,
    dcid: DCIdentifier,
    api_id: number,
    api_hash: string,
    environment_information: EnvironmentInformation,
  ) {
    super();
    this.#transport = transport;
    this.#storage = storage;
    this.#dcid = dcid;
    this.#api_id = api_id;
    this.#api_hash = api_hash;
    this.#environment_information = environment_information;
    this.#send_queue.unblock();
    this.#recv_loop().catch(this.#handleerr);
    this.#connect().catch(this.#handleerr);
  }

  /**
   * Closes the RPC connection.
   *
   * @param e - error that caused the disconnection
   */
  close(e?: any) {
    if (this.#state === "disconnected") return;
    const suberror = new Error("rpc failed", { cause: e });
    this.emit("terminate", {});
    this.#send_queue.stop(suberror);
    this.#state = "disconnected";
    this.#transport.close();
    this.#ack_queue.blocked = true;
    this.#pending_calls.blocked = true;
    for (const { resolver } of this.#pending_calls) {
      resolver.reject(suberror);
    }
    for (const [, { resolver }] of this.#waitlist) {
      resolver.reject(suberror);
    }
  }

  #setitem(key: string, value: string | undefined) {
    if (value == null) {
      this.#storage.delete(key);
    } else {
      this.#storage.set(key, value);
    }
  }

  #getitem(key: string) {
    return this.#storage.get(key);
  }

  async #recv_loop() {
    for await (const event of this.#transport) {
      switch (event._) {
        case "error":
          await this.#error(event.code);
          break;
        case "message":
          if (this.#handle == null) throw new Error("no message handler");
          await this.#handle(event.data);
          break;
      }
    }
    if (this.#state != "disconnected") {
      this.#handleerr("connection ended");
    }
  }

  async #connect() {
    const auth = this.#getitem("auth");
    const salt = this.#getitem("salt");
    if (auth == null || salt == null) {
      await this.#do_auth();
    } else {
      this.#auth = decodeBase64(auth);
      this.#salt = decodeBase64(salt);
    }
    this.#handle = this.#handle_encrypted;
    this.#state = "connected";
    this.#pending_calls.blocked = false;
    this.#ack_queue.blocked = false;
  }

  #aes_instance(msgkey: Uint8Array, decrypt: boolean) {
    const x = decrypt ? 8 : 0;
    const a = sha256(msgkey, view_arr(this.#auth, x, 36));
    const b = sha256(view_arr(this.#auth, x + 40, 36), msgkey);
    const key = concat_array(
      a.subarray(0, 8),
      view_arr(b, 8, 16),
      view_arr(a, 24, 8),
    );
    const iv = concat_array(
      b.subarray(0, 8),
      view_arr(a, 8, 16),
      view_arr(b, 24, 8),
    );
    return new aes.IGE(key, iv);
  }

  #aes_decrypt(msgkey: Uint8Array, data: Uint8Array) {
    return this.#aes_instance(msgkey, true).decrypt(data);
  }

  #aes_encrypt(msgkey: Uint8Array, data: Uint8Array) {
    return this.#aes_instance(msgkey, false).encrypt(data);
  }

  /**
   * Call a Telegram API method without parameters.
   * @param method the method to call
   */
  call<N extends string, R>(method: TLApiMethod<N, void, R>): Promise<R>;
  /**
   * Call a Telegram API method.
   * @param method the method to call
   * @param params the method parameters
   */
  call<N extends string, T, R>(
    method: TLApiMethod<N, T, R>,
    params: Omit<T, "api_id" | "api_hash">,
  ): Promise<R>;
  call<N extends string, T, R>(
    method: TLApiMethod<N, T, R>,
    params: T extends void ? void : Omit<T, "api_id" | "api_hash">,
  ): Promise<R> {
    const resolver = new Resolver<R>();
    this.#pending_calls.push({
      method,
      params: params ?? {},
      resolver,
    });
    return resolver.promise;
  }

  /**
   * Proxy to the Telegram API methods.
   * @param name the method name
   */
  readonly api: GenApi<typeof apiset> = cached((name) => {
    if (
      name in apiset &&
      !name.startsWith("$") &&
      name != "mt" &&
      name != "default"
    ) {
      const obj = (apiset as any)[name];
      return cached((name) => {
        if (name in obj && obj[name].ref && obj[name].verify) {
          return this.call.bind(this, obj[name]);
        }
      });
    }
  });

  async #send_encrypted(
    data: Uint8Array,
    {
      content_related = true,
      msgid = this.#session.msgid,
    }: {
      content_related?: boolean;
      msgid?: bigint;
    } = {},
  ) {
    const salt = this.#salt;
    const seqno = content_related
      ? this.#session.related_seq
      : this.#session.unrelated_seq;
    const minpadding = 12;
    const unpadded = (32 + data.length + minpadding) % 16;
    const padded = minpadding + (unpadded ? 16 - unpadded : 0);
    const session_id = this.#session.id;
    const padding = rand_array(padded);
    const payload = serialize(function () {
      this.raw(salt);
      this.int64(session_id);
      this.int64(msgid);
      this.int32(seqno);
      this.uint32(data.length);
      this.raw(data);
      this.raw(padding);
    });
    const msgkey = view_arr(
      sha256(view_arr(this.#auth, 88, 32), payload),
      8,
      16,
    );
    const encrypted = this.#aes_encrypt(msgkey, payload);
    const authkeyid = sha1(this.#auth).subarray(-8);
    const packet = concat_array(authkeyid, msgkey, encrypted);
    await this.#send(packet);
    return msgid;
  }

  async #handle_encrypted(buffer: Uint8Array) {
    try {
      const deserializer = new Deserializer(buffer);
      deserializer.int64(); // auth key
      const msgkey = deserializer.int128();
      const encrypted_payload = deserializer.remain;
      const decrypted_payload = this.#aes_decrypt(
        msgkey,
        encrypted_payload.subarray(
          0,
          encrypted_payload.length - (encrypted_payload.length % 16),
        ),
      );
      const computed_msgkey = view_arr(
        sha256(view_arr(this.#auth, 96, 32), decrypted_payload),
        8,
        16,
      );
      if (!eq_array(msgkey, computed_msgkey)) {
        throw new Error(`Incorrect msgkey`);
      }
      const plain_deserializer = new Deserializer(decrypted_payload);
      plain_deserializer.int64(); // salt
      plain_deserializer.int64(); // session
      const msgid = plain_deserializer.int64();
      if (msgid % 2n == 0n) {
        throw new Error(`Got even message`);
      }
      plain_deserializer.uint32(); // seqno
      const length = plain_deserializer.uint32();
      if (length > decrypted_payload.length || length % 4 != 0) {
        throw new Error(`Invalid message length`);
      }
      return await this.#process_message(plain_deserializer.object(), msgid);
    } catch (e) {
      this.#handleerr(e);
    }
  }

  async #process_message(
    data:
      | mt.MessageContainer
      | mt.BadMsgNotification
      | mt.NewSession
      | mt.MsgsAck
      | mt.RpcResult
      | mt.Object
      | mt.Pong
      | api.Update
      | api.Updates,
    msgid: bigint,
  ): Promise<void> {
    switch (data._) {
      case "mt.pong":
        return;
      case "mt.gzip_packed":
        return this.#process_message(decompressObject(data), msgid);
      case "mt.msg_container":
        for (const msg of data.messages) {
          await this.#process_message(decompressObject(msg.body), msg.msg_id);
        }
        return;
      case "mt.msgs_ack":
        for (const id of data.msg_ids) {
          const msg = this.#waitlist.get(id);
          if (!msg) {
            console.warn(`Ack message ${id} not in list`);
            continue;
          }
          msg.ack = true;
        }
        return;
      case "mt.new_session_created":
        this.#ack_queue.push(msgid);
        this.#setitem(
          "salt",
          encodeBase64(this.#salt = frombig(data.server_salt, true)),
        );
        return;
      case "mt.rpc_result": {
        this.#ack_queue.push(msgid);
        const msg = this.#waitlist.get(data.req_msg_id);
        if (!msg) {
          console.warn(`Result message ${data.req_msg_id} not in list`);
          return;
        }
        const res = decompressObject(data.result);
        if (typeof res == "object" && res._ == "mt.rpc_error") {
          this.#waitlist.delete(data.req_msg_id);
          const { error_message } = res as mt.RpcError;
          const matched = /FLOOD_WAIT_(\d+)/.exec(error_message);
          if (matched) {
            const waittime = +matched[1];
            // console.log("FLOOD", waittime);
            this.#flood_wait = waittime;
            this.#waitlist.delete(data.req_msg_id);
            (async () => {
              try {
                const newid = await this.#send_encrypted(msg.packet);
                this.#waitlist.set(newid, msg);
              } catch (e) {
                msg.resolver.reject(e);
                this.#handleerr(e);
              }
            })();
            return;
          } else if (error_message === "AUTH_KEY_UNREGISTERED") {
            const obj: { resolve?: Promise<void> } = {};
            this.emit("authorize", obj);
            if (obj.resolve) {
              (async () => {
                try {
                  await obj.resolve;
                  const newid = await this.#send_encrypted(msg.packet);
                  this.#waitlist.set(newid, msg);
                } catch (e) {
                  msg.resolver.reject(e);
                  this.#handleerr(e);
                }
              })();
              return;
            }
          }
          msg.resolver.reject(new RPCError(error_message));
        } else {
          // @ts-ignore: too complex type
          msg.resolver.resolve(res);
        }
        this.#waitlist.delete(data.req_msg_id);
        return;
      }
      case "mt.bad_server_salt":
        this.#setitem(
          "salt",
          encodeBase64(this.#salt = frombig(data.new_server_salt, true)),
        );
        await this.#resend_packet(data.bad_msg_id);
        return;
      case "mt.bad_msg_notification":
        if ([16, 17].includes(data.error_code)) {
          const server_time = +(msgid >> 32n).toString();
          const offset = Date.now() / 1000 - server_time;
          this.#setitem("time_offset", (this.#session.offset = offset) + "");
          this.#resend_packet(data.bad_msg_id).catch(this.#handleerr);
          return;
        }
        // TODO: Better handling
        {
          const msg = this.#waitlist.get(data.bad_msg_id);
          if (msg) {
            msg.resolver.reject(new Error(`reject due to ${data.error_code}`));
            this.#waitlist.delete(data.bad_msg_id);
          }
        }
        return;
      case "updates":
      case "updatesCombined":
        this.#ack_queue.push(msgid);
        data.updates.forEach((update) => this.emit(update._, update));
        return;
      case "updatesTooLong":
        this.#ack_queue.push(msgid);
        return;
      case "updateShort":
        this.#ack_queue.push(msgid);
        this.emit(data.update._, data.update);
        return;
      case "updateShortMessage":
        this.#ack_queue.push(msgid);
        this.emit("updateNewMessage", {
          message: {
            ...data,
            _: "message",
            peer_id: {
              _: "peerUser",
              user_id: data.user_id,
            },
          },
          pts: data.pts,
          pts_count: data.pts_count,
        });
        return;
      case "updateShortChatMessage":
        this.#ack_queue.push(msgid);
        this.emit("updateNewMessage", {
          message: {
            ...data,
            _: "message",
            from_id: {
              _: "peerUser",
              user_id: data.from_id,
            },
            peer_id: {
              _: "peerChat",
              chat_id: data.chat_id,
            },
          },
          pts: data.pts,
          pts_count: data.pts_count,
        });
        return;
      case "updateShortSentMessage":
        this.#ack_queue.push(msgid);
        this.emit("sent", data);
        return;
    }
    this.#ack_queue.push(msgid);
    this.emit(data._, data);
  }

  async #resend_packet(msgid: bigint) {
    const msg = this.#waitlist.get(msgid);
    if (msg) {
      await this.#send_encrypted(msg.packet, { msgid });
    }
  }

  async #do_auth() {
    const { auth, salt } = await authorize({
      send: <T, R>(fn: TLMethod<T, R>, value: T): Promise<R> => {
        const data = serialize(fn, value);
        const msgid = this.#session.msgid;
        const payload = serialize(function () {
          this.int64(0n);
          this.int64(msgid);
          this.uint32(data.length);
          this.raw(data);
        });
        return new Promise((resolve, reject) => {
          this.#send(payload).catch(reject);
          this.#handle = function (data) {
            this.#handle = undefined;
            try {
              const deserializer = new Deserializer(data);
              deserializer.int64();
              deserializer.int64();
              deserializer.int32();
              // @ts-ignore: type too complex
              resolve(fn.verify(deserializer.object()));
            } catch (e) {
              reject(e);
            }
          };
        });
      },
      set_timeoffset: (offset) => {
        this.#setitem(
          "time_offset",
          (this.#session.offset = offset).toString(),
        );
      },
    });
    this.#setitem("auth", encodeBase64(this.#auth = auth));
    this.#setitem("salt", encodeBase64(this.#salt = salt));
  }

  async #error(code: number) {
    switch (code) {
      case 404:
        console.error("invalid auth key");
        this.#pending_calls.blocked = true;
        this.#ack_queue.blocked = true;
        this.#setitem("auth", undefined);
        this.#setitem("salt", undefined);
        this.#state = "connecting";
        this.#session.reset();
        await this.#connect();
        break;
      case 429:
        throw new Error("transport flood");
      default:
        throw new Error(`unknown error ${code}`);
    }
  }
}
