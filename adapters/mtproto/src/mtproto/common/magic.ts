export type ToUnderscore<T, K extends keyof T = keyof T> = {
  [K in keyof T]: { _: K } & T[K];
}[K];

export type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
