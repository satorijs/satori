export default class Resolver<T> {
  resolve!: (param: T) => void;
  reject!: (error: any) => void;
  promise = new Promise<T>((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
}
