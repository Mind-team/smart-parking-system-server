import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntryCarParkingRecord } from '../../interfaces/parking-record.interface';
import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { PlainParkingRecorder } from '../../models/plain-parking-record.model';

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
        new PlainParkingRecorder(
          data.parkingTitle,
          data.carPlate,
          data.entryCarTime,
          null,
          null,
        ).formatToDB(),
      );
      user.save();
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException('Something is wrong', HttpStatus.BAD_GATEWAY);
    }
  }
}
