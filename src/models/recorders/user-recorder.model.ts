import { Recorder } from '../../interfaces/recorder.interface';
import { UserRecord } from '../../interfaces/records/user-record.interface';
import * as bcrypt from 'bcrypt';
import { PhoneNumberRecorder } from './phone-number-recorder.model';

export class UserRecorder implements Recorder<UserRecord> {
  private phoneNumberRecorder = new PhoneNumberRecorder();

  public async formatForDB(model: UserRecord) {
    const { phoneNumber, password, email, plates, parkingHistory } = model;
    const record: UserRecord = {
      phoneNumber: this.phoneNumberRecorder.formatForDB(phoneNumber),
      password: await this.hashedPassword(password),
      email,
      plates,
      parkingHistory,
    };
    return record;
  }

  private async hashedPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
