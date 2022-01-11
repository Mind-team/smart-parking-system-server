import { NewRegisteredDriverConstructor } from './new-registered-driver-constructor.type';
import { ExistingRegisteredDriverConstructor } from './existing-registered-driver-constructor.type';
import { IRegisteredDriverData } from './registered-driver-data.interface';
import { v4 as uuid } from 'uuid';
import { Driver } from '../driver.abstract';
import { DriverType } from '../driver-type.enum';

export class RegisteredDriver extends Driver<IRegisteredDriverData> {
  private readonly _id: string;
  private readonly carPlates: string[];
  private readonly phoneNumber: string;
  private readonly password: string;
  private readonly email?: string;

  constructor(
    config:
      | NewRegisteredDriverConstructor
      | ExistingRegisteredDriverConstructor,
    options: {
      idGenerator: () => string;
    } = {
      idGenerator: uuid,
    },
  ) {
    super();
    this.carPlates = config.carPlates;
    this.phoneNumber = config.phoneNumber;
    this.password = config.password;
    this.email = config.email;
    this.parkingProcessIds = config.parkingProcessIds;
    this._id =
      '_id' in config && config._id ? config._id : options.idGenerator();
    this.currentParkingProcessId =
      'currentParkingProcessId' in config && config.currentParkingProcessId
        ? config.currentParkingProcessId
        : null;
  }

  data(): IRegisteredDriverData {
    return {
      _id: this._id,
      carPlates: this.carPlates,
      phoneNumber: this.phoneNumber,
      password: this.password,
      email: this.email,
      parkingProcessIds: this.parkingProcessIds,
      currentParkingProcessId: this.currentParkingProcessId,
      type: DriverType.Registered,
    };
  }

  override type(): DriverType {
    return DriverType.Registered;
  }
}
