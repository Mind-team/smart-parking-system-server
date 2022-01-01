import { IParking } from './parking.interface';
import { NewParkingConstructor } from './new-parking-constructor.type';
import { ExistingParkingConstructor } from './existing-parking-constructor.type';
import { IParkingData } from './parking-data.interface';
import { IDriver } from '../driver';
import { IParkingProcess, ParkingProcess } from '../parking-process';

export class Parking implements IParking {
  private readonly _id: string;
  private readonly owner: any; // TODO: owner model
  private readonly name: string;
  private readonly address: string;
  private readonly parkingProcesses: IParkingProcess[];
  private readonly allParkingSpacesCount: number;

  constructor(config: NewParkingConstructor | ExistingParkingConstructor) {
    this.owner = config.owner;
    this.name = config.name;
    this.address = config.address;
    this.allParkingSpacesCount = config.parkingSpacesCount;
    this.parkingProcesses =
      'parkingProcesses' in config ? config.parkingProcesses : [];
    this._id = '_id' in config && config._id ? config._id : ''; // TODO: password generator
  }

  data(): IParkingData {
    return undefined;
  }

  parkingSpacesCount(): { all: number; free: number; occupied: number } {
    const free = this.allParkingSpacesCount - this.parkingProcesses.length;
    return {
      all: this.allParkingSpacesCount,
      free,
      occupied: this.allParkingSpacesCount - free,
    };
  }

  registerCarDeparture(driver: IDriver): void {
    const process = this.parkingProcesses.find(
      (process) => process.data().driver._id === driver.data()._id,
    );
    process.complete();
    driver.addCompletedParkingProcess(process);
  }

  registerCarEntry(driver: IDriver): void {
    this.parkingProcesses.push(
      new ParkingProcess({
        currency: 'RUB',
        parking: this,
        driver: driver,
        entryCarTime: new Date().toISOString(),
      }),
    );
  }
}
