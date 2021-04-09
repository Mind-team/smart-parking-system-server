import { HttpStatus } from '@nestjs/common';
import { FilledServerResponse } from '../interfaces/filled-server-response.interface';

export class FilledSuccessfulResponse<T> implements FilledServerResponse<T> {
  public isExpected = true;
  constructor(
    public status: HttpStatus,
    public message: string,
    public value: T,
  ) {}
}
