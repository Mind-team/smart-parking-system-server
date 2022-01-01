import { IParking } from './parking.interface';
import { NewParkingConstructor } from './new-parking-constructor.type';
import { ExistingParkingConstructor } from './existing-parking-constructor.type';
import { IParkingData } from './parking-data.interface';

export class Parking implements IParking {
  private readonly owner: any; // TODO: owner model
  private readonly name: string;
  private readonly address: string;
  private readonly parkingProcessesIds: string[];

  constructor(config: NewParkingConstructor | ExistingParkingConstructor) {
    this.owner = config.owner;
    this.name = config.name;
    this.address = config.address;
    this.parkingProcessesIds =
      'parkingProcessesIds' in config ? config.parkingProcessesIds : [];
  }

  data(): IParkingData {
    return undefined;
  }

  parkingSpacesCount(): { all: number; free: number; occupied: number } {
    return { all: 0, free: 0, occupied: 0 };
  }

  registerCarDeparture(): void {
    return undefined;
  }

  registerCarEntry(): void {
    return undefined;
  }
}
