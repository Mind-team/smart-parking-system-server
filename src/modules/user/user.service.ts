import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';
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
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async addPlateToUser({ phoneNumber, plate }: AddPlateToUserDto) {
    // TODO: Валидация пользователя
    // TODO: Валидация номера введенного
    try {
      const document = await this.userModel.updateOne(
        { phoneNumber },
        { $push: { plates: plate } },
      );
      return document.nModified === 0
        ? new HttpException(
            `User with ${phoneNumber} phone number does not exist`,
            HttpStatus.BAD_REQUEST,
          )
        : HttpStatus.OK;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(phoneNumber: string) {
    // TODO: Валидация пользователя (проверка пароля)
    try {
      const user = await this.userModel.findOne({ phoneNumber });
      return (
        user ??
        new HttpException(
          `User with ${phoneNumber} phone number does not exist`,
          HttpStatus.BAD_REQUEST,
        )
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
