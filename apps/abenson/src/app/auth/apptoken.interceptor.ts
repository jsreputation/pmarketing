import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@perx/core';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AppTokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.getAppAccessToken()) {
            const token = 'Bearer ' + this.authenticationService.getAppAccessToken();
            req = req.clone({ headers: req.headers.set('access_token', token) });
            return next.handle(req);
        }
        return this.authenticationService.getAccessToken().pipe(switchMap((val) => {
            req = req.clone({ headers: req.headers.set('access_token', 'Bearer ' + val) });
            return next.handle(req);
        }));
    }
}
