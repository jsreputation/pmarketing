import { AuthenticationService } from '@perx/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PreLoginGuard implements CanActivate {
    constructor(private auth: AuthenticationService) { }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.auth.getAccessToken().pipe(map((token) => {
            if (token) {
                return true;
            }
            if (route.queryParams.token) {
                this.auth.saveUserAccessToken(route.queryParams.token);
                return true;
            }
            return false;
        }));
    }
}
