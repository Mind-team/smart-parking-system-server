export abstract class IMapper<Model, Document> {
  abstract fromDB(
    id: string,
    additional?: {
      data?: { [param: string]: unknown };
      documents?: { [documentName: string]: unknown };
      models?: { [modelName: string]: unknown };
    },
  ): Model;

  abstract fromDocument(
    document: Document,
    additional?: {
      data?: { [param: string]: unknown };
      documents?: { [documentName: string]: unknown };
      models?: { [modelName: string]: unknown };
    },
  ): Model;

  abstract toDocument(
    model: Model,
    additional?: {
      data?: { [param: string]: unknown };
      documents?: { [documentName: string]: unknown };
      models?: { [modelName: string]: unknown };
    },
  ): Document;
}
