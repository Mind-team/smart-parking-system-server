export interface Collection<T> {
  findOne: (filter: { [key: string]: any }) => Promise<T>;
  findById: (id: string) => Promise<T>;
  save: any;
  updateOne: any;
  deleteOne: any;
}
