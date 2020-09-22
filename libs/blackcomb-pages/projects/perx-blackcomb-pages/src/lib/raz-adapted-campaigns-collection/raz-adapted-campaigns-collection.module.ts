import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { CampaignServiceModule, LoyaltyModule, ProgressBarModule, StampModule, SurveyModule } from '@perxtech/core';
import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';

@NgModule({
  declarations: [
    RazAdaptedCampaignsCollectionComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProgressBarModule,
    SurveyModule,
    StampModule,
    LoyaltyModule,
    CampaignServiceModule.forChild(),
  ],
  exports: [
    RazAdaptedCampaignsCollectionComponent
  ]
})
export class RazAdaptedCampaignsCollectionModule { }
