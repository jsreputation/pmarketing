import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule, VouchersModule } from '@perxtech/core';
import { RedeemComponent } from './redeem.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RedeemComponent],
  exports: [RedeemComponent],
  imports: [
    CommonModule,
    VouchersModule,
    TranslateModule.forChild(),
    MatButtonModule,
    UtilsModule,
    RouterModule
  ]
})
export class RedeemModule { }
