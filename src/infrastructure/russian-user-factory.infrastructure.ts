import { Validator } from '../models/interfaces/validator.interface';
import { StandardPhoneNumber } from '../models/standard-phone-number.model';
import { StandardPlate } from '../models/standard-plate.model';
import { PhoneNumber } from '../models/interfaces/phone-number.interface';
import { Plate } from '../models/interfaces/plate.interface';
import { StandardUser } from '../models/standard-user.model';
import { UniqueArray } from '../models/interfaces/unique-array.interface';
import { StandardParking } from '../models/standard-parking.model';
import { User } from '../models/interfaces/user.interface';
import { Parking } from '../models/interfaces/parking.interface';
import { UserFactory } from './user-factory.infrastructure';
import { Injectable } from '@nestjs/common';
import { UnregisteredStandardUser } from '../models/unregistered-standard-user.model';
import { ParkingOwner } from '../models/interfaces/parking-owner.interface';

@Injectable()
export class RussianUserFactory implements UserFactory {
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
  ): User<'Registered'> {
    return new StandardUser(phoneNumber, password, plates, parkings, email);
  }

  uncompletedParking(
    parkingOwner: ParkingOwner,
    carPlate: string,
    entryCarTime: Date,
  ): Parking {
    return new StandardParking(parkingOwner, carPlate, entryCarTime);
  }

  completedParking(
    parkingOwner: ParkingOwner,
    carPlate: string,
    entryCarTime: Date,
    departureCarTime: Date,
    priceRub: number,
    isCompleted: boolean,
  ): Parking {
    return new StandardParking(
      parkingOwner,
      carPlate,
      entryCarTime,
      departureCarTime,
      priceRub,
      isCompleted,
    );
  }

  unregisteredUser(
    plates: UniqueArray<Plate>,
    parkings: Parking[],
  ): User<'Unregistered'> {
    return new UnregisteredStandardUser(plates, parkings);
  }
}
