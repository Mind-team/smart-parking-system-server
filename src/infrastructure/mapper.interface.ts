export interface IMapper<T extends { data: () => any }, U> {
  fromDB: (id: string, additional: Record<string, unknown>) => T;
  fromDBDocument: (document: U, additional: Record<string, unknown>) => T;
  toDB: (model: T) => U;
}
