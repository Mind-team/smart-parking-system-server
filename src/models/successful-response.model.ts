import { ServerResponse } from '../interfaces/server.response';
import { HttpStatus } from '@nestjs/common';

export class SuccessfulResponse<T> implements ServerResponse<T> {
  public isExpected = true;
  constructor(
    public status: HttpStatus,
    public message: string,
    public value?: T,
  ) {}
}
