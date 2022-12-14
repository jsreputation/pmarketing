import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PipeUtilsModule,
  ProgressBarModule,
  ProgressInfoPipe,
  RewardsModule,
  RewardsServiceModule,
  TransactionsServiceModule,
  UtilsModule
} from '@perxtech/core';
import { RazProgressCampaignComponent } from './raz-progress-campaign.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    RazProgressCampaignComponent
  ],
  exports: [
    RazProgressCampaignComponent
  ],
  providers: [
    ProgressInfoPipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProgressBarModule,
    TransactionsServiceModule.forRoot(),
    UtilsModule,
    PipeUtilsModule,
    RewardsModule,
    RewardsServiceModule.forChild()
  ]
})
export class RazProgressCampaignModule { }
