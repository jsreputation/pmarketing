import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorage } from './storage/token-storage.service';
@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    constructor(
        private tokenStorage: TokenStorage
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const lang = this.tokenStorage.getAppInfoProperty('lang');
        if (lang) {
            req.headers.set('accept-language', lang)
        }
        return next.handle(req);
    }
}