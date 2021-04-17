import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { UserRecord } from '../../interfaces/records/user-record.interface';
import * as bcrypt from 'bcrypt';
import { SignInData } from '../../types/sign-in-data.type';
import { User } from '../../models/user.model';
import { FailedResponse } from '../../models/server-responses/failed-response.model';
import { SuccessfulResponse } from '../../models/server-responses/successful-response.model';
import { FilledSuccessfulResponse } from '../../models/server-responses/filled-successful-response.model';
import { Recorder } from '../../interfaces/recorder.interface';
import { UserRecorder } from '../../models/recorders/user-recorder.model';
import { SignUpData } from '../../types/sign-up-data.type';
import { Plate } from '../../models/plate.model';
import { PhoneNumber } from '../../models/phone-number.model';
import { PlateRecorder } from '../../models/recorders/plate-recorder.model';

@Injectable()
export class UserService {
  private readonly userRecorder = new UserRecorder();
  private readonly plateRecorder = new PlateRecorder();
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

  async signUp(userData: SignUpData) {
    try {
      const { phoneNumber, password, email, plates } = userData;
      if (plates.length === 0) {
        throw new Error('User has no plates');
      }
      const userRecord = await this.userRecorder.formatForDB(
        new User({
          phoneNumber: new PhoneNumber(phoneNumber.value),
          password,
          email,
          plates: plates.map((plate) => new Plate(plate.value)),
        }),
      );
      await new this.userModel({ ...userRecord }).save();
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successful registration',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async addPlateToUser(
    data: Pick<UserRecord, 'phoneNumber'> & { plate: string },
  ) {
    // TODO: Валидация пользователя
    // TODO: Проверка, что номер записался в пользователя
    try {
      const { phoneNumber, plate } = data;
      const document = await this.userModel.updateOne(
        { phoneNumber },
        { $push: { plates: this.plateRecorder.formatForDB(new Plate(plate)) } },
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
