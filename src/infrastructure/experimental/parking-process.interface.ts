import { IMapper } from './mapper.interface';
import {
  MongoDriver,
  MongoParking,
  MongoParkingProcess,
} from '../../modules/mongo';
import { IParkingProcess } from '../../core/parking-process';

export abstract class IParkingProcessMapper extends IMapper<
  IParkingProcess,
  MongoParkingProcess
> {
  abstract override fromDB(
    id: string,
    additional: {
      data: { refreshToken: string };
      documents: { parkingDocument: MongoParking; driverDocument: MongoDriver };
    },
  ): IParkingProcess;
}
