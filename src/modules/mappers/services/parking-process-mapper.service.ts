import { BadRequestException, Injectable } from '@nestjs/common';
import { ParkingProcessMongoService } from '../../mongo/services/parking-process-mongo.service';
import { IParkingProcess, ParkingProcess } from '../../../core/parking-process';
import { IParking } from '../../../core/parking';
import { IDriver } from '../../../core/driver';
import { DriverMongoService, ParkingMongoService } from '../../mongo';
import { RegisteredDriverMapperService } from './registered-driver-mapper.service';
import { UnregisteredDriverMapperService } from './unregistered-driver-mapper.service';

@Injectable()
export class parkingProcessMapperService {
  constructor(
    private readonly parkingProcessMongoService: ParkingProcessMongoService,
    private readonly parkingMongoService: ParkingMongoService,
    private readonly registeredDriverMapperService: RegisteredDriverMapperService,
    private readonly unregisteredDriverMapperService: UnregisteredDriverMapperService,
  ) {}

  async fromDB(id: string): IParkingProcess {
    const processDB = await this.parkingProcessMongoService.findById(id);
    const parkingDB = await this.parkingMongoService.findById(
      processDB.parkingId,
    );
    const driverModel =
    const driverDB = await this.driverMongoService.findById(
      processDB.driver._id,
    );
    if (!driverDB || !parkingDB || !processDB) {
      // TODO: Handle it
      throw new BadRequestException('ну гг че');
    }
    return new ParkingProcess({
      currency: 'RUB',
      parkingId: parkingDB._id,
      driver: IDriver,
      entryCarTime: string,
      departureCarTime,
    });
  }
}
