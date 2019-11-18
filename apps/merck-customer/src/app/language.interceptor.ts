import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenStorage } from '@perx/core';
import { Injectable } from '@angular/core';
@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    constructor(
        private tokenStorage: TokenStorage
    ){}
    intercept(req: HttpRequest<any>, next : HttpHandler) {
        console.log( this.tokenStorage.getAppInfoProperty('lang'))
        req.headers.set('accept-language', this.tokenStorage.getAppInfoProperty('lang'))
        return next.handle(req);
    }
}