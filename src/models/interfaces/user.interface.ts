import { UserContent } from './user-content.interface';
import { Plate } from './plate.interface';
import { Parking } from './parking.interface';

export interface User {
  addPlate: (plate: Plate) => void;
  registerParking: (parking: any) => void;
  content: () => UserContent;
  lastParking: (popOrPeek: 'pop' | 'peek') => Parking;
}
