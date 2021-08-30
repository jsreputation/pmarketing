import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RedeemComponent } from './redeem.component';
import { MatButtonModule } from '@angular/material/button';
import { RewardsModule } from '../../rewards/rewards.module';
import { MerchantAdminModule } from '../../merchant-admin/merchant-admin.module';

@NgModule({
  declarations: [RedeemComponent],
  exports: [RedeemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RewardsModule.forRoot(),
    MerchantAdminModule,
    TranslateModule.forChild(),
  ]
})
export class RedeemModule { }
