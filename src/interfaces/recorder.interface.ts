export interface Recorder<T> {
  formatForDB: (model: T) => T | Promise<T>;
}
