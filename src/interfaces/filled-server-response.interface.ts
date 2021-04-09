import { ServerResponse } from './server-response.interface';

export interface FilledServerResponse<T> extends ServerResponse {
  readonly value: T;
}
