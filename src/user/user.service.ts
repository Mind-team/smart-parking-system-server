import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserRecord } from '../infrastructure/records/user-record.infrastructure';
import * as bcrypt from 'bcrypt';
import { SignInData } from './types/sign-in-data.type';
import { User } from '../models/user.model';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FilledSuccessfulResponse } from '../infrastructure/server-responses/filled-successful-response.infrastructure';
import { UserRecorder } from '../infrastructure/recorders/user-recorder.infrastructure';
import { SignUpData } from './types/sign-up-data.type';
import { Plate } from '../models/plate.model';
import { PhoneNumber } from '../models/phone-number.model';
import { PlateRecorder } from '../infrastructure/recorders/plate-recorder.infrastructure';
import { PhoneNumberRecorder } from '../infrastructure/recorders/phone-number-recorder.infrastructure';
import { ParkingHistoryElement } from '../models/parking-history-element.model';
import { ParkingRecorder } from '../infrastructure/recorders/parking-recorder.infrastructure';

@Injectable()
export class UserService {
  private readonly userRecorder = new UserRecorder();
  private readonly plateRecorder = new PlateRecorder();
  private readonly phoneNumberRecorder = new PhoneNumberRecorder();
  private readonly parkingRecorder = new ParkingRecorder();
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn({ phoneNumber, password }: SignInData) {
    try {
      const candidate = await this.userModel.findOne({
        phoneNumber: this.phoneNumberRecorder.formatForDB(phoneNumber),
      });
      if (!candidate) {
        return new FailedResponse(
          HttpStatus.BAD_REQUEST,
          `User with ${phoneNumber.value} phone number does not exist`,
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

  async signUp({ phoneNumber, password, email, plates }: SignUpData) {
    try {
      if (plates.length === 0) {
        return new Error('User has no plates');
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

  async addPlateToUser({
    phoneNumber,
    password,
    plate,
  }: SignInData & { plate: string }) {
    // TODO: Проверка, что номер записался в пользователя
    try {
      const user = await this.userModel.findOne({
        phoneNumber: this.phoneNumberRecorder.formatForDB(phoneNumber),
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid data');
      }
      await user.plates.push(this.plateRecorder.formatForDB(new Plate(plate)));
      await user.save();
      return new SuccessfulResponse(
        HttpStatus.OK,
        'Plate number added successfully',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async lastParkingHistoryElement({ phoneNumber, password }: SignInData) {
    try {
      const user = await this.userModel.findOne({
        phoneNumber: this.phoneNumberRecorder.formatForDB(phoneNumber),
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid data');
      }
      if (user.parkingHistory.length === 0) {
        return new FilledSuccessfulResponse(HttpStatus.OK, 'Success', {});
      }
      if (
        !user.parkingHistory[user.parkingHistory.length - 1].departureCarTime
      ) {
        const parking = user.parkingHistory[user.parkingHistory.length - 1];
        return new FilledSuccessfulResponse(
          HttpStatus.OK,
          'Success',
          this.parkingRecorder.formatForDB(
            new ParkingHistoryElement(
              parking.parkingTitle,
              parking.carPlate,
              parking.entryCarTime,
              new Date(Date.now()),
            ),
          ),
        );
      }
      return new FilledSuccessfulResponse(
        HttpStatus.OK,
        'Success',
        user.parkingHistory[user.parkingHistory.length - 1],
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }
}
