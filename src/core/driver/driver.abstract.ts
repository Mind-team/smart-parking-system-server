import { _IDriver } from './driver.interface';
import { IRegisteredDriverData } from './registered/registered-driver-data.interface';
import { IUnregisteredDriverData } from './unregistered/unregistered-driver-data.interface';
import { DriverType } from './driver-type.enum';

export abstract class Driver<
  T extends IRegisteredDriverData | IUnregisteredDriverData,
> implements _IDriver<T>
{
  protected parkingProcessIds: string[];
  protected currentParkingProcessId: string;

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

  lastParkingProcessId(): string {
    return (
      this.currentParkingProcessId ??
      this.parkingProcessIds[this.parkingProcessIds.length - 1]
    );
  }

  abstract data(): T;

  abstract type(): DriverType;
}
