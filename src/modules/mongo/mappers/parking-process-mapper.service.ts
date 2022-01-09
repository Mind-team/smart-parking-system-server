import { BadRequestException, Injectable } from '@nestjs/common';
import { ParkingProcessMongoService } from '../services/parking-process-mongo.service';
import { IParkingProcess, ParkingProcess } from '../../../core/parking-process';
import { RegisteredDriverMapperService } from './registered-driver-mapper.service';
import { UnregisteredDriverMapperService } from './unregistered-driver-mapper.service';
import { MongoParkingProcess } from '../schemas/parking-process.schema';
import { ParkingMongoService } from '../services/parking-mongo.service';

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
    //TODO: добавить провреку на null. если null возвращать null либо эксепшен бросать
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
      _id: id,
      currency: 'RUB',
      parkingId: parkingDB._id,
      driver: driverModel,
      entryCarTime: processDB.entryCarTime,
      departureCarTime: processDB.departureCarTime,
      transportPlate: processDB.driver.carPlate,
    });
  }

  toDB(model: IParkingProcess): MongoParkingProcess {
    return model.data();
  }
}
