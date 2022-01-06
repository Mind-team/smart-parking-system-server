import { Injectable } from '@nestjs/common';
import { DriverMongoService, ParkingMongoService } from '../mongo';
import {
  IParkingData,
  Parking,
  NewParkingConstructor,
} from '../../core/parking';
import {
  ParkingOwnerMapperService,
  RegisteredDriverMapperService,
} from '../mappers';
import {
  IDriver,
  NewUnregisteredDriverConstructor,
  RegisteredDriver,
  UnregisteredDriver,
} from '../../core/driver';
import { ParkingProcess } from '../../core/parking-process';
import { ParkingProcessMapperService } from '../mappers/services/parking-process-mapper.service';
import { ParkingProcessMongoService } from '../mongo/services/parking-process-mongo.service';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingMongoService: ParkingMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
    private readonly driverMongoService: DriverMongoService,
    private readonly driverMapperService: RegisteredDriverMapperService,
    private readonly parkingProcessMapperService: ParkingProcessMapperService,
    private readonly parkingProcessMongoService: ParkingProcessMongoService,
  ) {}

  async createParking(
    data: Pick<IParkingData, 'ownerId' | 'name' | 'address'> & {
      parkingSpacesCount: number;
    },
  ) {
    const newParkingConfig: NewParkingConstructor = {
      name: data.name,
      address: data.address,
      parkingSpacesCount: data.parkingSpacesCount,
      owner: await this.parkingOwnerMapperService.fromDB(data.ownerId),
    };
    const parkingModel = new Parking(newParkingConfig);
    await this.parkingMongoService.save(parkingModel.data());
  }

  async registerTransportEntry(data: {
    parkingId: string;
    transportPlate: string;
  }) {
    const driverMongo = await this.driverMongoService.findOne({
      carPlates: { $in: [data.transportPlate] },
    });
    let driverModel: IDriver;
    if (!driverMongo) {
      driverModel = new UnregisteredDriver({
        carPlate: data.transportPlate,
      });
    } else {
      driverModel = new RegisteredDriver(driverMongo);
    }
    const newParkingProcess = new ParkingProcess({
      currency: 'RUB',
      parkingId: data.parkingId,
      driver: driverModel,
      entryCarTime: new Date().toISOString(),
    });
    await this.parkingProcessMongoService.save(
      this.parkingProcessMapperService.toDB(newParkingProcess),
    );
  }
}
