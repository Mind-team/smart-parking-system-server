import { IMapper } from './mapper.interface';
import {
  MongoDriver,
  MongoParking,
  MongoParkingProcess,
} from '../../modules/mongo';
import { IParkingProcess } from '../../core/parking-process';
import { IParking } from '../../core/parking';
import { IDriver } from '../../core/driver';

export abstract class IParkingProcessMapper extends IMapper<
  IParkingProcess,
  MongoParkingProcess
> {
  abstract override fromDB(
    id: string,
    additional: {
      documents?: {
        parking?: MongoParking;
        driver?: MongoDriver;
      };
      models?: {
        parking?: IParking;
        driver?: IDriver;
      };
    },
  ): IParkingProcess;

  abstract override fromDocument(
    document: MongoParkingProcess,
    additional: {
      documents?: {
        parking?: MongoParking;
        driver?: MongoDriver;
      };
      models?: {
        parking?: IParking;
        driver?: IDriver;
      };
    },
  ): IParkingProcess;

  abstract override toDocument(model: IParkingProcess): MongoParkingProcess;
}
