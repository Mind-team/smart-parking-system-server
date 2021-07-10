export interface UniqueArray<T> {
  get value(): T[];
  push(el: T): void;
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
  ): U[];
}
