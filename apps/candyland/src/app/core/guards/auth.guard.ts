import {
  CanActivate,
  UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
  ) {
  }

  public canActivate(
  ): Observable<boolean | UrlTree> {
      return of(true);
  }
}
