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
    const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lhbS5hcGkud2hpc3RsZXIucGVyeHRlY2gub3JnIiwic3ViIjoidXJuOnBlcng6aWFtOjoyMjIyMjIyMjI6dXNlci9BZG1pbl8yIiwic2NvcGUiOiIqIiwiYXVkIjpbImh0dHBzOi8vYXBpLndoaXN0bGVyLnBlcnh0ZWNoLm9yZyJdLCJpYXQiOjE1NjY5NzY4MTl9.OinGl02k0CVn1fiTdPpCDTpi1TzyLp9tPJHvH4c2oR0';
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
