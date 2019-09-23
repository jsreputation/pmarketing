import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { V4CampaignService } from './v4-campaign.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { ICampaignService } from './icampaign.service';
import { WhistlerCampaignService } from './whistler-campaign.service';

export function campaignServiceFactory(http: HttpClient, config: Config): ICampaignService {
  if (config.isWhistler) {
    return new WhistlerCampaignService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4CampaignService(http, config);
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ICampaignService,
      useFactory: campaignServiceFactory,
      deps: [HttpClient, Config]
    }
  ],
  exports: [
  ]
})
export class CampaignModule {
}
