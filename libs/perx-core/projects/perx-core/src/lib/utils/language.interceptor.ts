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
    const request = req.clone({setHeaders: {'Accept-Language' : lang || 'en'}})
    return next.handle(request);
  }
}
