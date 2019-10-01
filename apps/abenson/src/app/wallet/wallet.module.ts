import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { VouchersModule, IVoucherService } from '@perx/core';
import { SharedModule } from '../shared/shared.module';
import { vouchers } from '../mock/vouchers.mock';
import { of } from 'rxjs';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: (id: number) => of(vouchers.find(voucher => voucher.id === id)),
  reserveReward: () => of(vouchers[1]),
  redeemVoucher: () => of(null),
  issueReward: () => of()
};

@NgModule({
  declarations: [
    WalletComponent,
    VoucherDetailComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    VouchersModule,
    SharedModule
  ],
  providers: [
    { provide: IVoucherService, useValue: vouchersServiceStub },
  ]
})
export class WalletModule { }
