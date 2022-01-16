import { IParkingProcessMapper } from './parking-process-mapper.interface';
import { IParkingProcess } from '../../core/parking-process';
import {
  MongoDriver,
  MongoParking,
  MongoParkingProcess,
} from '../../modules/mongo';
import { IParking } from '../../core/parking';
import { IDriver } from '../../core/driver';

export class ParkingProcessMapperService extends IParkingProcessMapper {
  override fromDB(
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
  ): IParkingProcess {
    return undefined;
  }

  override fromDocument(
    document: MongoParkingProcess,
    additional: {
      documents?: { parking?: MongoParking; driver?: MongoDriver };
      models?: { parking?: IParking; driver?: IDriver };
    },
  ): IParkingProcess {
    return undefined;
  }

  override toDocument(model: IParkingProcess): MongoParkingProcess {
    return undefined;
  }
}
