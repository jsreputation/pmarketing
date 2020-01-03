import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ApiConfig } from '@es-core/api-config';
import { AuthService } from '@es-core/services/auth.service';
import { SessionService } from '@es-core/services/session.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService,
              private authService: AuthService
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let contentType = {'Content-Type': 'application/vnd.api+json'};
    if (req.url.includes(ApiConfig.signIn)) {
      return next.handle(req);
    }
    if (req.url.includes(ApiConfig.uploadImagePath) || req.url.includes(ApiConfig.uploadFilePath)) {
      contentType = ({} as any);
    }
    const authReq = req.clone({
      setHeaders: {
        ...contentType,
        'Access-Control-Allow-Origin': '*',
        Authorization: this.sessionService.token || ''
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
