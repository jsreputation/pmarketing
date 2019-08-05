import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher/voucher.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { VouchersModule } from '@perx/core';
import { MatTabsModule } from '@angular/material';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [VoucherComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    VoucherRoutingModule,
    VouchersModule.forRoot({ env: environment }),
    MatTabsModule
  ]
})
export class VoucherModule { }
