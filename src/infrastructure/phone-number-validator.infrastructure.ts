import { Validator } from '../models/interfaces/validator.interface';

export class PhoneNumberValidator implements Validator<string> {
  isValid(phoneNumber: string): boolean {
    const regexp = /\+7\d\d\d\d\d\d\d\d\d\d/;
    if (phoneNumber.length !== 12 || !regexp.test(phoneNumber)) {
      return false;
    }
    return true;
  }

  tryFormat(phoneNumber: string): string {
    const newValue =
      phoneNumber === '+'
        ? phoneNumber.replace(phoneNumber[1], '7')
        : '+' + phoneNumber.replace(phoneNumber[0], '7');
    if (!this.isValid(newValue)) {
      throw new Error('Invalid phone number format');
    }
    return newValue;
  }
}
