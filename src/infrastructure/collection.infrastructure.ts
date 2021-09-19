export interface Collection<T> {
  findOne: (filter: { [key: string]: any }) => Promise<T>;
  findById: (id: string) => Promise<T>;
  save: (content: T) => Promise<void>;
  updateOne: (filter: { [key: string]: any }, update: T) => Promise<void>;
  deleteOne: (filter: { [key: string]: any }) => Promise<void>;
}
