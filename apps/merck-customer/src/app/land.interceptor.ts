import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class LandInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next : HttpHandler) {
        req.headers.set('lang', 'ru')
        return next.handle(req);
    }
}