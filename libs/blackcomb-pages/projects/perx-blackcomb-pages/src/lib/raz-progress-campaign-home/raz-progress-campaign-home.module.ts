import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazProgressCampaignHomeComponent } from './raz-progress-campaign-home.component';
import { CampaignServiceModule, ProgressBarModule } from '@perxtech/core';
import { RazAdaptedCampaignsCollectionModule } from '../raz-adapted-campaigns-collection/raz-adapted-campaigns-collection.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RazProgressCampaignHomeComponent,
  ],
  exports: [RazProgressCampaignHomeComponent],
  imports: [
    CommonModule,
    CampaignServiceModule.forChild(),
    RazAdaptedCampaignsCollectionModule,
    ProgressBarModule,
    RouterModule
  ]
})
export class RazProgressCampaignHomeModule { }
