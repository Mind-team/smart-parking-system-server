import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisteredUserDocument } from '../mongo-db/schemas/registered-user.schema';
import { EntryCarParkingRecord } from './types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../../infrastructure/server-responses/successful-response.infrastructure';
import { FailedResponse } from '../../infrastructure/server-responses/failed-response.infrastructure';
import { DepartureCarParkingRecord } from './types/departure-car-parking-record.type';
import { UniquePlatesArray } from '../../models/unique-plates-array.model';
import { UserFactory } from '../../infrastructure/user-factory.infrastructure';
import { UnregisteredUserDocument } from '../mongo-db/schemas/unregistered-user.schema';
import { ParkingOwnerFactory } from '../../infrastructure/parking-owner-factory.infrastructure';
import { ParkingOwnerDocument } from '../mongo-db/schemas/parking-owner.schema';
import { User } from '../../models/interfaces/user.interface';
import { RegisteredUsersMongoService } from '../mongo-db/registered-users-mongo.service';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { RegisteredUserContent } from '../../models/interfaces/registered-user-content.interface';
import { UnregisteredUsersMongoService } from '../mongo-db/unregistered-users-mongo.service';
import { UnregisteredUserContent } from '../../models/interfaces/unregistered-user-content.interface';
import { ParkingOwnerMongoService } from '../mongo-db/parking-owner-mongo.service';
import { ParkingOwnerContent } from '../../models/interfaces/parking-owner-content.interface';

@Injectable()
export class ParkingService {
  readonly #registeredUsersCollection: Collection<RegisteredUserContent>;
  readonly #unregisteredUsersCollection: Collection<UnregisteredUserContent>;
  readonly #parkingOwnerModel: Collection<ParkingOwnerContent>;
  readonly #userFactory: UserFactory;
  readonly #parkingOwnerFactory: ParkingOwnerFactory;

  constructor(
    registeredUsersCollection: RegisteredUsersMongoService,
    unregisteredUsersCollection: UnregisteredUsersMongoService,
    parkingOwnerCollection: ParkingOwnerMongoService,
    @Inject('UserFactory')
    userFactory: UserFactory,
    @Inject('ParkingOwnerFactory')
    parkingOwnerFactory: ParkingOwnerFactory,
  ) {
    this.#registeredUsersCollection = registeredUsersCollection;
    this.#unregisteredUsersCollection = unregisteredUsersCollection;
    this.#userFactory = userFactory;
    this.#parkingOwnerFactory = parkingOwnerFactory;
    this.#parkingOwnerModel = parkingOwnerCollection;
  }

  registerCarEntry = async ({
    parkingOwnerId,
    carPlate,
    entryCarTime,
  }: EntryCarParkingRecord) => {
    try {
      let [userDocument, type] = await this.#userDocumentByPlate(carPlate);
      if (type === 'null') {
        userDocument = await this.#createUnregisteredUser(carPlate);
        type = 'unregistered';
      }
      const user = await this.#mapUserDocument(
        userDocument,
        type,
        parkingOwnerId,
      );
      user.registerParking(
        this.#userFactory.uncompletedParking(
          await this.#parkingOwnerById(parkingOwnerId),
          carPlate,
          entryCarTime,
        ),
      );
      await this.#saveUserToDB(user, type);
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successfully registered the entry of the car',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  };

  registerCarDeparture = async ({
    parkingOwnerId,
    carPlate,
    departureCarTime,
  }: DepartureCarParkingRecord) => {
    try {
      const [userDocument, type] = await this.#userDocumentByPlate(carPlate);
      if (type === 'null') {
        return new FailedResponse(HttpStatus.BAD_REQUEST, ''); // TODO: HANDLE IT!
      }
      const user = await this.#mapUserDocument(
        userDocument,
        type,
        parkingOwnerId,
      );
      const parking = user.lastParking('pop').complete(departureCarTime);
      user.registerParking(parking);
      await this.#saveUserToDB(user, type);
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'The car departure was successfully registered',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  };

  #userDocumentByPlate = async (
    plate: string,
  ): Promise<
    | [RegisteredUserContent, 'registered']
    | [UnregisteredUserContent, 'unregistered']
    | [null, 'null']
  > => {
    const user = await this.#registeredUsersCollection.findOne({
      plates: this.#userFactory.plate(plate).value,
    });
    if (user) {
      return [user, 'registered'];
    }
    const unregisteredUser = await this.#unregisteredUsersCollection.findOne({
      plates: this.#userFactory.plate(plate).value,
    });
    if (unregisteredUser) {
      return [unregisteredUser, 'unregistered'];
    }
    return [null, 'null'];
  };

  #mapUserDocument = async (
    userDocument: RegisteredUserContent | UnregisteredUserContent,
    userType: 'registered' | 'unregistered',
    parkingOwnerId: string,
  ) => {
    const parkingOwner = await this.#parkingOwnerById(parkingOwnerId);
    if (userType === 'registered') {
      const user = userDocument as RegisteredUserDocument;
      return this.#userFactory.user(
        this.#userFactory.phoneNumber(user.phoneNumber),
        user.password,
        new UniquePlatesArray(
          user.plates.map((value) => this.#userFactory.plate(value)),
        ),
        user.parkings.map((parking) =>
          this.#userFactory.completedParking(
            parkingOwner,
            parking.carPlate,
            parking.entryCarTime,
            parking.departureCarTime,
            parking.priceRub,
            parking.isCompleted,
          ),
        ),
        user.email,
      );
    }
    if (userType === 'unregistered') {
      return this.#userFactory.unregisteredUser(
        new UniquePlatesArray(
          userDocument.plates.map((value) => this.#userFactory.plate(value)),
        ),
        userDocument.parkings.map((parking) =>
          this.#userFactory.completedParking(
            parkingOwner,
            parking.carPlate,
            parking.entryCarTime,
            parking.departureCarTime,
            parking.priceRub,
            parking.isCompleted,
          ),
        ),
      );
    }
  };

  #createUnregisteredUser = async (plate: string) => {
    const user = this.#userFactory
      .unregisteredUser(
        new UniquePlatesArray([this.#userFactory.plate(plate)]),
        [],
      )
      .content();
    await this.#unregisteredUsersCollection.save(user);
    return user;
  };

  #parkingOwnerById = async (id: string) => {
    const parkingOwnerRecord = await this.#parkingOwnerModel.findOne({
      _id: id,
    });
    if (!parkingOwnerRecord) {
      throw new Error('There is no parking owner with this id');
    }
    return this.#parkingOwnerFactory.owner(
      id,
      parkingOwnerRecord.title,
      parkingOwnerRecord.costCalculationFunction,
    );
  };

  #saveUserToDB = async (
    user: User<'Registered'> | User<'Unregistered'>,
    type: 'registered' | 'unregistered',
  ) => {
    const userContent = user.content();
    if (type === 'registered') {
      await this.#registeredUsersCollection.updateOne(
        { plates: userContent.plates },
        userContent as RegisteredUserContent,
      );
    } else {
      await this.#unregisteredUsersCollection.updateOne(
        { plates: userContent.plates },
        userContent,
      );
    }
  };
}
