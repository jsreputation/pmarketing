import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VoucherRoutingModule} from './voucher-routing.module';
import {VoucherComponent} from './voucher/voucher.component';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {VouchersModule as PerxVouchersModule} from '@perx/core';
import {MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [VoucherComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    VoucherRoutingModule,
    PerxVouchersModule,
    MatTabsModule
  ]
})
export class VoucherModule {
}
