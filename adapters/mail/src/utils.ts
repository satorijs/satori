export function condition<T>(): [(t: T) => void, Promise<T>] {
  let resolve: (t: T) => void
  const promise = new Promise<T>(r => resolve = r)
  return [resolve, promise]
}