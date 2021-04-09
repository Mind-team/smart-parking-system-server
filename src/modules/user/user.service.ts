import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { UserRecord } from '../../interfaces/user-record.interface';
import * as bcrypt from 'bcrypt';
import { SignInData } from '../../types/sign-in-data.type';
import { User } from '../../models/user.model';
import { FailedResponse } from '../../models/failed-response.model';
import { SuccessfulResponse } from '../../models/successful-response.model';
import { FilledSuccessfulResponse } from '../../models/filled-successful-response.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn(userData: SignInData) {
    try {
      const [phoneNumber, password] = [userData.phoneNumber, userData.password];
      const candidate = await this.userModel.findOne({ phoneNumber });
      if (!candidate) {
        return new FailedResponse(
          HttpStatus.BAD_REQUEST,
          `User with ${phoneNumber} phone number does not exist`,
        );
      }
      return (await bcrypt.compare(password, candidate.password))
        ? new FilledSuccessfulResponse<UserRecord>(
            HttpStatus.OK,
            'Successful login',
            candidate,
          )
        : new FailedResponse(HttpStatus.UNAUTHORIZED, 'Password do not match');
    } catch (e) {
      throw new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async signUp(userData: UserRecord) {
    try {
      // TODO: Нужно проверять, что все поля заполнены, кроме опциональных
      const newUser = await new User(userData).formatForDB();
      await new this.userModel({ ...newUser }).save();
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successful registration',
      );
    } catch (e) {
      throw new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async addPlateToUser(
    data: Pick<UserRecord, 'phoneNumber'> & { plate: string },
  ) {
    // TODO: Валидация пользователя
    // TODO: Валидация номера введенного
    // TODO: Проверка, что номер записался в пользователя
    try {
      const { phoneNumber, plate } = data;
      const document = await this.userModel.updateOne(
        { phoneNumber },
        { $push: { plates: plate } },
      );
      return document.nModified === 0
        ? new FailedResponse(
            HttpStatus.BAD_REQUEST,
            `User with ${phoneNumber} phone number does not exist`,
          )
        : new SuccessfulResponse(
            HttpStatus.OK,
            'Plate number added successfully',
          );
    } catch (e) {
      throw new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }
}
