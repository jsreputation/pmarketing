import { ConfigService, IConfig } from '@perxtech/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LegacyRouteGuard implements CanActivate {
  constructor(private router: Router, private configService: ConfigService) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.configService.readAppConfig<void>().pipe(
      map((config: IConfig<void>) => {
        if (config.homeAsProgressPage) {
          // razer
          this.router.navigate([`legacy-${route.url}`]);
        }

        return true;
      })
    );

  }
}
