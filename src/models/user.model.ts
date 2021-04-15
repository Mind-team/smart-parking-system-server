import { UserRecord } from '../interfaces/records/user-record.interface';
import { ParkingRecord } from '../interfaces/records/parking-record.interface';
import { SignInData } from '../types/sign-in-data.type';
import { SignUpData } from '../types/sign-up-data.type';
import { PlateRecord } from '../interfaces/records/plate-record.interface';
import { PhoneNumberRecord } from '../interfaces/records/phoneNumber-record.interface';

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
