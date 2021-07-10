import { IdGenerator } from './id-generator.interface';
import { ParkingContent } from './parking-content.interface';

export interface Parking {
  content: (asCompleted: boolean) => ParkingContent;
  complete: (departureCarTime: Date) => Parking;
  updateId: (idGenerator: IdGenerator) => void;
}
