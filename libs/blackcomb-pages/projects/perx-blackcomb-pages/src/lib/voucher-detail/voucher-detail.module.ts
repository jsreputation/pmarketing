import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { VouchersModule } from '@perxtech/core';
import { VoucherDetailComponent } from './voucher-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VoucherDetailComponent],
  exports: [VoucherDetailComponent],
  imports: [
    CommonModule,
    VouchersModule,
    TranslateModule.forChild(),
    RouterModule,
    MatButtonModule
  ]
})
export class VoucherDetailModule { }
