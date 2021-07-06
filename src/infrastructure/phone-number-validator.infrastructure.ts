import { Validator } from '../models/validator.interface';

export class PhoneNumberValidator implements Validator<string> {
  isValid(phoneNumber: string): boolean {
    if (phoneNumber.length !== 12) {
      return false;
    }
    for (let i = 1; i !== 12; i++) {
      if (isNaN(Number(phoneNumber[i]))) {
        return false;
      }
    }
    return true;
  }

  tryFormat(phoneNumber: string): Error | string {
    const newValue =
      phoneNumber === '+'
        ? phoneNumber.replace(phoneNumber[1], '7')
        : '+' + phoneNumber.replace(phoneNumber[0], '7');
    if (this.isValid(newValue)) {
      return newValue;
    }
    return new Error('Invalid phone number format');
  }
}
