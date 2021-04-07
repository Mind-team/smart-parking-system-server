import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ParkingRecord } from '../../interfaces/parking-record.interface';
import { Model } from 'mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { PlainParkingRecord } from '../../models/plain-parking-record.model';

@Injectable()
export class ParkingService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async registerCarEntry(
    data: Omit<ParkingRecord, 'departureCarTime' | 'priceRub'>,
  ) {
    const user = await this.userModel.findOne({ plates: data.carPlate });
    const record = new PlainParkingRecord(
      data.carPlate,
      null,
      data.entryCarTime,
      data.parkingTitle,
      null,
    );
    user.parkingHistory.push(record);
    user.save();
    return HttpStatus.OK;
  }
}
