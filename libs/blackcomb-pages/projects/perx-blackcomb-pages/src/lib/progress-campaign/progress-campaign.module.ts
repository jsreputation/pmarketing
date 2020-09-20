import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsModule } from '@perxtech/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RewardsModule.forChild()
  ]
})
export class ProgressCampaignModule { }
