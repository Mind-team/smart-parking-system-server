import { Module } from '@nestjs/common';
import { SMSConfirmationService } from './services/sms-confirmation.service';

@Module({
  providers: [SMSConfirmationService],
  exports: [SMSConfirmationService],
})
export class ConfirmationModule {}
