import { Filter } from './types/filter.type';

export interface Collection<T> {
  findOne: (filter: Filter) => Promise<T> | null;
  findById: (id: string) => Promise<T> | null;
  save: (content: T) => Promise<void>;
  updateOne: (filter: Filter, update: T) => Promise<void>;
  deleteOne: (filter: Filter) => Promise<void>;
}
