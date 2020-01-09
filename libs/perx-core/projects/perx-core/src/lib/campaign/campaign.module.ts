import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { V4CampaignService } from './v4-campaign.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { ICampaignService } from './icampaign.service';
import { WhistlerCampaignService } from './whistler-campaign.service';

import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward-popup/expire-timer/expire-timer.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

export function campaignServiceFactory(http: HttpClient, config: Config): ICampaignService {
  if (config.isWhistler) {
    return new WhistlerCampaignService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4CampaignService(http, config);
}

@NgModule({
  declarations: [
    RewardPopupComponent,
    ExpireTimerComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: ICampaignService,
      useFactory: campaignServiceFactory,
      deps: [HttpClient, Config]
    }
  ],
  exports: [
    RewardPopupComponent,
    ExpireTimerComponent
  ]
})
export class CampaignModule {
}
