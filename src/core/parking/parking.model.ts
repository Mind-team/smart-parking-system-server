import { IParking } from './parking.interface';
import { NewParkingConstructor } from './new-parking-constructor.type';
import { ExistingParkingConstructor } from './existing-parking-constructor.type';
import { IParkingData } from './parking-data.interface';
import { IDriver } from '../driver';
import { IParkingProcess, ParkingProcess } from '../parking-process';
import { IParkingOwner } from '../parking-owner';
import { v4 as uuid } from 'uuid';

export class Parking implements IParking {
  private readonly _id: string;
  private readonly owner: IParkingOwner;
  private readonly name: string;
  private readonly address: string;
  private readonly parkingProcesses: IParkingProcess[];
  private readonly allParkingSpacesCount: number;

  constructor(
    config: NewParkingConstructor | ExistingParkingConstructor,
    options: {
      idGenerator: () => string;
    } = {
      idGenerator: uuid,
    },
  ) {
    this.owner = config.owner;
    this.name = config.name;
    this.address = config.address;
    this.allParkingSpacesCount = config.parkingSpacesCount;
    this.parkingProcesses =
      'parkingProcesses' in config ? config.parkingProcesses : [];
    this._id =
      '_id' in config && config._id ? config._id : options.idGenerator();
  }

  data(): IParkingData {
    return {
      _id: this._id,
      ownerId: this.owner.data()._id,
      name: this.name,
      address: this.address,
      parkingProcessesIds: this.parkingProcesses.map(
        (process) => process.data()._id,
      ),
      parkingSpacesCount: this.allParkingSpacesCount,
    };
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
    const process = this.parkingProcessByDriverId(driver.data()._id);
    process.complete();
    driver.completeParkingProcess();
  }

  registerCarEntry(driver: IDriver, transportPlate: string): void {
    const parkingProcess = new ParkingProcess({
      currency: 'RUB',
      parking: { _id: this._id, title: this.name },
      entryCarTime: new Date().toISOString(),
      driver,
      transportPlate,
    });
    driver.registerParkingProcess(parkingProcess.data()._id);
    this.parkingProcesses.push(parkingProcess);
  }

  // TODO: подразумевается поиск незаврешенного процесса, поправить название
  parkingProcessByDriverId(driverId: string): IParkingProcess {
    // https://github.com/Mind-team/smart-parking-system-server/issues/68
    // return this.parkingProcesses.find(
    //   (process) => process.data().driver._id === driverId,
    // );
    return this.parkingProcesses.find((process) => {
      const data = process.data();
      return data.driver._id === driverId && !data.isCompleted;
    });
  }
}
