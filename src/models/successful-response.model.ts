import { ServerResponseInterface } from '../interfaces/server-response.interface';
import { HttpStatus } from '@nestjs/common';

export class SuccessfulResponse<T> implements ServerResponseInterface<T> {
  public isExpected = true;
  constructor(
    public status: HttpStatus,
    public message: string,
    public value?: T,
  ) {}
}
