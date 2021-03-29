export interface User {
  _id: string;
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[]; // TODO: When create plate model, change string[] on plates[]
}
