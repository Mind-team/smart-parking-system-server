import { ServerResponseStatus } from '../interfaces/server-response.interface';

export class ServerResponse {
  private status: ServerResponseStatus;
  private error: string;

  constructor(status: ServerResponseStatus, error?: string) {
    this.status = status;
    this.error = error;
  }
}
