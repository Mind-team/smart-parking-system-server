import { BadRequestException, Injectable } from '@nestjs/common';
import { ParkingProcessMongoService } from '../../mongo/services/parking-process-mongo.service';
import { IParkingProcess, ParkingProcess } from '../../../core/parking-process';
import { IParking } from '../../../core/parking';
import { IDriver } from '../../../core/driver';
import { DriverMongoService, ParkingMongoService } from '../../mongo';
import { RegisteredDriverMapperService } from './registered-driver-mapper.service';
import { UnregisteredDriverMapperService } from './unregistered-driver-mapper.service';
import { MongoParkingProcess } from '../../mongo/schemas/parking-process.schema';

@Injectable()
export class ParkingProcessMapperService {
  constructor(
    private readonly parkingProcessMongoService: ParkingProcessMongoService,
    private readonly parkingMongoService: ParkingMongoService,
    private readonly registeredDriverMapperService: RegisteredDriverMapperService,
    private readonly unregisteredDriverMapperService: UnregisteredDriverMapperService,
  ) {}

  async fromDB(id: string): Promise<IParkingProcess> {
    const processDB = await this.parkingProcessMongoService.findById(id);
    const parkingDB = await this.parkingMongoService.findById(
      processDB.parkingId,
    );
    // TODO: add unregistered driver support
    const driverModel = await this.registeredDriverMapperService.fromDB(
      processDB.driver._id,
    );
    if (!driverModel || !parkingDB || !processDB) {
      // TODO: Handle it
      throw new BadRequestException('ну гг че');
    }
    return new ParkingProcess({
      currency: 'RUB',
      parkingId: parkingDB._id,
      driver: driverModel,
      entryCarTime: processDB.entryCarTime,
      departureCarTime: processDB.departureCarTime,
    });
  }

  toDB(model: IParkingProcess): MongoParkingProcess {
    return model.data();
  }
}
