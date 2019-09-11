import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from './campaign.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { ICampaignService } from './icampaign.service';

export function campaignServiceFactory(http: HttpClient, config: Config): ICampaignService {
  // Make decision on what to instantiate base on config
  return new CampaignService(http, config);
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
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
