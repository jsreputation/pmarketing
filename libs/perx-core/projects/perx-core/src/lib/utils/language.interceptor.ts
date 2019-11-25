import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorage } from './storage/token-storage.service';
import { Observable } from 'rxjs';
@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorage: TokenStorage
  ) { }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = this.tokenStorage.getAppInfoProperty('lang');
    if (lang) {
      req.headers.set('accept-language', lang);
    }
    return next.handle(req);
  }
}
