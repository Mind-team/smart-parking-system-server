import { Recorder } from '../../interfaces/recorder.interface';
import { UserRecord } from '../../interfaces/records/user-record.interface';
import * as bcrypt from 'bcrypt';
import { PlateRecorder } from './plate-recorder.model';

export class UserRecorder implements Recorder<UserRecord> {
  private _plateRecorder = new PlateRecorder();

  public async formatForDB(model: UserRecord): Promise<UserRecord> {
    const { phoneNumber, password, email, plates, parkingHistory } = model;
    return {
      phoneNumber,
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
