import { Recorder } from './recorder.interface';
import { PhoneNumberRecord } from '../records/phoneNumber-record.infrastructure';

export class PhoneNumberRecorder implements Recorder<PhoneNumberRecord> {
  public formatForDB(model: PhoneNumberRecord): PhoneNumberRecord {
    return {
      value: this.verify(this.format(model.value)),
    };
  }

  private format(phoneNumber: string) {
    return phoneNumber[0] === '+'
      ? phoneNumber.replace(phoneNumber[1], '7')
      : '+' + phoneNumber.replace(phoneNumber[0], '7');
  }

  private verify(phoneNumber: string) {
    if (phoneNumber.length !== 12) {
      throw new Error('Invalid phone number format');
    }
    for (let i = 1; i !== 12; i++) {
      if (isNaN(Number(phoneNumber[i]))) {
        throw new Error('Invalid phone number format');
      }
    }
    return phoneNumber;
  }
}
