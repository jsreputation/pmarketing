import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsModule } from '@perxtech/core';
import { ProgressCampaignComponent } from './progress-campaign.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ProgressCampaignComponent],
  exports: [ProgressCampaignComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RewardsModule.forChild()
  ]
})
export class ProgressCampaignModule { }
