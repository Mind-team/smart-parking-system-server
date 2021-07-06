import { Validator } from '../models/validator.interface';

export class PlateValidator implements Validator<string> {
  public isValid(plate: string): boolean {
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

  public tryFormat(plate: string): string | Error {
    const formatted = plate.toLowerCase();
    return this.isValid(formatted)
      ? formatted
      : new Error('Invalid plate format');
  }
}
