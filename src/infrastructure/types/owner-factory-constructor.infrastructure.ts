export type OwnerFactoryConstructor =
  | [title: string, costCalculationFunction: string]
  | [id: string, title: string, costCalculationFunction: string];
