import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from './campaign.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Config } from '../config/config';

export function campaignServiceFactory(http: HttpClient, config: Config): CampaignService {
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
      provide: CampaignService,
      useFactory: campaignServiceFactory,
      deps: [HttpClient, Config]
    }
  ],
  exports: [
  ]
})
export class CampaignModule {
}
