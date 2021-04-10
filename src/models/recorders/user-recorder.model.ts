import { Recorder } from '../../interfaces/recorder.interface';
import { UserRecord } from '../../interfaces/records/user-record.interface';
import * as bcrypt from 'bcrypt';

export class UserRecorder implements Recorder<UserRecord> {
  public async formatForDB(model) {
    const { phoneNumber, password, email, plates, parkingHistory } = model;
    const record: UserRecord = {
      phoneNumber,
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
