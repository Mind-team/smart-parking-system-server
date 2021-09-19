import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisteredUserDocument } from '../mongo-db/schemas/registered-user.schema';
import { Model } from 'mongoose';
import { RegisteredUserRecord } from '../../infrastructure/records/registered-user-record.infrastructure';
import * as bcrypt from 'bcrypt';
import { SignInData } from './types/sign-in-data.type';
import { FailedResponse } from '../../infrastructure/server-responses/failed-response.infrastructure';
import { SuccessfulResponse } from '../../infrastructure/server-responses/successful-response.infrastructure';
import { FilledSuccessfulResponse } from '../../infrastructure/server-responses/filled-successful-response.infrastructure';
import { SignUpData } from './types/sign-up-data.type';
import { UniquePlatesArray } from '../../models/unique-plates-array.model';
import { UserFactory } from '../../infrastructure/user-factory.infrastructure';
import { User } from '../../models/interfaces/user.interface';
import { UnregisteredUserDocument } from '../mongo-db/schemas/unregistered-user.schema';
import { RussianParkingOwnerFactory } from '../../infrastructure/russian-parking-owner-factory.infrastructure';
import { ParkingOwnerDocument } from '../mongo-db/schemas/parking-owner.schema';
import { ParkingRecord } from '../../infrastructure/records/parking-record.infrastructure';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { RegisteredUserContent } from '../../models/interfaces/registered-user-content.interface';
import { RegisteredUsersMongoService } from '../mongo-db/registered-users-mongo.service';
import { UnregisteredUsersMongoService } from '../mongo-db/unregistered-users-mongo.service';
import { UnregisteredUserContent } from '../../models/interfaces/unregistered-user-content.interface';

@Injectable()
export class UserService {
  readonly #registeredUsersCollection: Collection<RegisteredUserContent>;
  readonly #unregisteredUsersCollection: Collection<UnregisteredUserContent>;
  readonly #parkingOwnerModel: Model<ParkingOwnerDocument>;
  readonly #userFactory: UserFactory;
  readonly #parkingOwnerFactory: RussianParkingOwnerFactory;

  constructor(
    registeredUsersCollection: RegisteredUsersMongoService,
    unregisteredUsersCollection: UnregisteredUsersMongoService,
    @InjectModel('parking-owner')
    parkingOwnerModel: Model<ParkingOwnerDocument>,
    @Inject('UserFactory')
    userFactory: UserFactory,
    @Inject('ParkingOwnerFactory')
    parkingOwnerFactory: RussianParkingOwnerFactory,
  ) {
    this.#registeredUsersCollection = registeredUsersCollection;
    this.#unregisteredUsersCollection = unregisteredUsersCollection;
    this.#userFactory = userFactory;
    this.#parkingOwnerFactory = parkingOwnerFactory;
    this.#parkingOwnerModel = parkingOwnerModel;
  }

  signIn = async ({ phoneNumber, password }: SignInData) => {
    try {
      return new FilledSuccessfulResponse<RegisteredUserRecord>(
        HttpStatus.OK,
        'Successful login',
        (await this.#findUser(phoneNumber, password)).content(),
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  };

  signUp = async ({ phoneNumber, password, email, plates }: SignUpData) => {
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
      const existentInfo = await this.#unregisteredUsersCollection.findOne({
        plates,
      });
      const parkings = await this.#mapParkingDocument(
        existentInfo.parkings ?? [],
      );
      const user = this.#userFactory.user(
        this.#userFactory.phoneNumber(phoneNumber),
        hashedPassword,
        new UniquePlatesArray(plates.map((el) => this.#userFactory.plate(el))),
        parkings,
        email,
      );
      await this.#unregisteredUsersCollection.deleteOne({ plates });
      await this.#registeredUsersCollection.save(user.content());
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successful registration',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  };

  addPlateToUser = async ({
    phoneNumber,
    password,
    plate,
  }: SignInData & { plate: string }) => {
    // TODO: Проверка, что номер записался в пользователя
    try {
      const user = await this.#findUser(phoneNumber, password);
      user.addPlate(this.#userFactory.plate(plate));
      await this.#registeredUsersCollection.updateOne(
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
  };

  lastParkingHistoryElement = async ({ phoneNumber, password }: SignInData) => {
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
  };

  #findUser = async (
    phoneNumber: string,
    password: string,
  ): Promise<User<'Registered'>> => {
    const userRecord = await this.#registeredUsersCollection.findOne({
      phoneNumber: this.#userFactory.phoneNumber(phoneNumber).value,
    });
    if (!userRecord || !(await bcrypt.compare(password, userRecord.password))) {
      throw new Error('Phone number or password incorrect');
    }
    const parkings = await Promise.all(
      userRecord.parkings.map(async (parking) => {
        const parkingOwnerRecord = await this.#parkingOwnerModel.findById(
          parking.parkingOwnerId,
        );
        const owner = this.#parkingOwnerFactory.owner(
          parkingOwnerRecord._id,
          parkingOwnerRecord.title,
          parkingOwnerRecord.costCalculationFunction,
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
  };

  #mapParkingDocument = async (parkings: NonNullable<ParkingRecord[]>) => {
    return Promise.all(
      parkings.map(async (parking) => {
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
    );
  };
}
