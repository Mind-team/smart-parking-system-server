import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignUp } from './types/sign-up.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParkingOwnerDocument } from '../mongo-db/schemas/parking-owner.schema';
import { ParkingOwnerFactory } from '../../infrastructure/parking-owner-factory.infrastructure';
import { FailedResponse } from '../../infrastructure/server-responses/failed-response.infrastructure';
import { SuccessfulResponse } from '../../infrastructure/server-responses/successful-response.infrastructure';

@Injectable()
export class ParkingOwnerService {
  readonly #parkingOwnerModel: Model<ParkingOwnerDocument>;
  readonly #parkingOwnerFactory: ParkingOwnerFactory;

  constructor(
    @InjectModel('parking-owner')
    parkingOwnerModel: Model<ParkingOwnerDocument>,
    @Inject('ParkingOwnerFactory')
    parkingOwnerFactory: ParkingOwnerFactory,
  ) {
    this.#parkingOwnerModel = parkingOwnerModel;
    this.#parkingOwnerFactory = parkingOwnerFactory;
  }

  async signUp({ title, costCalculationFunction }: SignUp) {
    try {
      await new this.#parkingOwnerModel({
        title,
        costCalculationFunction,
      }).save();
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successful registration',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }
}
