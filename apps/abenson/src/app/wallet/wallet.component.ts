import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StatusLabelMapping, Voucher } from '@perx/core';
import { vouchers } from '../mock/vouchers.mock';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  public issuedVouchers: Observable<Voucher[]>;

  public redeemedVouchers: Observable<Voucher[]>;

  public mapping: StatusLabelMapping = {
    issued: 'Approved',
    redeemed: 'Redeemed',
    expired: 'Expired',
    reserved: 'Pending',
    released: 'Declined',
  };

  public ngOnInit(): void {
    this.issuedVouchers = of(vouchers);
    this.redeemedVouchers = of(vouchers);
  }
}
