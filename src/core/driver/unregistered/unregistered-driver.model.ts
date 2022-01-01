import { IUnregisteredDriver } from './unregistered-driver.interface';
import { IUnregisteredDriverData } from './unregistered-driver-data.interface';
import { NewUnregisteredDriverConstructor } from './new-unregistered-driver-constructor.type';
import { ExistingUnregisteredDriverConstructor } from './existing-unregistered-driver-constructor.type';

export class UnregisteredDriver implements IUnregisteredDriver {
  private readonly _id: string;
  private readonly carPlate: string;
  private readonly parkingProcessIds: string[];

  constructor(
    config:
      | NewUnregisteredDriverConstructor
      | ExistingUnregisteredDriverConstructor,
  ) {
    this.carPlate = config.carPlate;
    this.parkingProcessIds =
      'parkingProcessIds' in config ? config.parkingProcessIds : [];
    this._id = '_id' in config && config._id ? config._id : ''; // TODO: id generator
  }

  data(): IUnregisteredDriverData {
    return {
      _id: this._id,
      carPlates: [this.carPlate],
      parkingProcessIds: this.parkingProcessIds,
    };
  }
}
