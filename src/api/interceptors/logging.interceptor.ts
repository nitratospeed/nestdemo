import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { appendFileSync, createWriteStream, writeFileSync } from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { homedir } from 'os';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const nowFormated = new Date().toISOString().replace('T', ' ').substring(0, 19)
    const filePath = join(homedir(), './nestjslog.txt');
    
    const methodName = context.getHandler().name;
    const controllerName = context.getClass().name;

    return next
      .handle()
      .pipe(
        tap(() => {
          let stream = createWriteStream(filePath, { flags: 'a',});

          stream.write(`${nowFormated} controller: ${controllerName} method: ${methodName} responseTime: ${Date.now() - now}ms \n`);

          stream.end();
        }),
      );
  }
}