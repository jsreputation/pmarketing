import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule, RewardsModule } from '@perxtech/core';
import { ProgressCampaignComponent } from './progress-campaign.component';
import { MatCardModule } from '@angular/material/card';
import { ProgressInfoPipe } from './progress-pipes/info/progress-info.pipe';

@NgModule({
  declarations: [
    ProgressInfoPipe,
    ProgressCampaignComponent
  ],
  exports: [
    ProgressInfoPipe,
    ProgressCampaignComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProgressBarModule,
    RewardsModule.forChild()
  ]
})
export class ProgressCampaignModule { }
