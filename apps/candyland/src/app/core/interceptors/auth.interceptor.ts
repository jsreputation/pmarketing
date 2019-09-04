import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '@cl-core-services';
import { ApiConfig } from '@cl-core/api-config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '@cl-core/services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private authService: AuthService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(ApiConfig.signIn)) {
      return next.handle(req);
    }
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/vnd.api+json',
        'Access-Control-Allow-Origin': '*',
        Authorization: this.tokenService.token || ''
      }
    });
    return next.handle(authReq).pipe(catchError(this.handle401.bind(this)));
  }

  private handle401(err: any): Observable<any> {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      this.authService.logout();
      return throwError('error 401');
    }
    return throwError(err);
  }
}
