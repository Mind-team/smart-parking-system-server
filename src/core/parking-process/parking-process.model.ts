import { IParkingProcess } from './parking-process.interface';
import { NewParkingProcessConstructor } from './new-parking-process-constructor.type';
import { ExistingParkingProcessConstructor } from './existing-parking-process-constructor.type';
import { IParkingProcessData } from './parking-process-data.interface';
import { IDriver } from '../driver';
import { v4 as uuid } from 'uuid';

export class ParkingProcess implements IParkingProcess {
  private readonly _id: string;
  private readonly parking: { _id: string; title: string };
  private readonly driver: IDriver;
  private readonly transportPlate: string;
  private readonly entryCarTime: Date;
  private readonly departureCarTime: Date;
  private isCompleted: boolean;
  private readonly payment: unknown;

  constructor(
    config: NewParkingProcessConstructor | ExistingParkingProcessConstructor,
    options: {
      idGenerator: () => string;
    } = {
      idGenerator: uuid,
    },
  ) {
    this.parking = config.parking;
    this._id =
      '_id' in config && config._id ? config._id : options.idGenerator();
    this.transportPlate = config.transportPlate;
    this.driver = config.driver;
    this.entryCarTime = new Date(config.entryCarTime);
    if ('departureCarTime' in config && config.departureCarTime) {
      // Завершенный паркинг
      this.departureCarTime = new Date(config.departureCarTime);
      this.isCompleted = true;
      return;
    }
    // Незавершенный паркинг
    this.departureCarTime = null;
    this.isCompleted = false;
  }

  complete(): void {
    this.isCompleted = true;
  }

  data(asCompleted = false): IParkingProcessData {
    const result = {
      _id: this._id,
      parking: this.parking,
      driver: {
        _id: this.driver.data()._id,
        carPlate: this.transportPlate,
      },
      payment: {
        currency: 'RUB',
        value: null,
      },
      entryCarTime: this.entryCarTime.toISOString(),
      departureCarTime: null,
      isCompleted: this.isCompleted,
    };
    if (asCompleted || this.isCompleted) {
      result.departureCarTime =
        this.departureCarTime ?? new Date().toISOString();
      result.payment.value = this.calcPrice(
        (this.departureCarTime?.getTime() ?? new Date().getTime()) -
          this.entryCarTime.getTime(),
      );
      if (asCompleted) {
        result.isCompleted = true;
      }
      return result;
    }
    return result;
  }

  // TODO: костыль чтобы выставлялась сумма за паркинг
  // TODO: убрать когда сделаем систему формирования платежа
  private calcPrice(time: number) {
    const secs = time / 1000;
    return secs * 0.1;
  }
}
