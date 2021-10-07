import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProfile, IMerchantInvoice } from '@perxtech/core';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  public user: IProfile;
  public invoice: IMerchantInvoice;
  public isPreActivatedUser: boolean = false;

  constructor(private orderService: OrderService) {
    this.orderService.getScannedUser$.subscribe((userDetails: IProfile) => {
      this.user = userDetails;
      this.isPreActivatedUser = this.user.customProperties?.state &&
        this.user.customProperties?.state === 'preactivated' ? true : false;
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

}
