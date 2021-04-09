import { ServerResponse } from './server.response';

export interface FilledServerResponse<T> extends ServerResponse {
  value: T;
}
