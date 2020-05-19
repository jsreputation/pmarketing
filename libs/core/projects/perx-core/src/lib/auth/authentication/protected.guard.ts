import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService, AUTH_SERVICE, PUBLIC_FALLBACK_PAGE_URI } from 'ngx-auth';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { ConfigService } from '../../config/config.service';
import { IConfig } from '../../config/models/config.model';

/**
 * Guard, checks access token availability and allows or disallows access to page,
 * and redirects out
 *
 * usage: { path: 'test', component: TestComponent, canActivate: [ AuthGuard ] }
 * NL: this is reimplementing ngx-auth, to have optional configuration of the redirect route
 * @export
 */
@Injectable()
export class ProtectedGuard implements CanActivate, CanActivateChild {

  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthService,
    @Inject(PUBLIC_FALLBACK_PAGE_URI) private publicFallbackPageUri: string,
    private router: Router,
    @Optional() private configService: ConfigService
  ) { }

  /**
   * CanActivate handler
   */
  public canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const getConfigOrNull = this.configService ? this.configService.readAppConfig().pipe(catchError(() => of(null))) : of(null);
    return combineLatest([this.authService.isAuthorized(), getConfigOrNull])
      .pipe(map(([isAuthorized, config]: [boolean, IConfig<void> | null]) => {
        if (!isAuthorized && !this.isPublicPage(state)) {
          if (this.authService.setInterruptedUrl) {
            this.authService.setInterruptedUrl(state.url);
          }

          this.navigate(oc(config).redirectBeforeLogin() || this.publicFallbackPageUri);

          return false;
        }

        return true;
      }));
  }

  /**
   * CanActivateChild handler
   */
  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  /**
   * Check, if current page is public fallback page
   */
  private isPublicPage(state: RouterStateSnapshot): boolean {
    return state.url === this.publicFallbackPageUri;
  }

  /**
   * Navigate away from the app / path
   */
  private navigate(url: string): void {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
