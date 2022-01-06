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
  NewUnregisteredDriverConstructor,
  UnregisteredDriver,
} from '../../core/driver';
import { ParkingProcess } from '../../core/parking-process';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingMongoService: ParkingMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
    private readonly driverMongoService: DriverMongoService,
    private readonly driverMapperService: RegisteredDriverMapperService,
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
    if (!driverMongo) {
      const newDriver = new UnregisteredDriver({
        carPlate: data.transportPlate,
      });
    }
    const parkingDB = await this.parkingMongoService.findById(data.parkingId);
    const newParkingProcess = new ParkingProcess({ currency: 'RUB' });
  }
}
