import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OrderService } from './services/order.service';
import { IProfile } from '@perxtech/core';

@Injectable({
  providedIn: 'root'
})

export class OrderGuard implements CanActivate {
  private userDetails: IProfile;
  constructor( private router: Router,
               private orderService: OrderService ) {
    this.orderService.getScannedUser$.subscribe((userDetails: IProfile) => {
      this.userDetails = userDetails;
    });
  }

  public canActivate(): boolean {
    if (!this.userDetails) {
      this.router.navigate(['/home']);
    }


    return true;
  }

}
