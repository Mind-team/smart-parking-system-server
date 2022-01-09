import { IParkingOwner } from './parking-owner.interface';
import { IParkingOwnerData } from './parking-owner-data.interface';
import { NewParkingOwnerConstructor } from './new-parking-owner-constructor.type';
import { ExistingParkingOwnerConstructor } from './existing-parking-owner-constructor.type';
import { v4 as uuid } from 'uuid';

export class ParkingOwner implements IParkingOwner {
  private readonly _id: string;
  private readonly name: string;
  private readonly password: string;
  private readonly parkingsIds: string[];

  constructor(
    config: NewParkingOwnerConstructor | ExistingParkingOwnerConstructor,
    options: {
      idGenerator: () => string;
    } = {
      idGenerator: uuid,
    },
  ) {
    this.name = config.name;
    this.password = config.password;
    this._id =
      '_id' in config && config._id ? config._id : options.idGenerator();
    this.parkingsIds =
      'parkingsIds' in config && config.parkingsIds ? config.parkingsIds : [];
  }

  data(): IParkingOwnerData {
    return {
      _id: this._id,
      name: this.name,
      password: this.password,
      parkingsIds: this.parkingsIds,
    };
  }
}
