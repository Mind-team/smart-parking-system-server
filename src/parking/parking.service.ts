import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { EntryCarParkingRecord } from './types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { DepartureCarParkingRecord } from './types/departure-car-parking-record.type';
import { Parking } from '../models/parking.model';
import { User } from '../models/user.model';
import { PhoneNumber } from '../models/phone-number.model';
import { UniquePlatesArray } from '../infrastructure/unique-plates-array.infrastructure';
import { Plate } from '../models/plate.model';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async registerCarEntry({
    parkingTitle,
    carPlate,
    entryCarTime,
  }: EntryCarParkingRecord) {
    try {
      const user = await this.#userByPlate(carPlate);
      user.addParking(new Parking(parkingTitle, carPlate, entryCarTime));
      await this.userModel.updateOne({ plates: carPlate }, user.info());
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successfully registered the entry of the car',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async registerCarDeparture({
    carPlate,
    departureCarTime,
  }: DepartureCarParkingRecord) {
    try {
      const user = await this.#userByPlate(carPlate);
      const parking = user.lastParking();
      parking.completeParking(departureCarTime);
      user.addParking(parking);
      await this.userModel.updateOne({ plates: carPlate }, user.info());
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'The car departure was successfully registered',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async #userByPlate(plate: string) {
    const user = await this.userModel.findOne({
      plates: plate,
    });
    if (user) {
      return new User(
        new PhoneNumber(user.phoneNumber),
        user.password,
        new UniquePlatesArray(user.plates.map((value) => new Plate(value))),
        user.parkings.map(
          (plate) =>
            new Parking(
              plate.parkingTitle,
              plate.carPlate,
              plate.entryCarTime,
              plate.departureCarTime,
              plate.priceRub,
              plate.isCompleted,
            ),
        ),
        user.email,
      );
    }
    // TODO: Обработка пользователя, которого нет в бд
    throw new Error('NONENENNE');
  }
}
