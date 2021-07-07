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
import { SignUpData } from './types/sign-up-data.type';
import { Plate } from '../models/plate.model';
import { PhoneNumber } from '../models/phone-number.model';
import { UniquePlatesArray } from '../infrastructure/unique-plates-array.infrastructure';
import { Parking } from '../models/parking.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async signIn({ phoneNumber, password }: SignInData) {
    try {
      return new FilledSuccessfulResponse<UserRecord>(
        HttpStatus.OK,
        'Successful login',
        await this.#findUser(phoneNumber, password),
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async signUp({ phoneNumber, password, email, plates }: SignUpData) {
    try {
      if (plates.length === 0) {
        return new FailedResponse(
          HttpStatus.BAD_REQUEST,
          'Please enter your plate',
        );
      }
      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(),
      );
      const user = new User(
        new PhoneNumber(phoneNumber),
        hashedPassword,
        new UniquePlatesArray(plates.map((el) => new Plate(el))),
        [],
        email,
      );
      const userRecord = user.info();
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
      const userRecord = await this.#findUser(phoneNumber, password);
      const user = new User(
        new PhoneNumber(userRecord.phoneNumber),
        userRecord.password,
        new UniquePlatesArray(
          userRecord.plates.map((value) => new Plate(value)),
        ),
        userRecord.parkings.map(
          (value) =>
            new Parking(value.parkingTitle, value.carPlate, value.entryCarTime),
        ),
        userRecord.email,
      );
      user.addPlate(new Plate(plate));
      for (const key in user.info()) {
        userRecord[key] = user.info()[key];
      }
      await userRecord.save();
      return new SuccessfulResponse(
        HttpStatus.OK,
        'Plate number added successfully',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  // async lastParkingHistoryElement({ phoneNumber, password }: SignInData) {
  //   try {
  //     const user = await this.userModel.findOne({ phoneNumber });
  //     if (!user || !(await bcrypt.compare(password, user.password))) {
  //       return new FailedResponse(HttpStatus.BAD_REQUEST, 'Invalid data');
  //     }
  //     if (user.parkingHistory.length === 0) {
  //       return new FilledSuccessfulResponse(HttpStatus.OK, 'Success', {});
  //     }
  //     if (
  //       !user.parkingHistory[user.parkingHistory.length - 1].departureCarTime
  //     ) {
  //       const parking = user.parkingHistory[user.parkingHistory.length - 1];
  //       return new FilledSuccessfulResponse(
  //         HttpStatus.OK,
  //         'Success',
  //         this.parkingRecorder.formatForDB(
  //           new ParkingHistoryElement(
  //             parking.parkingTitle,
  //             parking.carPlate,
  //             parking.entryCarTime,
  //             new Date(Date.now()),
  //           ),
  //         ),
  //       );
  //     }
  //     return new FilledSuccessfulResponse(
  //       HttpStatus.OK,
  //       'Success',
  //       user.parkingHistory[user.parkingHistory.length - 1],
  //     );
  //   } catch (e) {
  //     return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
  //   }
  // }

  async #findUser(
    phoneNumber: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({ phoneNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Phone number or password incorrect');
    }
    return user;
  }
}
