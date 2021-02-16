import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CampaignServiceModule, UtilsModule } from '@perxtech/core';
import { ReferralComponent } from './referral.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ReferralComponent],
  exports: [ReferralComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    MatToolbarModule,
    MatButtonModule,
    UtilsModule,
    CampaignServiceModule.forChild(),
  ],
})
export class ReferralModule {}
