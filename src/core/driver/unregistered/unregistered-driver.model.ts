import { IUnregisteredDriverData } from './unregistered-driver-data.interface';
import { NewUnregisteredDriverConstructor } from './new-unregistered-driver-constructor.type';
import { ExistingUnregisteredDriverConstructor } from './existing-unregistered-driver-constructor.type';
import { Driver } from '../driver.abstract';
import { v4 as uuid } from 'uuid';
import { DriverType } from '../driver-type.enum';

export class UnregisteredDriver extends Driver<IUnregisteredDriverData> {
  private readonly _id: string;
  private readonly carPlate: string;

  constructor(
    config:
      | NewUnregisteredDriverConstructor
      | ExistingUnregisteredDriverConstructor,
    options: {
      idGenerator: () => string;
    } = {
      idGenerator: uuid,
    },
  ) {
    super();
    this.carPlate = config.carPlate;
    this.parkingProcessIds =
      'parkingProcessIds' in config ? config.parkingProcessIds : [];
    this._id =
      '_id' in config && config._id ? config._id : options.idGenerator();
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
      type: DriverType.Unregistered,
    };
  }

  override type(): DriverType {
    return DriverType.Unregistered;
  }
}
