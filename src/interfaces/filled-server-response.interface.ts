import { ServerResponse } from './server-response.interface';

export interface FilledServerResponse<T> extends ServerResponse {
  value: T;
}
