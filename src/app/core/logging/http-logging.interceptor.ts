import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {
  constructor(private log: LoggingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    let status: string;

    return next.handle(req).pipe(
      tap(
        () => status = 'succeeded',
        error => {
          this.log.error(error.message ? error.message : error.toString());
          status = 'failed';
        }
      ), finalize(() => {
        const elapsedTime = Date.now() - startTime;
        this.log.debug(`${req.method} ${req.urlWithParams} ${status} in ${elapsedTime} ms`);
      }));
  }
}
