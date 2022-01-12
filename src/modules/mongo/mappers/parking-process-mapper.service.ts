import { Injectable } from '@nestjs/common';
import { ParkingProcessMongoService } from '../services/parking-process-mongo.service';
import { IParkingProcess, ParkingProcess } from '../../../core/parking-process';
import { RegisteredDriverMapperService } from './registered-driver-mapper.service';
import { UnregisteredDriverMapperService } from './unregistered-driver-mapper.service';
import { MongoParkingProcess } from '../schemas/parking-process.schema';
import { ParkingMongoService } from '../services/parking-mongo.service';
import { DriverMapperService } from './driver-mapper.service';

@Injectable()
export class ParkingProcessMapperService {
  constructor(
    private readonly parkingProcessMongoService: ParkingProcessMongoService,
    private readonly parkingMongoService: ParkingMongoService,
    private readonly registeredDriverMapperService: RegisteredDriverMapperService,
    private readonly unregisteredDriverMapperService: UnregisteredDriverMapperService,
    private readonly driverMapperService: DriverMapperService,
  ) {}

  async fromDB(id: string): Promise<IParkingProcess> {
    const processDB = await this.parkingProcessMongoService.findById(id);
    if (!processDB) {
      throw new Error(`Parking process with ${id} id does not exist`);
    }
    const parkingDB = await this.parkingMongoService.findById(
      processDB.parkingId,
    );
    if (!parkingDB) {
      throw new Error(`Parking with ${processDB.parkingId} id does not exist`);
    }
    const driverModel = await this.driverMapperService.fromDB(
      processDB.driver._id,
    );
    return new ParkingProcess({
      _id: id,
      currency: 'RUB',
      parking: { _id: parkingDB._id, title: parkingDB.name },
      driver: driverModel,
      entryCarTime: processDB.entryCarTime,
      departureCarTime: processDB.departureCarTime,
      transportPlate: processDB.driver.carPlate,
    });
  }

  toDB(model: IParkingProcess): MongoParkingProcess {
    const modelData = model.data();
    return { ...modelData, parkingId: modelData.parking._id };
  }
}
