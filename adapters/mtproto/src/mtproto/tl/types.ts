import type { ToUnderscore } from "../common/magic";
export type { ToUnderscore };

export type GenericObject = { _: string } & Record<string, any>;

export type VerifyType<T> = (input: T) => T;

export type TLConstructor<P, N extends keyof P> = {
  (param: P[N]): ToUnderscore<P, N>;
  ref: N;
};

export type TLConstructorEmpty<N> = {
  (): { _: N };
  ref: N;
};

export type TLApiMethod<N extends string, T, R> = {
  (param: T): { _: N } & T;
  ref: string;
  verify: VerifyType<R>;
};

export type TLMethod<T, R> = {
  (this: BaseSerializer, param: T): void;
  verify: VerifyType<R>;
};

export interface BaseSerializer {
  true(value: true): void;
  bool(value: boolean): void;
  uint32(value: number): void;
  int32(value: number): void;
  int64(value: bigint): void;
  int128(value: Uint8Array): void;
  int256(value: Uint8Array): void;
  double(value: number): void;
  bytes(value: Uint8Array): void;
  string(value: string): void;

  raw(value: Uint8Array): void;

  vector<T>(
    value: T[],
    fn: (this: BaseSerializer, value: T) => void,
  ): void;

  object(value: GenericObject): void;
}

export interface BaseDeserializer {
  true(): true;
  bool(): boolean;
  int32(): number;
  int64(): bigint;
  int128(): Uint8Array;
  int256(): Uint8Array;
  double(): number;
  bytes(): Uint8Array;
  string(): string;

  vector<T = any>(fn: (this: BaseDeserializer) => T): T[];
  vector<T = any>(
    fn: (this: BaseDeserializer, id: number) => T,
    id: number,
  ): T[];

  object<T = any>(id?: number): T;
}
