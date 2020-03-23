import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { V4CampaignService } from './v4-campaign.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { ICampaignService } from './icampaign.service';
import { WhistlerCampaignService } from './whistler-campaign.service';

import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward-popup/expire-timer/expire-timer.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfigService } from '../config/config.service';

export function campaignServiceFactory(http: HttpClient, config: Config, configService: ConfigService): ICampaignService {
  if (config.isWhistler) {
    return new WhistlerCampaignService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4CampaignService(http, configService);
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
  providers: [],
  exports: [
    RewardPopupComponent,
    ExpireTimerComponent
  ]
})
export class CampaignModule {
}

@NgModule({
})
export class CampaignServiceModule {
  public static forRoot(): ModuleWithProviders<CampaignServiceModule> {
    return {
      ngModule: CampaignServiceModule,
      providers: [
        {
          provide: ICampaignService,
          useFactory: campaignServiceFactory,
          deps: [HttpClient, Config, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<CampaignServiceModule> {
    return {
      ngModule: CampaignServiceModule
    };
  }
}
