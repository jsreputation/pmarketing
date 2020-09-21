import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { CampaignServiceModule, LoyaltyModule, ProgressBarModule, SafeHtmlPipe, StampModule, SurveyModule } from '@perxtech/core';
import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule.forChild()
  ],
  providers: [
    SafeHtmlPipe
  ],
  exports: [
    RazAdaptedCampaignsCollectionComponent
  ]
})
export class RazAdaptedCampaignsCollectionModule { }
