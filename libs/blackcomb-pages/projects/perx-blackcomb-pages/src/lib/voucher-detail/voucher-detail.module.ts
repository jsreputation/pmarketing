import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { VouchersModule, UtilsModule, PipeUtilsModule } from '@perxtech/core';
import { VoucherDetailComponent } from './voucher-detail.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [VoucherDetailComponent],
  exports: [VoucherDetailComponent],
  imports: [
    CommonModule,
    VouchersModule,
    TranslateModule.forChild(),
    RouterModule,
    MatButtonModule,
    MatIconModule,
    UtilsModule,
    PipeUtilsModule
  ]
})
export class VoucherDetailModule { }
