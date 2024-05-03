import { modpow } from "../common/alg";
import {
  concat_array,
  frombig256,
  rand_bigint,
  tobig,
  tou8,
  xor_array,
} from "../common/utils";
import type { api } from "../gen/api.js";

const H = async (...bytes: Uint8Array[]) =>
  tou8(await crypto.subtle.digest("SHA-256", concat_array(...bytes)));

const SH = async (data: Uint8Array, salt: Uint8Array) =>
  await H(salt, data, salt);

const PH1 = async (
  password: Uint8Array,
  salt1: Uint8Array,
  salt2: Uint8Array,
) => await SH(await SH(password, salt1), salt2);

const pbkdf2 = async (
  hash: string,
  password: Uint8Array,
  salt: Uint8Array,
  iterations: number,
  length: number,
) => {
  const key = await crypto.subtle.importKey(
    "raw",
    password,
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash,
      iterations,
      salt,
    },
    key,
    length,
  );
  return tou8(bits);
};

const PH2 = async (
  password: Uint8Array,
  salt1: Uint8Array,
  salt2: Uint8Array,
) =>
  await SH(
    await pbkdf2(
      "SHA-512",
      await PH1(password, salt1, salt2),
      salt1,
      100000,
      512,
    ),
    salt2,
  );

function hybig(src: BufferSource | bigint) {
  if (typeof src == "bigint") {
    return {
      data: frombig256(src),
      big: src,
    };
  }
  const data = tou8(src);
  return {
    data,
    big: tobig(data),
  };
}

export default async function srp(
  algo: api.PasswordKdfAlgo<
    "passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow"
  >,
  params: {
    password: string;
    gb: BufferSource;
  },
) {
  const password = new TextEncoder().encode(params.password);
  const salt1 = tou8(algo.salt1);
  const salt2 = tou8(algo.salt2);
  const g = hybig(BigInt(algo.g));
  const p = hybig(algo.p);
  const a = hybig(rand_bigint(256));
  const ga = hybig(modpow(g.big, a.big, p.big));
  const gb = hybig(params.gb);
  const k = hybig(await H(p.data, g.data));
  const u = hybig(await H(ga.data, gb.data));
  const x = hybig(await PH2(password, salt1, salt2));
  const v = modpow(g.big, x.big, p.big);
  const kv = (k.big * v) % p.big;
  const t = (gb.big - kv + p.big) % p.big;
  const sa = hybig(modpow(t, a.big + u.big * x.big, p.big));
  const ka = await H(sa.data);
  const m1 = await H(
    xor_array(await H(p.data), await H(g.data)),
    await H(salt1),
    await H(salt2),
    ga.data,
    gb.data,
    ka,
  );
  return { A: ga.data, M1: m1 };
}
