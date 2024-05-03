import { abs, gcd, min, modpow } from "../common/alg";

function rand(max: bigint) {
  return BigInt((Math.random() * +max.toString()) | 0);
}

export function depq(pq: bigint): { p: bigint; q: bigint } {
  if (pq % 2n == 0n) return { p: 2n, q: pq / 2n };
  let y = rand(pq - 2n) + 1n;
  const c = 1n;
  const m = 1n;

  let g = 1n;
  let r = 1n;
  let q = 1n;
  let x = 0n;
  let ys = 0n;

  while (g == 1n) {
    x = y;
    for (let i = 0n; i < r; i++) {
      y = (modpow(y, 2n, pq) + c) % pq;
    }
    let k = 0n;
    while (k < r && g == 1n) {
      ys = y;
      const condition = min(m, r - k);
      for (let i = 0; i < condition; i++) {
        y = (modpow(y, 2n, pq) + c) % pq;
        q = (q * abs(x - y)) % pq;
      }
      g = gcd(q, pq);
      k += m;
    }

    r *= 2n;
  }

  if (g == pq) {
    while (true) {
      ys = (modpow(ys, 2n, pq) + c) % pq;
      g = gcd(abs(x - ys), pq);

      if (g > 1n) break;
    }
  }

  const p = g;
  q = pq / g;
  return p < q ? { p, q } : { p: q, q: p };
}
