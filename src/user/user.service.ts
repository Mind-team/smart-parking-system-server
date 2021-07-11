import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserRecord } from '../infrastructure/records/user-record.infrastructure';
import * as bcrypt from 'bcrypt';
import { SignInData } from './types/sign-in-data.type';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FilledSuccessfulResponse } from '../infrastructure/server-responses/filled-successful-response.infrastructure';
import { SignUpData } from './types/sign-up-data.type';
import { UniquePlatesArray } from '../infrastructure/unique-plates-array.infrastructure';
import { Factory } from '../infrastructure/factory.infrastructure';
import { User } from '../models/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @Inject('Factory')
    private readonly factory: Factory,
  ) {}

  async signIn({ phoneNumber, password }: SignInData) {
    try {
      return new FilledSuccessfulResponse<UserRecord>(
        HttpStatus.OK,
        'Successful login',
        (await this.#findUser(phoneNumber, password)).content(),
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
      const user = this.factory.user(
        this.factory.phoneNumber(phoneNumber),
        hashedPassword,
        new UniquePlatesArray(plates.map((el) => this.factory.plate(el))),
        [],
        email,
      );
      await new this.userModel(user.content()).save();
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
      const user = await this.#findUser(phoneNumber, password);
      user.addPlate(this.factory.plate(plate));
      await this.userModel.updateOne({ plates: plate }, user.content());
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
      const user = await this.#findUser(phoneNumber, password);
      const userRecord = user.content();
      if (userRecord.parkings.length === 0) {
        return new FilledSuccessfulResponse(HttpStatus.OK, 'Success', {});
      }
      return new FilledSuccessfulResponse(
        HttpStatus.OK,
        'Success',
        user.lastParking('peek').content(true),
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async #findUser(phoneNumber: string, password: string): Promise<User> {
    const userRecord = await this.userModel.findOne({
      phoneNumber: this.factory.phoneNumber(phoneNumber).value,
    });
    if (!userRecord || !(await bcrypt.compare(password, userRecord.password))) {
      throw new Error('Phone number or password incorrect');
    }
    return this.factory.user(
      this.factory.phoneNumber(userRecord.phoneNumber),
      userRecord.password,
      new UniquePlatesArray(
        userRecord.plates.map((value) => this.factory.plate(value)),
      ),
      userRecord.parkings.map((plate) =>
        this.factory.completedParking(
          plate.parkingTitle,
          plate.carPlate,
          plate.entryCarTime,
          plate.departureCarTime,
          plate.priceRub,
          plate.isCompleted,
        ),
      ),
      userRecord.email,
    );
  }
}
