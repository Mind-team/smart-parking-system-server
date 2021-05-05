import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { EntryCarParkingRecord } from '../../types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../../models/server-responses/successful-response.model';
import { FailedResponse } from '../../models/server-responses/failed-response.model';
import { ParkingRecorder } from '../../models/recorders/parking-recorder.model';
import { ParkingHistoryElement } from '../../models/parking-history-element.model';
import { DepartureCarParkingRecord } from '../../types/departure-car-parking-record.type';

@Injectable()
export class ParkingService {
  private readonly parkingRecorder = new ParkingRecorder();
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
      const user = await this.userModel.findOne({
        plates: { $elemMatch: { value: carPlate } },
      });
      if (!user) {
        // TODO: Обработка пользователя, которого нет в бд
      }
      await user.parkingHistory.push(
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
      const user = await this.userModel.findOne({
        plates: { $elemMatch: { value: carPlate } },
      });
      // const entryRecord = user.parkingHistory.find(
      //   (record) => record.carPlate == carPlate,
      // );
      // такой вариант, если каким-то образом запись о входе не будет последней
      const entryRecord = await user.parkingHistory.pop();
      user.parkingHistory.push(
        this.parkingRecorder.formatForDB(
          new ParkingHistoryElement(
            entryRecord.parkingTitle,
            carPlate,
            entryRecord.entryCarTime,
            departureCarTime,
          ),
        ),
      );

      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'The car departure was successfully registered',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }
}
