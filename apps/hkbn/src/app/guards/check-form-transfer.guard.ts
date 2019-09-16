import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
  public canActivate(): Observable<boolean> {
    return this.dataTransfer.updateData$
      .pipe(map((data) => Boolean(data)),
        tap((data) => !data && this.router.navigate(['account'])));
  }
}
