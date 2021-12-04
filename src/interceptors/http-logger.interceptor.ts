import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs/promises';

@Injectable()
export class HTTPLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap((value: { status: number }) => {
        fs.appendFile(
          './logs.txt',
          (Date.now() - now).toString() + 'ms ' + value.status + ' --- ',
        ).then(() => console.log('Success'));
      }),
    );
  }
}
