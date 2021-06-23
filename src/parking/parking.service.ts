import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { EntryCarParkingRecord } from './types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { ParkingRecorder } from '../infrastructure/recorders/parking-recorder.infrastructure';
import { ParkingHistoryElement } from '../models/parking-history-element.model';
import { DepartureCarParkingRecord } from './types/departure-car-parking-record.type';

@Injectable()
export class ParkingService {
  private readonly parkingRecorder = new ParkingRecorder(); // TODO: DI
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
      const user = await this.userByPlate(carPlate);
      user.parkingHistory.push(
        this.parkingRecorder.formatForDB(
          new ParkingHistoryElement(parkingTitle, carPlate, entryCarTime),
        ),
      );
      await user.save();
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
      const user = await this.userByPlate(carPlate);
      const entryRecord = await user.parkingHistory.pop();
      user.parkingHistory.push(
        this.parkingRecorder.formatForDB(
          new ParkingHistoryElement(
            entryRecord.parkingTitle,
            entryRecord.carPlate,
            entryRecord.entryCarTime,
            departureCarTime,
            true,
          ),
        ),
      );
      // TODO: Обработка оплаты через карту или терминал
      await user.save();
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'The car departure was successfully registered',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  private async userByPlate(plate: string) {
    const user = await this.userModel.findOne({
      plates: { $elemMatch: { value: plate } },
    });
    if (user) {
      return user;
    }
    // TODO: Обработка пользователя, которого нет в бд
    throw new Error('NONENENNE');
  }
}
