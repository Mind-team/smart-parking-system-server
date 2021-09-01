import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisteredUserDocument } from '../schemas/registered-user.schema';
import { EntryCarParkingRecord } from './types/entry-car-parking-record.type';
import { SuccessfulResponse } from '../infrastructure/server-responses/successful-response.infrastructure';
import { FailedResponse } from '../infrastructure/server-responses/failed-response.infrastructure';
import { DepartureCarParkingRecord } from './types/departure-car-parking-record.type';
import { UniquePlatesArray } from '../models/unique-plates-array.model';
import { UserFactory } from '../infrastructure/user-factory.infrastructure';
import { UnregisteredUserDocument } from '../schemas/unregistered-user.schema';
import { ParkingOwnerFactory } from '../infrastructure/parking-owner-factory.infrastructure';
import { ParkingOwnerDocument } from '../schemas/parking-owner.schema';

@Injectable()
export class ParkingService {
  readonly #registeredUserModel: Model<RegisteredUserDocument>;
  readonly #unregisteredUserModel: Model<UnregisteredUserDocument>;
  readonly #userFactory: UserFactory;
  readonly #parkingOwnerFactory: ParkingOwnerFactory;
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
    parkingOwnerFactory: ParkingOwnerFactory,
  ) {
    this.#registeredUserModel = registeredUserModel;
    this.#unregisteredUserModel = unregisteredUserModel;
    this.#userFactory = userFactory;
    this.#parkingOwnerFactory = parkingOwnerFactory;
    this.#parkingOwnerModel = parkingOwnerModel;
  }

  async registerCarEntry({
    parkingOwnerId,
    carPlate,
    entryCarTime,
  }: EntryCarParkingRecord) {
    try {
      let [userDocument, type] = await this.#userDocumentByPlate(carPlate);
      if (type === 'null') {
        userDocument = await this.#createUnregisteredUser(carPlate);
        type = 'unregistered';
      }
      const user = await this.#mappingUserDocument(
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
      if (type === 'registered') {
        console.log(user.content());
        await this.#registeredUserModel.updateOne(
          { plates: carPlate },
          user.content(),
        );
      } else {
        await this.#unregisteredUserModel.updateOne(
          { plates: carPlate },
          user.content(),
        );
      }
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successfully registered the entry of the car',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async registerCarDeparture({
    parkingOwnerId,
    carPlate,
    departureCarTime,
  }: DepartureCarParkingRecord) {
    try {
      const [userDocument, type] = await this.#userDocumentByPlate(carPlate);
      if (type === 'null') {
        return new FailedResponse(HttpStatus.BAD_REQUEST, ''); // TODO: HANDLE IT!
      }
      const user = await this.#mappingUserDocument(
        userDocument,
        type,
        parkingOwnerId,
      );
      const parking = user.lastParking('pop').complete(departureCarTime);
      user.registerParking(parking);
      if (type === 'registered') {
        await this.#registeredUserModel.updateOne(
          { plates: carPlate },
          user.content(),
        );
      } else {
        await this.#unregisteredUserModel.updateOne(
          { plates: carPlate },
          user.content(),
        );
      }
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'The car departure was successfully registered',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }

  async #userDocumentByPlate(
    plate: string,
  ): Promise<
    | [RegisteredUserDocument, 'registered']
    | [UnregisteredUserDocument, 'unregistered']
    | [null, 'null']
  > {
    const user = await this.#registeredUserModel.findOne({
      plates: this.#userFactory.plate(plate).value,
    });
    if (user) {
      return [user, 'registered'];
    }
    const unregisteredUser = await this.#unregisteredUserModel.findOne({
      plates: this.#userFactory.plate(plate).value,
    });
    if (unregisteredUser) {
      return [unregisteredUser, 'unregistered'];
    }
    return [null, 'null'];
  }

  async #mappingUserDocument(
    userDocument: RegisteredUserDocument | UnregisteredUserDocument,
    userType: 'registered' | 'unregistered',
    parkingOwnerId: string,
  ) {
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
  }

  async #createUnregisteredUser(plate: string) {
    return await new this.#unregisteredUserModel(
      this.#userFactory
        .unregisteredUser(
          new UniquePlatesArray([this.#userFactory.plate(plate)]),
          [],
        )
        .content(),
    ).save();
  }

  async #parkingOwnerById(id: string) {
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
  }
}
