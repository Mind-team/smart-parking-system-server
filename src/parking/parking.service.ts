import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { EntryCarParkingRecord } from './types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { DepartureCarParkingRecord } from './types/departure-car-parking-record.type';
import { UniquePlatesArray } from '../infrastructure/unique-plates-array.infrastructure';
import { Factory } from '../infrastructure/factory.infrastructure';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @Inject('Factory')
    private readonly factory: Factory,
  ) {}

  async registerCarEntry({
    parkingTitle,
    carPlate,
    entryCarTime,
  }: EntryCarParkingRecord) {
    try {
      const user = await this.#userByPlate(carPlate);
      user.registerParking(
        this.factory.uncompletedParking(parkingTitle, carPlate, entryCarTime),
      );
      await this.userModel.updateOne({ plates: carPlate }, user.content());
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
      const parking = user.lastParking('pop').complete(departureCarTime);
      user.registerParking(parking);
      await this.userModel.updateOne({ plates: carPlate }, user.content());
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
      plates: this.factory.plate(plate).value,
    });
    if (user) {
      return this.factory.user(
        this.factory.phoneNumber(user.phoneNumber),
        user.password,
        new UniquePlatesArray(
          user.plates.map((value) => this.factory.plate(value)),
        ),
        user.parkings.map((plate) =>
          this.factory.completedParking(
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
