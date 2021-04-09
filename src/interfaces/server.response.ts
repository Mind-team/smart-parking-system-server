import { HttpStatus } from '@nestjs/common';

export interface ServerResponse<T> {
  status: HttpStatus;
  value?: T;
  isExpected: boolean;
  message: string;
}
