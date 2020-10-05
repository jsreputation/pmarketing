import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule, ProgressInfoPipe, RewardsModule, UtilsModule } from '@perxtech/core';
import { ProgressCampaignComponent } from './progress-campaign.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ProgressCampaignComponent
  ],
  exports: [
    ProgressCampaignComponent
  ],
  providers: [
    ProgressInfoPipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProgressBarModule,
    UtilsModule,
    RewardsModule.forChild()
  ]
})
export class ProgressCampaignModule { }
