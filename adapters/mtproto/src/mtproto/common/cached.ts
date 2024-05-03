export default function cached<T extends Record<string, any>>(
  create: (name: string) => T[string] | void,
): T {
  return new Proxy({} as T, {
    get(target: any, name: string) {
      if (name in target) return target[name];
      const value = create(name);
      target[name] = value;
      return value;
    },
  });
}
