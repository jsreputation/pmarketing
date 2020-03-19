import {AuthenticationService} from '@perxtech/core';
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PreLoginGuard implements CanActivate {
  constructor(private auth: AuthenticationService) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.queryParams.token) {
      this.auth.saveUserAccessToken(route.queryParams.token);
      return true;
    }

    const token = this.auth.getUserAccessToken();
    if (token) {
      return true;
    }
    return false;
  }
}
