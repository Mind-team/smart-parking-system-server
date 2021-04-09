import { ServerResponseInterface } from '../interfaces/server-response.interface';
import { HttpStatus } from '@nestjs/common';

export class FailedResponse<T> implements ServerResponseInterface<T> {
  public isExpected = false;
  constructor(
    public status: HttpStatus,
    public message: string,
    public value?: T,
  ) {}
}
