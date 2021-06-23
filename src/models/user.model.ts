import { UserRecord } from '../infrastructure/records/user-record.infrastructure';
import { ParkingRecord } from '../infrastructure/records/parking-record.infrastructure';
import { SignInData } from '../user/types/sign-in-data.type';
import { SignUpData } from '../user/types/sign-up-data.type';
import { PlateRecord } from '../infrastructure/records/plate-record.infrastructure';
import { PhoneNumberRecord } from '../infrastructure/records/phoneNumber-record.infrastructure';

export class User implements UserRecord {
  private readonly _phoneNumber: PhoneNumberRecord;
  private readonly _password: string;
  private readonly _email: string;
  private readonly _plates: PlateRecord[];
  private readonly _parkingHistory: ParkingRecord[] = [];

  constructor(userData: UserRecord | SignInData | SignUpData) {
    this._phoneNumber = userData.phoneNumber;
    this._password = userData.password;
    if ('email' in userData) {
      this._email = userData.email ?? null;
    }
    if ('plates' in userData) {
      this._plates = userData.plates;
    }
    if ('parkingHistory' in userData) {
      this._parkingHistory = userData.parkingHistory;
    }
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get password() {
    return this._password;
  }

  get email() {
    return this._email;
  }

  get plates() {
    return this._plates;
  }

  get parkingHistory() {
    return this._parkingHistory;
  }
}
