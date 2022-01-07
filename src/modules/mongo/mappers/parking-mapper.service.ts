import { Injectable } from '@nestjs/common';
import {
  ExistingParkingConstructor,
  IParking,
  Parking,
} from '../../../core/parking';
import { ParkingOwnerMapperService } from './parking-owner-mapper.service';
import { ParkingProcessMapperService } from './parking-process-mapper.service';
import { ParkingMongoService } from '../services/parking-mongo.service';
import { ParkingOwnerMongoService } from '../services/parking-owner-mongo.service';

@Injectable()
export class ParkingMapperService {
  constructor(
    private readonly parkingMongoService: ParkingMongoService,
    private readonly parkingOwnerMongoService: ParkingOwnerMongoService,
    private readonly parkingOwnerMapperService: ParkingOwnerMapperService,
    private readonly parkingProcessMapperService: ParkingProcessMapperService,
  ) {}

  async fromDB(id: string): Promise<IParking> {
    const parkingDB = await this.parkingMongoService.findById(id);
    const parkingOwnerModel = await this.parkingOwnerMapperService.fromDB(
      parkingDB.ownerId,
    );
    console.log('parkingDB2', parkingDB);
    const parkingProcesses = await Promise.all(
      parkingDB.parkingProcessesIds.map(
        async (processId) =>
          await this.parkingProcessMapperService.fromDB(processId),
      ),
    );
    console.log('parkingProcesses2', parkingProcesses);
    const config: ExistingParkingConstructor = {
      _id: parkingDB._id,
      name: parkingDB.name,
      address: parkingDB.address,
      owner: parkingOwnerModel,
      parkingSpacesCount: parkingDB.parkingSpacesCount,
      parkingProcesses,
    };
    return new Parking(config);
  }
}
