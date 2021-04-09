import { ServerResponse } from '../interfaces/server-response.interface';
import { HttpStatus } from '@nestjs/common';

export class FailedResponse implements ServerResponse {
  public readonly isExpected = false;
  constructor(
    public readonly status: HttpStatus,
    public readonly message: string,
  ) {}
}
