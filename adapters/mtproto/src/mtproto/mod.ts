/**
 * Main entry point for this library.
 *
 * This is the main module for the Telegram client library,
 * it provides a high level interface for Telegram client
 * and provide API for other modules.
 *
 * @module mtproto
 */

import {
  type DCIdentifier,
  type DCType,
  toDCIdentifier,
  toDCInfo,
} from "./common/dc";
import type { api } from "./gen/api.js";
import RPC from "./rpc/mod";
import KVStorageAdapter from "./storage/kv";
import type { MTStorage } from "./storage/types";
import type {
  EnvironmentInformation,
  InitDC,
  IPv6Policy,
  MTProtoOptions,
  TransportFactory,
} from "./types";

const testdc: InitDC = {
  test: true,
  id: 1,
  ip: "149.154.175.10",
  port: 443,
};

function toInitDC(dc: api.DcOption, test: boolean): InitDC {
  return {
    id: dc.id,
    ip: dc.ip_address,
    port: dc.port,
    test,
  };
}

/**
 * Main entry point for this library.
 *
 * It provide API for Telegram client, it manage connections to DC,
 * store auth key, etc.
 */
export default class MTProto {
  #api_id: number;
  #api_hash: string;
  #initdc: InitDC;
  #transport_factory: TransportFactory;
  #storage: MTStorage;
  #environment: EnvironmentInformation;
  #connections = new Map<DCIdentifier, RPC>();
  #dclist: api.DcOption[] = [];
  #ipv6: IPv6Policy;
  setup_rpc?: (rpc: RPC) => void;

  #setting_get(key: string) {
    return this.#storage.get({ _: "global" }).get(key);
  }

  #setting_put(key: string, value: string | undefined) {
    const view = this.#storage.get({ _: "global" });
    if (value == null) {
      view.delete(key);
    } else {
      view.set(key, value);
    }
  }

  constructor({
    api_id,
    api_hash,
    initdc,
    transport_factory,
    environment,
    storage = new KVStorageAdapter(),
    ipv6_policy = "both",
    setup_rpc,
  }: MTProtoOptions) {
    this.#api_id = api_id;
    this.#api_hash = api_hash;
    this.#storage = storage;
    const defaultdc = this.#setting_get("dc");
    this.#initdc = defaultdc ? JSON.parse(defaultdc) : initdc ?? testdc;
    this.#transport_factory = transport_factory;
    this.#environment = environment;
    this.#dclist.push({
      _: "dcOption",
      id: this.#initdc.id,
      ip_address: this.#initdc.ip,
      port: this.#initdc.port,
    });
    this.#ipv6 = ipv6_policy;
    this.setup_rpc = setup_rpc;
  }

  /**
   * Init MTProto connection and fetch DC list.
   *
   * This method must be called before using any other methods.
   */
  async init() {
    const rpc = await this.rpc();
    const config = await rpc.api.help.getConfig();
    this.#dclist = config.dc_options;
  }

  /**
   * Default DC identifier to use when no DC is explicitly specified
   * in a method call.
   *
   * This value is stored in localStorage and will be persisted between
   * sessions.
   */
  set default_dc(dcid: number) {
    const founds = this.#dclist.filter(
      ({ cdn, media_only, id, ipv6, tcpo_only }) => {
        if (id != dcid || tcpo_only) return false;
        if (this.#ipv6 == "ipv4" && ipv6) return false;
        if (this.#ipv6 == "ipv6" && !ipv6) return false;
        return !cdn && !media_only;
      },
    );
    if (founds.length) {
      const { id, ip_address, port } = founds[0];
      this.#initdc.id = id;
      this.#initdc.ip = ip_address;
      this.#initdc.port = port;
      this.#setting_put("dc", JSON.stringify(this.#initdc));
    } else {
      throw new Error("dc not found!");
    }
  }

  /**
   * Get default DC identifier to use when no DC is explicitly specified
   * in a method call.
   *
   * This value is stored in localStorage and will be persisted between
   * sessions.
   */
  get default_dc(): number {
    return this.#initdc.id;
  }

  /**
   * Get DC identifier for a given DC id and type.
   *
   * @param id DC id.
   * @param type DC type.
   * @returns DC identifier.
   */
  get_dc_id(id: number, type: DCType = "main"): DCIdentifier {
    return toDCIdentifier({
      id,
      type,
      test: this.#initdc.test,
    });
  }

  /**
   * Get RPC connection for a given DC identifier.
   *
   * If no DC identifier is provided, use default DC.
   * If connection to that DC has not been established yet,
   * it will be created and initialized.
   *
   * @param dcid DC identifier.
   * @returns RPC connection to that DC.
   */
  async rpc(
    dcid: DCIdentifier = this.get_dc_id(this.default_dc),
  ): Promise<RPC> {
    if (this.#connections.has(dcid)) {
      return this.#connections.get(dcid)!;
    }
    const { type, id: nid } = toDCInfo(dcid);
    const founds = this.#dclist.filter(
      ({ cdn, media_only, id, ipv6, tcpo_only }) => {
        if (id != nid || tcpo_only) return false;
        if (this.#ipv6 == "ipv4" && ipv6) return false;
        if (this.#ipv6 == "ipv6" && !ipv6) return false;
        if (type == "cdn") return cdn;
        if (type == "media") return media_only;
        return true;
      },
    );
    let lasterr: Error | undefined;
    for (const found of founds) {
      try {
        const connection = await this.#transport_factory(
          toInitDC(found, this.#initdc.test),
        );
        const rpc = new RPC(
          connection,
          this.#storage.get({ _: "dc", ...toDCInfo(dcid) }),
          dcid,
          this.#api_id,
          this.#api_hash,
          this.#environment,
        );
        rpc.once("terminate", () => this.#connections.delete(dcid));
        this.#connections.set(dcid, rpc);
        this.setup_rpc?.(rpc);
        return rpc;
      } catch (e) {
        lasterr = e;
      }
    }
    throw lasterr ?? new Error(`Unknown DC ${dcid}`);
  }

  /**
   * Close all active connections and cleanup.
   *
   * This method should be called when user want to shutdown
   * all connections and stop working with library.
   */
  async shutdown(): Promise<void[]> {
    const conns = [...this.#connections.values()];
    this.#connections.clear();
    return await Promise.all(conns.map((conn) => conn.close("closed")));
  }
}
