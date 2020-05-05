import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorage } from '../storage/token-storage.service';

/** Add userId in the header of outgoing requests. */
@Injectable()
export class V4MicrositeSettingInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorage) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/v4/settings/microsite_settings')) {
      const appToken = this.tokenStorage.getAppInfoProperty('appAccessToken') as string;
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + appToken) });
    }
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: V4MicrositeSettingInterceptor, multi: true },
];
