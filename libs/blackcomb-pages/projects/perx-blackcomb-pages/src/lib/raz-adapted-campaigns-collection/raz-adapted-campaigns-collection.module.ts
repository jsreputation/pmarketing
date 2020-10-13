import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CampaignServiceModule,
  LoyaltyModule,
  RazAdaptedCampaignCardModule,
  StampModule,
} from '@perxtech/core';
import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';

@NgModule({
  declarations: [
    RazAdaptedCampaignsCollectionComponent
  ],
  imports: [
    CommonModule,
    StampModule,
    LoyaltyModule,
    RazAdaptedCampaignCardModule,
    CampaignServiceModule.forChild(),
  ],
  exports: [
    RazAdaptedCampaignsCollectionComponent
  ]
})
export class RazAdaptedCampaignsCollectionModule { }
