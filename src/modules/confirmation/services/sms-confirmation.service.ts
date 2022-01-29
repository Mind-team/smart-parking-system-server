import { Injectable } from '@nestjs/common';
import { IConfirmationService } from '../interfaces/confirmation-service.interface';

@Injectable()
export class SMSConfirmationService implements IConfirmationService {
  private storage: { [phone: string]: string } = {};

  sendConfirmationCode(target: string): void {
    this.storage[target] = '5555'; // TODO: Generate random code
  }

  isConfirmationCodeTrue(target: string, code: string): boolean {
    return this.storage[target] === code;
  }
}
