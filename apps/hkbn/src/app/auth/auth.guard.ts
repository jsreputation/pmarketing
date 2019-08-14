import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@perx/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const redirectTo = route.data.redirectTo || '/login';
    const disallowAccess = route.data.disallowAccess || false;
    return this.authenticationService.isAuthorized().pipe(
      map((isAuthed: boolean) => {
        const tree = this.router.parseUrl(redirectTo);
        if ((disallowAccess && isAuthed) || (!disallowAccess && !isAuthed)) {
          return tree;
        }
        return true;
      }),
      take(1)
    );
  }
}
