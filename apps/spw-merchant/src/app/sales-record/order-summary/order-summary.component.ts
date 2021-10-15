import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProfile, IMerchantInvoice } from '@perxtech/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  public user: IProfile;
  public invoice: IMerchantInvoice;
  public isPreActivatedUser: boolean = false;

  constructor(private orderService: OrderService,
              private router: Router) {
    this.orderService.getScannedUser$.subscribe((userDetails: IProfile) => {
      this.user = userDetails;
      this.isPreActivatedUser = this.user?.customProperties?.state === 'preactivated';
    });

    this.orderService.getInvoice$.subscribe((invoice: IMerchantInvoice) => {
      this.invoice = invoice;
    });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.orderService.setScannedUser(null);
    this.orderService.setInvoice(null);
  }

  public onClose(): void {
    this.router.navigate(['/home']);
  }

}
