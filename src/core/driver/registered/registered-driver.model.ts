import { IRegisteredDriver } from './registered-driver.interface';
import { NewRegisteredDriverConstructor } from './new-registered-driver-constructor.type';
import { ExistingRegisteredDriverConstructor } from './existing-registered-driver-constructor.type';
import { IRegisteredDriverData } from './registered-driver-data.interface';

export class RegisteredDriver implements IRegisteredDriver {
  private readonly carPlate: string;
  private readonly phoneNumber: string;
  private readonly password: string;
  private readonly email?: string;
  private readonly parkingProcessIds: string[];

  constructor(
    config:
      | NewRegisteredDriverConstructor
      | ExistingRegisteredDriverConstructor,
  ) {
    this.carPlate = config.carPlate;
    this.phoneNumber = config.phoneNumber;
    this.password = config.password;
    this.email = config.email;
    this.parkingProcessIds = config.parkingProcessIds;
  }

  data(): IRegisteredDriverData {
    return {
      carPlate: this.carPlate,
      phoneNumber: this.phoneNumber,
      password: this.password,
      email: this.email,
      parkingProcessIds: this.parkingProcessIds,
    };
  }
}
