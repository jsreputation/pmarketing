import { AuthenticationService, TokenStorage } from '@perxtech/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService, } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})

export class PreLoginGuard implements CanActivate {
  constructor(private auth: AuthenticationService,
              private tokenStorage: TokenStorage,
              private translate: TranslateService) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {

    if (route.queryParams.lang) {
      this.tokenStorage.setAppInfoProperty(route.queryParams.lang, 'lang');
      this.translate.use(route.queryParams.lang);
    }

    if (route.queryParams.token) {
      this.auth.saveUserAccessToken(route.queryParams.token);
      return true;
    }

    if (route.fragment) {
      this.auth.saveUserAccessToken(new URLSearchParams(route.fragment).get('token'));
      return true;
    }

    const token = this.auth.getUserAccessToken();
    if (token) {
      return true;
    }
    return false;
  }
}
