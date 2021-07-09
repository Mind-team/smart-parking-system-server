import { Validator } from '../models/validator.interface';

export class PlateValidator implements Validator<string> {
  isValid(plate: string): boolean {
    const regex = /[а-я]\d\d\d[а-я][а-я]/;
    return !(plate.length !== 6 || !regex.test(plate));
  }

  tryFormat(plate: string): string {
    const formatted = plate.toLowerCase();
    if (!this.isValid(formatted)) {
      throw new Error('Invalid plate format');
    }
    return formatted;
  }
}
