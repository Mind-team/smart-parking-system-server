import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { ParkingRecorder } from '../../models/plain-parking-record.model';
import { EntryCarParkingRecord } from '../../types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../../models/server-responses/successful-response.model';
import { FailedResponse } from '../../models/server-responses/failed-response.model';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async registerCarEntry(data: EntryCarParkingRecord) {
    try {
      const user = await this.userModel.findOne({ plates: data.carPlate });
      if (!user) {
        // Обработка чела, которого нет в бд
        return;
      }
      user.parkingHistory.push(
        await new ParkingRecorder(
          data.parkingTitle,
          data.carPlate,
          data.entryCarTime,
        ).formatForDB(),
      );
      user.save();
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successfully registered the entry of the car',
      );
    } catch (e) {
      throw new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }
}
