import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CampaignServiceModule,
  LoyaltyModule,
  RazAdaptedCampaignCardModule,
  StampModule,
} from '@perxtech/core';
import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    RazAdaptedCampaignsCollectionComponent
  ],
  imports: [
    CommonModule,
    StampModule,
    LoyaltyModule,
    RazAdaptedCampaignCardModule,
    MatCardModule,
    CampaignServiceModule.forChild(),
  ],
  exports: [
    RazAdaptedCampaignsCollectionComponent
  ]
})
export class RazAdaptedCampaignsCollectionModule { }
