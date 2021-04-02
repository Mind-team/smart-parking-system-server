import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { ServerResponse } from '../../models/server-response.model';
import { AddPlateToUserDto } from '../../dtos/add-plate-to-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(userData: User) {
    try {
      await new this.userModel({ ...userData }).save();
      return new ServerResponse('Success');
    } catch (e) {
      return new ServerResponse('Failed', e.message);
    }
  }

  async addPlateToUser({ phoneNumber, plate }: AddPlateToUserDto) {
    // TODO: Валидация пользователя
    try {
      const document = await this.userModel.updateOne(
        { phoneNumber },
        { $push: { plates: plate } },
      );
      return document.nModified === 0
        ? new ServerResponse(
            'Failed',
            `User with ${phoneNumber} phone number does not exist`,
          )
        : new ServerResponse('Success');
    } catch (e) {
      return new ServerResponse('Failed', e.message);
    }
  }

  async getUser(phoneNumber: string) {
    // TODO: Валидация пользователя
    try {
      const user = await this.userModel.findOne({ phoneNumber });
      return (
        user ??
        new ServerResponse(
          'Failed',
          `User with phone number ${phoneNumber} does not exist`,
        )
      );
    } catch (e) {
      return new ServerResponse('Failed', e.message);
    }
  }
}
