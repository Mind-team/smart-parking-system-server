import { IDriver } from '../driver';
import { IParking } from '../parking';

export type NewParkingProcessConstructor = {
  currency: string;
  parking: IParking;
  driver: IDriver;
  entryCarTime: string;
};
