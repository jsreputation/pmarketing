import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsModule } from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RewardsModule.forChild(),
    MatCardModule
  ]
})
export class ProgressCampaignModule { }
