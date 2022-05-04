import { Config, ConfigService, IConfig } from '@perxtech/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IPreRedirectConfig {
  redirectBeforeLogin: string;
}

@Injectable({
  providedIn: 'root'
})

export class PreAuthGuard implements CanActivate {
  constructor(private router: Router, private config: Config, private configService: ConfigService) {
  }

  public canActivate(): Observable<boolean> {
    return this.configService.readAppConfig<IPreRedirectConfig>().pipe(
      map((config: IConfig<IPreRedirectConfig>) => {
        if (config.custom.redirectBeforeLogin && config.custom.redirectBeforeLogin !== '/login') {
          this.router.navigateByUrl(`${config.custom.redirectBeforeLogin}`);
          return false;
        }
        if (this.config.preAuth) {
          this.router.navigateByUrl('/loading');
          return false;
        }

        return true;
      })
    );

  }
}
