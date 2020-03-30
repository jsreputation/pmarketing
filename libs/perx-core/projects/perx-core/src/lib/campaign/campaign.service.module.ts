import {ModuleWithProviders, NgModule} from '@angular/core';
import {ICampaignService} from './icampaign.service';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config/config';
import {ConfigService} from '../config/config.service';
import {WhistlerCampaignService} from './whistler-campaign.service';
import {V4CampaignService} from './v4-campaign.service';

export function campaignServiceFactory(http: HttpClient, config: Config, configService: ConfigService): ICampaignService {
  if (config.isWhistler) {
    return new WhistlerCampaignService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4CampaignService(http, configService);
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
