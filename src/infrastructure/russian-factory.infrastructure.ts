import { Validator } from '../models/interfaces/validator.interface';
import { StandardPhoneNumber } from '../models/standard-phone-number.model';
import { StandardPlate } from '../models/standard-plate.model';
import { PhoneNumber } from '../models/interfaces/phone-number.interface';
import { Plate } from '../models/interfaces/plate.interface';
import { StandardUser } from '../models/standard-user.model';
import { UniqueArray } from '../models/interfaces/unique-array.interface';
import { StandardParking } from '../models/standard-parking.model';
import { User } from '../models/interfaces/user.interface';
import { PriceCalculator } from '../models/interfaces/price-calculator.interface';
import { Parking } from '../models/interfaces/parking.interface';
import { Factory } from './factory.infrastructure';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RussianFactory implements Factory {
  phoneNumber(value: string, validator?: Validator<string>): PhoneNumber {
    return new StandardPhoneNumber(value, validator);
  }

  plate(value: string, validator?: Validator<string>): Plate {
    return new StandardPlate(value, validator);
  }

  user(
    phoneNumber: PhoneNumber,
    password: string,
    plates: UniqueArray<Plate>,
    parkings: Parking[],
    email?: string,
  ): User {
    return new StandardUser(phoneNumber, password, plates, parkings, email);
  }

  uncompletedParking(
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    calculator?: PriceCalculator,
  ): Parking {
    return new StandardParking(
      parkingTitle,
      carPlate,
      entryCarTime,
      calculator,
    );
  }

  completedParking(
    parkingTitle: string,
    carPlate: string,
    entryCarTime: Date,
    departureCarTime: Date,
    priceRub: number,
    isCompleted: boolean,
    calculator?: PriceCalculator,
  ): Parking {
    return new StandardParking(
      parkingTitle,
      carPlate,
      entryCarTime,
      departureCarTime,
      priceRub,
      isCompleted,
      calculator,
    );
  }
}
