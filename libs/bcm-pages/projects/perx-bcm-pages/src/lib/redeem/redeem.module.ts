import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RedeemComponent } from './redeem.component';
import { MatButtonModule } from '@angular/material/button';
import { MerchantAdminModule, RewardsServiceModule } from '@perxtech/core';

@NgModule({
  declarations: [RedeemComponent],
  exports: [RedeemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RewardsServiceModule.forRoot(),
    MerchantAdminModule,
    TranslateModule.forChild(),
  ]
})
export class RedeemModule { }
