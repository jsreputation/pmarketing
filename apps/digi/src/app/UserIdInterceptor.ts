import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/** Add userId in the header of outgoing requests. */
@Injectable()
export class UserIdInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId: string = localStorage.getItem('user-id') as string;
    if (!userId) {
      return throwError('Missing userId');
    }
    req = req.clone({ headers: req.headers.set('user-id', userId) });
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UserIdInterceptor, multi: true },
];
