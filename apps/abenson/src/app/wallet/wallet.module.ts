import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { VouchersModule } from '@perx/core';
import { SharedModule } from '../shared/shared.module';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';

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
  ]
})
export class WalletModule { }
