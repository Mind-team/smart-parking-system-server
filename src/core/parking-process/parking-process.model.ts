import { IParkingProcess } from './parking-process.interface';
import { NewParkingProcessConstructor } from './new-parking-process-constructor.type';
import { ExistingParkingProcessConstructor } from './existing-parking-process-constructor.type';
import { IParkingProcessData } from './parking-process-data.interface';

export class ParkingProcess implements IParkingProcess {
  private readonly parking: any; // TODO: Parking Model
  private readonly driver: any; // TODO: Driver Model
  private readonly entryCarTime: Date;
  private readonly departureCarTime: Date;
  private readonly isCompleted: boolean;
  private readonly payment: any; // TODO: Payment Model

  constructor(
    config: NewParkingProcessConstructor | ExistingParkingProcessConstructor,
  ) {
    // TODO: добавить работу с payment
    this.parking = config.parking;
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

  /**
   * @param asCompleted {boolean} -
   */
  data(asCompleted = false): IParkingProcessData {
    if (asCompleted && !this.isCompleted) {
    }
    return null;
  }
}
