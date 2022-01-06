import { IUnregisteredDriver } from './unregistered-driver.interface';
import { IUnregisteredDriverData } from './unregistered-driver-data.interface';
import { NewUnregisteredDriverConstructor } from './new-unregistered-driver-constructor.type';
import { ExistingUnregisteredDriverConstructor } from './existing-unregistered-driver-constructor.type';

// TODO: Create superclass for Drivers
export class UnregisteredDriver implements IUnregisteredDriver {
  private readonly _id: string;
  private readonly carPlate: string;
  private readonly parkingProcessIds: string[];
  private currentParkingProcessId: string;

  constructor(
    config:
      | NewUnregisteredDriverConstructor
      | ExistingUnregisteredDriverConstructor,
  ) {
    this.carPlate = config.carPlate;
    this.parkingProcessIds =
      'parkingProcessIds' in config ? config.parkingProcessIds : [];
    this._id = '_id' in config && config._id ? config._id : ''; // TODO: id generator
    this.currentParkingProcessId =
      'currentParkingProcessId' in config && config.currentParkingProcessId
        ? config.currentParkingProcessId
        : null;
  }

  data(): IUnregisteredDriverData {
    return {
      _id: this._id,
      carPlates: [this.carPlate],
      parkingProcessIds: this.parkingProcessIds,
      currentParkingProcessId: this.currentParkingProcessId,
    };
  }

  completeParkingProcess(): void {
    if (!this.currentParkingProcessId) {
      return;
    }
    this.parkingProcessIds.push(this.currentParkingProcessId);
    this.currentParkingProcessId = null;
  }

  registerParkingProcess(parkingProcessId: string): void {
    this.currentParkingProcessId = parkingProcessId;
  }
}
