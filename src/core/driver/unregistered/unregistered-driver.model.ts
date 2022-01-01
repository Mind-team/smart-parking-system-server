import { IUnregisteredDriver } from './unregistered-driver.interface';
import { IUnregisteredDriverData } from './unregistered-driver-data.interface';
import { NewUnregisteredDriverConstructor } from './new-unregistered-driver-constructor.type';
import { ExistingUnregisteredDriverConstructor } from './existing-unregistered-driver-constructor.type';

export class UnregisteredDriver implements IUnregisteredDriver {
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
  }

  data(): IUnregisteredDriverData {
    return {
      carPlate: this.carPlate,
      parkingProcessIds: this.parkingProcessIds,
    };
  }
}
