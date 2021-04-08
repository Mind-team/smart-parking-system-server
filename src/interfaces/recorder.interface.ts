export interface Recorder<T> {
  formatForDB: () => Promise<T>;
}
