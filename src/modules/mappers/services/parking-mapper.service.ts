import { Injectable } from '@nestjs/common';
import { ParkingMongoService, ParkingOwnerMongoService } from '../../mongo';
import {
  ExistingParkingConstructor,
  IParking,
  Parking,
} from '../../../core/parking';
import { ParkingOwnerMapperService } from './parking-owner-mapper.service';
import { ParkingProcessMapperService } from './parking-process-mapper.service';

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
    const parkingProcesses = await Promise.all(
      parkingDB.parkingProcessesIds.map(
        async (processId) =>
          await this.parkingProcessMapperService.fromDB(processId),
      ),
    );
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
