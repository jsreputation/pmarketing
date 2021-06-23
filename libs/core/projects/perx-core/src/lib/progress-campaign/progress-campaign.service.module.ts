import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { ProgressCampaignService } from './progress-campaign.service';
import { V4ProgressCampaignService } from './v4-progress-campaign.service';

export function progressCampaignServiceFactory(http: HttpClient, configService: ConfigService): ProgressCampaignService {
  return new V4ProgressCampaignService(http, configService);
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProgressCampaignServiceModule {
  public static forRoot(): ModuleWithProviders<ProgressCampaignServiceModule> {
    return {
      ngModule: ProgressCampaignServiceModule,
      providers: [
        {
          provide: ProgressCampaignService,
          useFactory: progressCampaignServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<ProgressCampaignServiceModule> {
    return {
      ngModule: ProgressCampaignServiceModule
    };
  }
}
