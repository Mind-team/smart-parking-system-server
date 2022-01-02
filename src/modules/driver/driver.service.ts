import { Injectable } from '@nestjs/common';
import { IRegisteredDriverData, RegisteredDriver } from '../../core/driver';
import { DriverMongoService } from '../mongo';
import { NewRegisteredDriverConstructor } from '../../core/driver/registered/new-registered-driver-constructor.type';

@Injectable()
export class DriverService {
  constructor(private readonly driverMongoService: DriverMongoService) {}
  /**
   * Регистрация водителя. Проверят пользовался ли уже водитель нашей системой.
   * Если да - переносит всю информацию
   */
  async registerDriver(
    config: Omit<IRegisteredDriverData, '_id' | 'parkingProcessIds'>,
  ) {
    // TODO:
    // реализовать трансфер между незарегистрированным и заренистрированным
    // У незарегистрированных пользователей в carPlates только один элемент
    // Мы должны пройтись по carPlates из config. Каждый знак искать в бд
    // По итогу будет массив обьектов из бд
    const newDriverConfig: NewRegisteredDriverConstructor = {
      carPlates: config.carPlates,
      parkingProcessIds: [],
      // TODO: Hash password
      password: config.password,
      phoneNumber: config.phoneNumber,
    };
    const newDriverModel = new RegisteredDriver(newDriverConfig);
    await this.driverMongoService.save(newDriverModel.data());
  }
}
