import { Recorder } from './recorder.interface';
import { UserRecord } from '../records/user-record.interface';
import * as bcrypt from 'bcrypt';
import { PlateRecorder } from './plate-recorder.infrastructure';
import { PhoneNumberRecorder } from './phone-number-recorder.infrastructure';

export class UserRecorder implements Recorder<UserRecord> {
  private _plateRecorder = new PlateRecorder();
  private _phoneNumberRecorder = new PhoneNumberRecorder();

  public async formatForDB(model: UserRecord): Promise<UserRecord> {
    const { phoneNumber, password, email, plates, parkingHistory } = model;
    return {
      phoneNumber: this._phoneNumberRecorder.formatForDB(phoneNumber),
      password: await this.hashedPassword(password),
      email,
      plates: plates.map((plate) => this._plateRecorder.formatForDB(plate)),
      parkingHistory,
    };
  }

  private async hashedPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
