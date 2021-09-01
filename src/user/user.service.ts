import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUserDocument } from '../schemas/registered-user.schema';
import { Model, ObjectId } from 'mongoose';
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
import e from 'express';
import { UniqueArray } from '../models/interfaces/unique-array.interface';
import { Plate } from '../models/interfaces/plate.interface';
import { Parking } from '../models/interfaces/parking.interface';
import { RegisteredUserContent } from '../models/interfaces/registered-user-content.interface';
import { ParkingOwnerDocument } from '../schemas/parking-owner.schema';

@Injectable()
export class UserService {
  readonly #registeredUserModel: Model<RegisteredUserDocument>;
  readonly #unregisteredUserModel: Model<UnregisteredUserDocument>;
  readonly #userFactory: UserFactory;
  readonly #parkingOwnerFactory: RussianParkingOwnerFactory;
  readonly #parkingOwnerModel: Model<ParkingOwnerDocument>;

  constructor(
    @InjectModel('RegisteredUser')
    registeredUserModel: Model<RegisteredUserDocument>,
    @InjectModel('UnregisteredUser')
    unregisteredUserModel: Model<UnregisteredUserDocument>,
    @InjectModel('parking-owner')
    parkingOwnerModel: Model<ParkingOwnerDocument>,
    @Inject('UserFactory')
    userFactory: UserFactory,
    @Inject('ParkingOwnerFactory')
    parkingOwnerFactory: RussianParkingOwnerFactory,
  ) {
    this.#registeredUserModel = registeredUserModel;
    this.#unregisteredUserModel = unregisteredUserModel;
    this.#userFactory = userFactory;
    this.#parkingOwnerFactory = parkingOwnerFactory;
    this.#parkingOwnerModel = parkingOwnerModel;
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
      const parking = existentInfo
        ? await Promise.all(
            existentInfo.parkings.map(async (parking) => {
              const ownerRecord = await this.#parkingOwnerModel.findById(
                parking.parkingOwnerId,
              );
              const owner = this.#parkingOwnerFactory.owner(
                parking.parkingOwnerId,
                ownerRecord.title,
                ownerRecord.costCalculationFunction,
              );
              if (parking.isCompleted) {
                return this.#userFactory.completedParking(
                  owner,
                  parking.carPlate,
                  parking.entryCarTime,
                  parking.departureCarTime,
                  parking.priceRub,
                  parking.isCompleted,
                );
              }
              return this.#userFactory.uncompletedParking(
                owner,
                parking.carPlate,
                parking.entryCarTime,
              );
            }),
          )
        : [];
      const user = this.#userFactory.user(
        this.#userFactory.phoneNumber(phoneNumber),
        hashedPassword,
        new UniquePlatesArray(plates.map((el) => this.#userFactory.plate(el))),
        parking,
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
      console.log(user.content());
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
    const parkings = await Promise.all(
      userRecord.parkings.map(async (parking) => {
        const doc = await this.#parkingOwnerModel.findById(
          parking.parkingOwnerId,
        );
        const owner = this.#parkingOwnerFactory.owner(
          parking.parkingOwnerId,
          doc.title,
          doc.costCalculationFunction,
        );
        return this.#userFactory.completedParking(
          owner,
          parking.carPlate,
          parking.entryCarTime,
          parking.departureCarTime,
          parking.priceRub,
          parking.isCompleted,
        );
      }),
    );
    return this.#userFactory.user(
      this.#userFactory.phoneNumber(userRecord.phoneNumber),
      userRecord.password,
      new UniquePlatesArray(
        userRecord.plates.map((value) => this.#userFactory.plate(value)),
      ),
      parkings,
      userRecord.email,
    );
  }
}
