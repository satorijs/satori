import { modpow } from "../common/alg";
import {
  concat_array,
  dump_u8arr,
  eq_array,
  frombig,
  rand_array,
  rand_bigint,
  sha1,
  tobig,
  tou8,
  view_arr,
  xor_array,
} from "../common/utils";
import * as aes from "../crypto/aes";
import { depq } from "../crypto/pq";
import * as rsa from "../crypto/rsa";
import { mt } from "../gen/api.js";
import { Deserializer } from "../tl/deserializer";
import { serialize } from "../tl/serializer";
import type { TLMethod } from "../tl/types";

type DhParams = {
  prime: bigint;
  g: bigint;
  ga: bigint;
};

type AesParams = {
  key: Uint8Array;
  iv: Uint8Array;
};

export type PlainTransport = {
  send<T, R, E>(fn: TLMethod<T, R>, value: T): Promise<R>;
  set_timeoffset(offset: number): void;
};

export default async function authorize(transport: PlainTransport) {
  const nonce = rand_array(16);
  const { pq_res, key } = await get_pq_and_key(transport, nonce);
  const server_nonce = pq_res.server_nonce;
  const new_nonce = rand_array(32);
  const { aes_params, dh_params } = await get_params(
    pq_res.pq,
    nonce,
    server_nonce,
    new_nonce,
    key,
    transport,
  );
  return await generate_dh(
    transport,
    dh_params,
    aes_params,
    nonce,
    new_nonce,
    server_nonce,
  );
}

async function generate_dh(
  transport: PlainTransport,
  dh_params: DhParams,
  aes_params: AesParams,
  nonce: Uint8Array,
  new_nonce: Uint8Array,
  server_nonce: Uint8Array,
  retry_id = 0n,
): Promise<{ auth: Uint8Array; salt: Uint8Array }> {
  const { prime, g, ga } = dh_params;
  const { key: aes_key, iv: aes_iv } = aes_params;
  const b = rand_bigint(256);
  const auth = frombig(modpow(ga, b, prime));
  const salt = xor_array(
    new_nonce.subarray(0, 8),
    server_nonce.subarray(0, 8),
    true,
  );
  const auxhash = sha1(auth).subarray(0, 8);
  const inner = serialize(mt.client_DH_inner_data, {
    nonce,
    server_nonce,
    retry_id,
    g_b: frombig(modpow(g, b, prime)),
  });
  const innerhash = sha1(inner);
  const padding = rand_array(
    16 - ((innerhash.length + inner.length) % 16),
  );
  const encrypted_data = new aes.IGE(aes_key, aes_iv).encrypt(
    concat_array(innerhash, inner, padding),
  );
  // console.log("set_client_DH_params");
  const dh_ans = await transport.send(mt.set_client_DH_params, {
    nonce,
    server_nonce,
    encrypted_data,
  });
  if (!eq_array(nonce, dh_ans.nonce)) {
    throw new Error(`The nonce are not equal in client dh step`);
  }
  if (!eq_array(server_nonce, dh_ans.server_nonce)) {
    throw new Error(`The server nonce are not equal in client dh step`);
  }
  switch (dh_ans._) {
    case "mt.dh_gen_ok": {
      const hash1 = view_arr(sha1(new_nonce, [1], auxhash), 4, 16);
      if (!eq_array(hash1, dh_ans.new_nonce_hash1)) {
        throw new Error(`Invalid hash in dh_gen_ok`);
      }
      return { auth, salt };
    }
    case "mt.dh_gen_retry": {
      const hash2 = view_arr(sha1(new_nonce, [2], auxhash), 4, 16);
      if (!eq_array(hash2, dh_ans.new_nonce_hash2)) {
        throw new Error(`Invalid hash in dh_gen_retry`);
      }
      return generate_dh(
        transport,
        dh_params,
        aes_params,
        nonce,
        new_nonce,
        server_nonce,
        tobig(auxhash, true),
      );
    }
    case "mt.dh_gen_fail": {
      const hash3 = view_arr(sha1(new_nonce, [3], auxhash), 4, 16);
      if (!eq_array(hash3, dh_ans.new_nonce_hash3)) {
        throw new Error(`Invalid hash in dh_gen_fail`);
      }
      throw new Error(`dh_gen_fail`);
    }
    default:
      // @ts-ignore: for unexpected response
      throw new Error(`invalid response: ${dh_ans._}`);
  }
}

