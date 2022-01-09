export interface ICollection<T> {
  findOne: (filter: { [key: string]: any }) => Promise<T> | null;
  findById: (id: string) => Promise<T> | null;
  findManyById: (ids: string[]) => Promise<T[]> | null;
  save: (content: T) => Promise<void>;
  updateOne: (filter: { [key: string]: any }, update: T) => Promise<void>;
  deleteOne: (filter: { [key: string]: any }) => Promise<void>;
  all: () => Promise<T[]>;
}
