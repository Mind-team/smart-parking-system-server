import { ParkingContent } from './parking-content.interface';

export interface UnregisteredUserContent {
  plates: string[];
  parkings: ParkingContent[];
}
