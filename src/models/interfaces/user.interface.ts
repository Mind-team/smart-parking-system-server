import { RegisteredUserContent } from './registered-user-content.interface';
import { Plate } from './plate.interface';
import { Parking } from './parking.interface';
import { UnregisteredUserContent } from './unregistered-user-content.interface';

export interface User<T extends 'Registered' | 'Unregistered'> {
  addPlate: (plate: Plate) => void;
  registerParking: (parking: Parking) => void;
  content: () => T extends 'Registered'
    ? RegisteredUserContent
    : UnregisteredUserContent;
  lastParking: (popOrPeek: 'pop' | 'peek') => Parking;
}
