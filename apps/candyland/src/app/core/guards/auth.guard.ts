import {
  // ActivatedRouteSnapshot,
  CanActivate,
  // Router,
  UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // private router: Router
  ) {
  }

  canActivate(
    // route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> {
      return of(true);
  }
}
