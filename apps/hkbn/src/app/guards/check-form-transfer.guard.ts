import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataTransferService } from '../services/data-transfer.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckFormTransferGuard implements CanActivate {
  constructor(
    private dataTransfer: DataTransferService,
    private router: Router
  ) { }
  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (route.params.id !== 'password') {
      return true;
    }
    return this.dataTransfer.updateData$
      .pipe(map((data) => Boolean(data)),
        tap((data) => !data && this.router.navigate(['account'])));
  }
}
