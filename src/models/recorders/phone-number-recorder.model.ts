import { Recorder } from '../../interfaces/recorder.interface';
import { PhoneNumberRecord } from '../../interfaces/records/phoneNumber-record.interface';

export class PhoneNumberRecorder implements Recorder<PhoneNumberRecord> {
  public async formatForDB(model: PhoneNumberRecord) {
    const refactoredPhoneNumber = this.toRightFormat(model.value);
    return { value: this.verify(refactoredPhoneNumber) };
  }

  private toRightFormat(phoneNumber: string) {
    if (phoneNumber[0] === '+') {
      phoneNumber.replace(phoneNumber[1], '7');
      return phoneNumber;
    }
    phoneNumber.replace(phoneNumber[0], '7');
    return '+' + phoneNumber;
  }

  private verify(phoneNumber: string) {
    if (phoneNumber.length === 12) {
      return phoneNumber;
    }
    throw new Error('Invalid phone number format');
  }
}
