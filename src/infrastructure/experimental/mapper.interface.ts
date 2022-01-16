type Additional = {
  data?: { [param: string]: unknown };
  documents?: { [documentName: string]: unknown };
  models?: { [modelName: string]: unknown };
};

export abstract class IMapper<Model, Document> {
  abstract fromDB(id: string, additional?: Additional): Model;

  abstract fromDocument(document: Document, additional?: Additional): Model;

  abstract toDocument(model: Model, additional?: Additional): Document;

  // TODO: https://github.com/Mind-team/smart-parking-system-server/issues/75
  // abstract toDB(
  //   action: 'update' | 'create',
  //   document: Document,
  //   additional?: Additional,
  // ): void;
}