async function get_pq_and_key(transport: PlainTransport, nonce: Uint8Array) {
  // console.log("req_pq_multi");
  const pq_res = await transport.send(mt.req_pq_multi, { nonce });
  if (!eq_array(nonce, pq_res.nonce)) {
    throw new Error(
      `The nonce are not equal in pq step (expected ${dump_u8arr(nonce)}, got ${
        dump_u8arr(pq_res.nonce)
      })`,
    );
  }
  const key = rsa.find(pq_res.server_public_key_fingerprints);
  if (!key) {
    throw new Error(
      `public key not found, ${pq_res.server_public_key_fingerprints}`,
    );
  }
  return { pq_res, key };
}

async function get_params(
  pq: BufferSource,
  nonce: Uint8Array,
  server_nonce: Uint8Array,
  new_nonce: Uint8Array,
  key: { fingerprint: bigint; modulus: bigint },
  transport: PlainTransport,
) {
  const { p: bigp, q: bigq } = depq(tobig(tou8(pq)));
  const p = frombig(bigp);
  const q = frombig(bigq);
  const pq_inner_data = serialize(mt.p_q_inner_data, {
    pq: tou8(pq),
    p,
    q,
    nonce,
    server_nonce,
    new_nonce,
  });
  const pq_inner_data_hash = sha1(pq_inner_data);
  const pq_inner = rand_array(255);
  pq_inner.set(pq_inner_data_hash);
  pq_inner.set(pq_inner_data, pq_inner_data_hash.length);
  const encrypted_data = rsa.encrypt(key.modulus, pq_inner);
  // console.log("req_DH_params");
  const dh_res = await transport.send(mt.req_DH_params, {
    nonce,
    server_nonce,
    p,
    q,
    public_key_fingerprint: key.fingerprint,
    encrypted_data,
  });
  if (!eq_array(nonce, dh_res.nonce)) {
    throw new Error(`The nonce are not equal in dh step`);
  }
  if (!eq_array(server_nonce, dh_res.server_nonce)) {
    throw new Error(`The server nonce are not equal in dh step`);
  }
  if (dh_res._ == "mt.server_DH_params_fail") {
    throw new Error(`server_DH_params_fail`);
  }
  const aes_params = generateAesParams(new_nonce, server_nonce);
  const answer = new aes.IGE(
    aes_params.key,
    aes_params.iv,
  ).decrypt(
    tou8(dh_res.encrypted_answer),
  );
  const answer_hash = answer.subarray(0, 20);
  const answer_deserializer = new Deserializer(answer.subarray(20));
  const dh_data = answer_deserializer.object<mt.Server_DH_inner_data>();
  if (
    !eq_array(
      answer_hash,
      sha1(view_arr(answer, 20, answer_deserializer.offset)),
    )
  ) {
    throw new Error(`Invalid hash in DH params decrypted data`);
  }
  if (!eq_array(nonce, dh_data.nonce)) {
    throw new Error(`The nonce are not equal in dh answer step`);
  }
  if (!eq_array(server_nonce, dh_data.server_nonce)) {
    throw new Error(`The server nonce are not equal in dh answer step`);
  }
  transport.set_timeoffset(Math.floor(Date.now() / 1000) - dh_data.server_time);
  const dh_params = {
    prime: tobig(tou8(dh_data.dh_prime)),
    g: BigInt(dh_data.g),
    ga: tobig(tou8(dh_data.g_a)),
  };
  return { aes_params, dh_params };
}

function generateAesParams(
  new_nonce: Uint8Array,
  server_nonce: Uint8Array,
): AesParams {
  const hash1 = sha1(concat_array(new_nonce, server_nonce));
  const hash2 = sha1(concat_array(server_nonce, new_nonce));
  const hash3 = sha1(concat_array(new_nonce, new_nonce));
  const key = concat_array(hash1, hash2.subarray(0, 12));
  const iv = concat_array(
    view_arr(hash2, 12, 8),
    hash3,
    new_nonce.subarray(0, 4),
  );
  return { key, iv };
}
