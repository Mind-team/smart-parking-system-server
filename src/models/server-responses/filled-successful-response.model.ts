import { HttpStatus } from '@nestjs/common';
import { FilledServerResponse } from '../../interfaces/server-responses/filled-server-response.interface';

export class FilledSuccessfulResponse<T> implements FilledServerResponse<T> {
  public readonly isExpected = true;
  constructor(
    public readonly status: HttpStatus,
    public readonly message: string,
    public readonly value: T,
  ) {}
}
