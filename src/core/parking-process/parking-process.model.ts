import { IParkingProcess } from './parking-process.interface';
import { NewParkingProcessConstructor } from './new-parking-process-constructor.type';
import { ExistingParkingProcessConstructor } from './existing-parking-process-constructor.type';
import { IParkingProcessData } from './parking-process-data.interface';
import { IDriver } from '../driver';

export class ParkingProcess implements IParkingProcess {
  private readonly parkingId: string;
  private readonly driver: IDriver;
  private readonly entryCarTime: Date;
  private readonly departureCarTime: Date;
  private readonly isCompleted: boolean;
  private readonly payment: unknown; // TODO: Payment Model

  constructor(
    config: NewParkingProcessConstructor | ExistingParkingProcessConstructor,
  ) {
    // TODO: добавить работу с payment
    this.parkingId = config.parkingId;
    this.driver = config.driver;
    this.entryCarTime = new Date(config.entryCarTime);
    if ('departureCarTime' in config && config.departureCarTime) {
      // Завершенный паркинг
      this.departureCarTime = null; // TODO: config.departureCarTime
      this.isCompleted = true;
      return;
    }
    // Незавершенный паркинг
    this.departureCarTime = null;
    this.isCompleted = false;
  }

  complete(): void {
    return;
  }

  data(asCompleted = false): IParkingProcessData {
    if (asCompleted && !this.isCompleted) {
    }
    return null;
  }
}
