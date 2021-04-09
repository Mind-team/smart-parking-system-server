import { ServerResponse } from '../interfaces/server.response';
import { HttpStatus } from '@nestjs/common';

export class SuccessfulResponse implements ServerResponse {
  public isExpected = true;
  constructor(public status: HttpStatus, public message: string) {}
}
