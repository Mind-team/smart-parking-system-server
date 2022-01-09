import { Injectable } from '@nestjs/common';
import { CollectionMongoBaseService } from '../abstractions/collection-mongo-base.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../enums/token.enum';
import { Model } from 'mongoose';
import { MongoParkingProcess } from '../schemas/parking-process.schema';

@Injectable()
export class ParkingProcessMongoService extends CollectionMongoBaseService<MongoParkingProcess> {
  constructor(
    @InjectModel(Token.ParkingProcess)
    model: Model<MongoParkingProcess>,
  ) {
    super(model);
  }
}
