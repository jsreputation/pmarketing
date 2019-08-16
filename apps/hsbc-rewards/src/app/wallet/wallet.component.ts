import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Voucher, VouchersService, VoucherComponent } from '@perx/core';
import { map } from 'rxjs/operators';

import { voucher } from '../../assets/mock/vouchers';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, AfterViewInit {
  public vouchers$: Observable<Voucher[]>;
  @ViewChild('voucherComponent', { static: false }) public voucherComponent: VoucherComponent;
  constructor(
    private vouchersService: VouchersService,
    public cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.vouchers$ = this.vouchersService.getAll()
      .pipe(
        map(() => {
          return voucher;
        })
      );
  }

  public ngAfterViewInit(): void {
    this.voucherComponent.voucher$ = of(voucher[0]);
  }
}
