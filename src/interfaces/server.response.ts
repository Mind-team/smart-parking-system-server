import { HttpStatus } from '@nestjs/common';

export interface ServerResponse {
  status: HttpStatus;
  isExpected: boolean;
  message: string;
}
