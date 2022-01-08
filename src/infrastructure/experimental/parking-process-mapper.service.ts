import { IParkingProcessMapper } from './parking-process.interface';
import { IParkingProcess } from '../../core/parking-process';
import { MongoDriver, MongoParking } from '../../modules/mongo';

export class ParkingProcessMapperService extends IParkingProcessMapper {
  override fromDB(
    id: string,
    additional: {
      data: { refreshToken: string };
      documents: { parkingDocument: MongoParking; driverDocument: MongoDriver };
    },
  ): IParkingProcess {
    return undefined;
  }
}
