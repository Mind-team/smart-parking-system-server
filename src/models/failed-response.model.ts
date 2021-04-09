import { ServerResponse } from '../interfaces/server.response';
import { HttpStatus } from '@nestjs/common';

export class FailedResponse implements ServerResponse {
  public isExpected = false;
  constructor(public status: HttpStatus, public message: string) {}
}
