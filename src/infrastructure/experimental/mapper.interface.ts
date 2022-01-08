export abstract class IMapper<T extends { data: () => any }, U> {
  abstract fromDB(
    id: string,
    additional?: {
      data?: { [param: string]: unknown };
      documents?: { [documentName: string]: unknown };
    },
  ): T;
}
