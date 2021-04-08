import { UserRecord } from '../interfaces/user-record.interface';
import { ParkingRecord } from '../interfaces/parking-record.interface';
import * as bcrypt from 'bcrypt';
import { Recorder } from '../interfaces/recorder.interface';

export class User implements Recorder<UserRecord> {
  private readonly _phoneNumber: string;
  private readonly _password: string;
  private _email: string;
  private _plates: string[];
  private _parkingHistory: ParkingRecord[];

  constructor(userRecord: UserRecord) {
    this._phoneNumber = userRecord.phoneNumber;
    this._password = userRecord.password;
    this._email = userRecord.email ?? null;
    this._plates = userRecord.plates;
    this._parkingHistory = userRecord.parkingHistory;
  }

  public async formatForDB() {
    const record: UserRecord = {
      email: this._email,
      parkingHistory: this._parkingHistory,
      password: await this.hashedPassword(),
      phoneNumber: this._phoneNumber,
      plates: this._plates,
    };
    return record;
  }

  private async hashedPassword() {
    return await bcrypt.hash(this._password, await bcrypt.genSalt());
  }
}
