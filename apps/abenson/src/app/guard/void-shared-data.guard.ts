import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedDataService } from '../services/shared-data.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoidSharedDataGuard implements CanActivate {
  constructor(
    private sharedData: SharedDataService,
    private router: Router
  ) { }
  public canActivate(
    next: ActivatedRouteSnapshot,
  ): Observable<boolean> | boolean {
    if (!next.params || next.params.type !== 'password') {
      return true;
    }
    return this.sharedData.data.pipe(map(val => val !== null),
      tap(bool => !bool && this.router.navigate(['account', 'change-password'])));
  }

}
