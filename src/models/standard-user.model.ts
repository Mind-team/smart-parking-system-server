import { UniqueArray } from './interfaces/unique-array.interface';
import { User } from './interfaces/user.interface';
import { PhoneNumber } from './interfaces/phone-number.interface';
import { Plate } from './interfaces/plate.interface';
import { Parking } from './interfaces/parking.interface';
import { RegisteredUserContent } from './interfaces/registered-user-content.interface';
import { UnregisteredStandardUser } from './unregistered-standard-user.model';

export class StandardUser
  extends UnregisteredStandardUser
  implements User<'Registered'>
{
  readonly #phoneNumber: PhoneNumber;
  readonly #email?: string;
  readonly #password: string;

  constructor(
    phoneNumber: PhoneNumber,
    password: string,
    plates: UniqueArray<Plate>,
    parkings: Parking[],
    email?: string,
  ) {
    super(plates, parkings);
    this.#phoneNumber = phoneNumber;
    this.#password = password;
    this.#email = email;
  }

  override content(): RegisteredUserContent {
    return {
      phoneNumber: this.#phoneNumber.value,
      password: this.#password,
      plates: super.content().plates,
      parkings: super.content().parkings,
      email: this.#email,
    };
  }
}
