import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}
