import { Validator } from '../models/validator.interface';

export class PlateValidator implements Validator<string> {
  isValid(plate: string): boolean {
    if (
      plate.length === 6 &&
      !isNaN(Number(plate.substring(1, 3))) &&
      isNaN(Number(plate[0])) &&
      isNaN(Number(plate[4])) &&
      isNaN(Number(plate[5]))
    ) {
      return true;
    }
    return false;
  }

  tryFormat(plate: string): string {
    const formatted = plate.toLowerCase();
    if (!this.isValid(formatted)) {
      throw new Error('Invalid plate format');
    }
    return formatted;
  }
}
