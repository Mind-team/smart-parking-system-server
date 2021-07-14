import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { EntryCarParkingRecord } from './types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { DepartureCarParkingRecord } from './types/departure-car-parking-record.type';
import { UniquePlatesArray } from '../models/unique-plates-array.model';
import { Factory } from '../infrastructure/factory.infrastructure';
import { UnregisteredUserDocument } from '../schemas/unregistered-user.schema';
import { User } from '../models/interfaces/user.interface';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @InjectModel('UnregisteredUser')
    private readonly unregisteredUserModel: Model<UnregisteredUserDocument>,
    @Inject('Factory')
    private readonly factory: Factory,
  ) {}

  async registerCarEntry({
    parkingTitle,
    carPlate,
    entryCarTime,
  }: EntryCarParkingRecord) {
    try {
      const [user, type] = await this.#userByPlate(carPlate);
      user.registerParking(
        this.factory.uncompletedParking(parkingTitle, carPlate, entryCarTime),
      );
      if (type === 'Registered') {
        await this.userModel.updateOne({ plates: carPlate }, user.content());
      } else {
        await this.unregisteredUserModel.updateOne(
          { plates: carPlate },
          user.content(),
        );
      }
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
      const [user, type] = await this.#userByPlate(carPlate);
      const parking = user.lastParking('pop').complete(departureCarTime);
      user.registerParking(parking);
      if (type === 'Registered') {
        await this.userModel.updateOne({ plates: carPlate }, user.content());
      } else {
        await this.unregisteredUserModel.updateOne(
          { plates: carPlate },
          user.content(),
        );
      }
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'The car departure was successfully registered',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async #userByPlate(
    plate: string,
  ): Promise<
    [User<'Registered'>, 'Registered'] | [User<'Unregistered'>, 'Unregistered']
  > {
    const user = await this.userModel.findOne({
      plates: this.factory.plate(plate).value,
    });
    // TODO: try to improve
    if (user) {
      const result = this.factory.user(
        this.factory.phoneNumber(user.phoneNumber),
        user.password,
        new UniquePlatesArray(
          user.plates.map((value) => this.factory.plate(value)),
        ),
        user.parkings.map((parking) =>
          this.factory.completedParking(
            parking.parkingTitle,
            parking.carPlate,
            parking.entryCarTime,
            parking.departureCarTime,
            parking.priceRub,
            parking.isCompleted,
          ),
        ),
        user.email,
      );
      return [result, 'Registered'];
    }
    const unregisteredUser = await this.unregisteredUserModel.findOne({
      plates: this.factory.plate(plate).value,
    });
    if (unregisteredUser) {
      const result = this.factory.unregisteredUser(
        new UniquePlatesArray(
          unregisteredUser.plates.map((value) => this.factory.plate(value)),
        ),
        unregisteredUser.parkings.map((parking) =>
          this.factory.completedParking(
            parking.parkingTitle,
            parking.carPlate,
            parking.entryCarTime,
            parking.departureCarTime,
            parking.priceRub,
            parking.isCompleted,
          ),
        ),
      );
      return [result, 'Unregistered'];
    }
    return [await this.#createUnregisteredUser(plate), 'Unregistered'];
  }

  async #createUnregisteredUser(plate: string) {
    const user = await new this.unregisteredUserModel(
      this.factory
        .unregisteredUser(
          new UniquePlatesArray([this.factory.plate(plate)]),
          [],
        )
        .content(),
    ).save();
    return this.factory.unregisteredUser(
      new UniquePlatesArray(
        user.plates.map((value) => this.factory.plate(value)),
      ),
      [],
    );
  }
}
