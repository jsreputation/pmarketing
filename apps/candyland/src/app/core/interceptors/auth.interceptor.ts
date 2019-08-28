import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private router: Router) {
  // }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'Basic AFQNNUOBPRMSNLJEQCMY:y4QichclvXX4JE0DHHspZeWT3-svHbqe7B8CWklYW0KmyYPHJ0JOeg';
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/vnd.api+json',
        'Access-Control-Allow-Origin': '*',
        Authorization: authToken,
      }
    });
    return next.handle(authReq).pipe(catchError(this.handle401.bind(this)));
  }

  private handle401(err: any): Observable<any> {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      return throwError ('error 401');
    }
    return throwError(err);
  }
}
