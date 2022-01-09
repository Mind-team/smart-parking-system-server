import { IUnregisteredDriverData } from './unregistered-driver-data.interface';
import { NewUnregisteredDriverConstructor } from './new-unregistered-driver-constructor.type';
import { ExistingUnregisteredDriverConstructor } from './existing-unregistered-driver-constructor.type';
import { Driver } from '../driver.abstract';

export class UnregisteredDriver extends Driver<IUnregisteredDriverData> {
  private readonly _id: string;
  private readonly carPlate: string;

  constructor(
    config:
      | NewUnregisteredDriverConstructor
      | ExistingUnregisteredDriverConstructor,
  ) {
    super();
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
}
