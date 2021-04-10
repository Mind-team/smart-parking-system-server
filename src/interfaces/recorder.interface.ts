export interface Recorder<T> {
  formatForDB: (model: T) => Promise<T>;
}
