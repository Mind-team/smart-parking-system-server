import { ParkingContent } from './parking-content.interface';

export interface UserContent {
  phoneNumber: string;
  password: string;
  plates: string[];
  parkings: ParkingContent[];
  email?: string;
}
