import { ServerResponse } from '../interfaces/server.response';
import { HttpStatus } from '@nestjs/common';

export class FailedResponse<T> implements ServerResponse<T> {
  public isExpected = false;
  constructor(public status: HttpStatus, public message: string) {}
}
