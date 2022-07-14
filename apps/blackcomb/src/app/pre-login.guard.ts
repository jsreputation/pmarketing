import { AuthenticationService, ConfigService, IConfig } from '@perxtech/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IAfterRedirectConfig {
  redirectAfterLogin: string;
}

@Injectable({
  providedIn: 'root',
})
export class PreLoginGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private configService: ConfigService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.configService.readAppConfig<IAfterRedirectConfig>().pipe(
      map((config: IConfig<IAfterRedirectConfig>) => {
        if (route.queryParams.token) {
          this.auth.saveUserAccessToken(route.queryParams.token);

          if (config.custom && config.custom.redirectAfterLogin !== '/login') {
            this.router.navigateByUrl(`${config.custom.redirectAfterLogin}`);
            return false;
          }
          return true;
        }

        if (route.fragment) {
          this.auth.saveUserAccessToken(
            new URLSearchParams(route.fragment).get('token')
          );
          return true;
        }
      })
    );

    // use route guard as a pure interceptor
    // const token = this.auth.getUserAccessToken();
    // if (token) {
    //   return true;
    // }
    // return false;
  }
}
