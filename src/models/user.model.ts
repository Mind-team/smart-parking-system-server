import { PhoneNumber } from './phone-number.model';
import { Plate } from './plate.model';
import { Parking } from './parking.model';

export class User {
  private readonly phoneNumber: PhoneNumber;
  private readonly email?: string;
  private readonly password: string;
  private readonly plates: Plate[];
  private readonly parkings: Parking[];

  constructor(
    phoneNumber: PhoneNumber,
    password: string,
    plates: Plate[],
    parkings: Parking[],
    email?: string,
  ) {
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.plates = plates;
    this.parkings = parkings;
    this.email = email;
  }

  public info() {
    return {
      phoneNumber: this.phoneNumber.value,
      password: this.password,
      plates: this.plates.map((el) => el.value),
      parkings: this.parkings.map((el) => el.info()),
      email: this.email,
    };
  }
}
