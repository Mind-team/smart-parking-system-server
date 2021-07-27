import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUserDocument } from '../schemas/registered-user.schema';
import { Model } from 'mongoose';
import { RegisteredUserRecord } from '../infrastructure/records/registered-user-record.infrastructure';
import * as bcrypt from 'bcrypt';
import { SignInData } from './types/sign-in-data.type';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FilledSuccessfulResponse } from '../infrastructure/server-responses/filled-successful-response.infrastructure';
import { SignUpData } from './types/sign-up-data.type';
import { UniquePlatesArray } from '../models/unique-plates-array.model';
import { UserFactory } from '../infrastructure/user-factory.infrastructure';
import { User } from '../models/interfaces/user.interface';
import { UnregisteredUserDocument } from '../schemas/unregistered-user.schema';
import { RussianParkingOwnerFactory } from '../infrastructure/russian-parking-owner-factory.infrastructure';

@Injectable()
export class UserService {
  readonly #registeredUserModel: Model<RegisteredUserDocument>;
  readonly #unregisteredUserModel: Model<UnregisteredUserDocument>;
  readonly #userFactory: UserFactory;
  readonly #parkingOwnerFactory: RussianParkingOwnerFactory;

  constructor(
    @InjectModel('RegisteredUser')
    registeredUserModel: Model<RegisteredUserDocument>,
    @InjectModel('UnregisteredUser')
    unregisteredUserModel: Model<UnregisteredUserDocument>,
    @Inject('UserFactory')
    userFactory: UserFactory,
    @Inject('ParkingOwnerFactory')
    parkingOwnerFactory: RussianParkingOwnerFactory,
  ) {
    this.#registeredUserModel = registeredUserModel;
    this.#unregisteredUserModel = unregisteredUserModel;
    this.#userFactory = userFactory;
    this.#parkingOwnerFactory = parkingOwnerFactory;
  }

  async signIn({ phoneNumber, password }: SignInData) {
    try {
      return new FilledSuccessfulResponse<RegisteredUserRecord>(
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
      const existentInfo = await this.#unregisteredUserModel.findOne({
        plates,
      });
      const user = this.#userFactory.user(
        this.#userFactory.phoneNumber(phoneNumber),
        hashedPassword,
        new UniquePlatesArray(plates.map((el) => this.#userFactory.plate(el))),
        existentInfo
          ? existentInfo.parkings.map((parking) =>
              this.#userFactory.completedParking(
                this.#parkingOwnerFactory.owner(parking.parkingTitle, ''),
                parking.carPlate,
                parking.entryCarTime,
                parking.departureCarTime,
                parking.priceRub,
                parking.isCompleted,
              ),
            )
          : [],
        email,
      );
      await this.#unregisteredUserModel.deleteOne({ plates });
      await new this.#registeredUserModel(user.content()).save();
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
      user.addPlate(this.#userFactory.plate(plate));
      await this.#registeredUserModel.updateOne(
        { plates: plate },
        user.content(),
      );
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

  async #findUser(
    phoneNumber: string,
    password: string,
  ): Promise<User<'Registered'>> {
    const userRecord = await this.#registeredUserModel.findOne({
      phoneNumber: this.#userFactory.phoneNumber(phoneNumber).value,
    });
    if (!userRecord || !(await bcrypt.compare(password, userRecord.password))) {
      throw new Error('Phone number or password incorrect');
    }
    return this.#userFactory.user(
      this.#userFactory.phoneNumber(userRecord.phoneNumber),
      userRecord.password,
      new UniquePlatesArray(
        userRecord.plates.map((value) => this.#userFactory.plate(value)),
      ),
      userRecord.parkings.map((parking) =>
        this.#userFactory.completedParking(
          this.#parkingOwnerFactory.owner(parking.parkingTitle, ''),
          parking.carPlate,
          parking.entryCarTime,
          parking.departureCarTime,
          parking.priceRub,
          parking.isCompleted,
        ),
      ),
      userRecord.email,
    );
  }
}
