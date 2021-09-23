import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignUp } from './types/sign-up.type';
import { ParkingOwnerFactory } from '../../infrastructure/parking-owner-factory.infrastructure';
import { FailedResponse } from '../../infrastructure/server-responses/failed-response.infrastructure';
import { SuccessfulResponse } from '../../infrastructure/server-responses/successful-response.infrastructure';
import { Collection } from '../../infrastructure/collection.infrastructure';
import { ParkingOwnerContent } from '../../models/interfaces/parking-owner-content.interface';
import { ParkingOwnerMongoService } from '../mongo-db/parking-owner-mongo.service';

@Injectable()
export class ParkingOwnerService {
  readonly #parkingOwnerCollection: Collection<ParkingOwnerContent>;
  readonly #parkingOwnerFactory: ParkingOwnerFactory;

  constructor(
    parkingOwnerModel: ParkingOwnerMongoService,
    @Inject('ParkingOwnerFactory')
    parkingOwnerFactory: ParkingOwnerFactory,
  ) {
    this.#parkingOwnerCollection = parkingOwnerModel;
    this.#parkingOwnerFactory = parkingOwnerFactory;
  }

  async signUp({ title, costCalculationFunction }: SignUp) {
    try {
      // TODO: Fix
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.#parkingOwnerCollection.save({
        title,
        costCalculationFunction,
      });
      return new SuccessfulResponse(
        HttpStatus.CREATED,
        'Successful registration',
      );
    } catch (e) {
      return new FailedResponse(HttpStatus.BAD_REQUEST, e.message);
    }
  }
}
