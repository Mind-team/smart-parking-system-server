import { ParkingRecord } from './parking-record.interface';

export interface User {
  phoneNumber: string;
  password: string;
  email?: string;
  plates: string[]; // TODO: When create plate model, change string[] on plates[]
  parkingHistory: ParkingRecord[];
}

export type SignInData = Pick<User, 'phoneNumber' | 'password'>;
