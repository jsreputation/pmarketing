import {
  CanActivate,
  Router, UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService } from '@cl-core/services/session.service';
import {Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router, private sessionService: SessionService) {
  }

  public canActivate(): Observable<UrlTree | boolean> {
    return this.sessionService.isActiveSession$.pipe(
      take(1),
      map(isActiveSession => {
        if (isActiveSession) {
          return this.router.parseUrl('/dashboard');
        }
        return true;
      })
    );
  }
}
