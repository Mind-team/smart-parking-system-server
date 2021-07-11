import { Validator } from '../models/interfaces/validator.interface';
import { PhoneNumber } from '../models/interfaces/phone-number.interface';
import { Plate } from '../models/interfaces/plate.interface';
import { UniqueArray } from '../models/interfaces/unique-array.interface';
import { User } from '../models/interfaces/user.interface';
import { PriceCalculator } from '../models/interfaces/price-calculator.interface';
import { Parking } from '../models/interfaces/parking.interface';

export interface Factory {
  phoneNumber: (value: string, validator?: Validator<string>) => PhoneNumber;
  plate: (value: string, validator?: Validator<string>) => Plate;
  user: (
    phoneNumber: PhoneNumber,
    password: string,
    plates: UniqueArray<Plate>,
    parkings: Parking[],
    email?: string,
  ) => User;
  uncompletedParking: (
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    calculator?: PriceCalculator,
  ) => Parking;
  completedParking: (
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    departureCarTime: Date,
    priceRub: number,
    isCompleted: boolean,
    calculator?: PriceCalculator,
  ) => Parking;
}
