import Resolver from "./resolver";

export function debounce<Ts extends any[], R>(
  fn: (...args: Ts) => R,
  delay: number,
): (...args: Ts) => Promise<Awaited<R>> {
  let timer = -1;
  const resolvers = [] as Resolver<R>[];
  return ((...args: Ts) => {
    const resolver = new Resolver<R>();
    resolvers.push(resolver);
    if (timer != -1) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = -1;
      const copied = resolvers.splice(0);
      try {
        Promise.resolve(fn(...args)).then((value) =>
          copied.forEach(({ resolve }) => resolve(value))
        );
      } catch (e) {
        copied.forEach(({ reject }) => {
          reject(e);
        });
      }
    }, delay);
    return resolver.promise;
  }) as any;
}
