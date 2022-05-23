import {ModuleWithProviders, NgModule} from '@angular/core';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerRewardsService } from './whistler-rewards.service';
import { ConfigService } from '../config/config.service';

export function rewardsServiceFactory(http: HttpClient, config: Config, configService: ConfigService): RewardsService {
  if (config.isWhistler) {
    return new WhistlerRewardsService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4RewardsService(http, configService);
}

@NgModule({})
export class RewardsServiceModule {
  public static forRoot(): ModuleWithProviders<RewardsServiceModule> {
    return {
      ngModule: RewardsServiceModule,
      providers: [
        {
          provide: RewardsService,
          useFactory: rewardsServiceFactory,
          deps: [
            HttpClient,
            Config,
            ConfigService
          ]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<RewardsServiceModule> {
    return {
      ngModule: RewardsServiceModule
    };
  }
}