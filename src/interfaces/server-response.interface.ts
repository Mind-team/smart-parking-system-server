import { HttpStatus } from '@nestjs/common';

export interface ServerResponseInterface<T> {
  status: HttpStatus;
  value?: T;
  isExpected: boolean;
  message: string;
}
