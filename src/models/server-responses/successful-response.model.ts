import { ServerResponse } from '../../interfaces/server-responses/server-response.interface';
import { HttpStatus } from '@nestjs/common';

export class SuccessfulResponse implements ServerResponse {
  public readonly isExpected = true;
  constructor(
    public readonly status: HttpStatus,
    public readonly message: string,
  ) {}
}
