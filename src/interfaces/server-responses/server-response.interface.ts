import { HttpStatus } from '@nestjs/common';

export interface ServerResponse {
  readonly status: HttpStatus;
  readonly isExpected: boolean;
  readonly message: string;
}
