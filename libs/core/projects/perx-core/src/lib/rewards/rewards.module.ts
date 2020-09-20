import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { MaterialModule } from '../shared/material.module';
import { RewardComponent } from './reward/reward.component';
import { UtilsModule } from '../utils/utils.module';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerRewardsService } from './whistler-rewards.service';
import { StampsCardsListComponent } from '../stamp/stamps-cards-list/stamps-cards-list.component';
import { ConfigService } from '../config/config.service';
import { DragScrollModule } from 'ngx-drag-scroll';
import { RewardsLargeListComponent } from './rewards-large-list/rewards-large-list.component';

const components = [
  RewardsCollectionComponent,
  RewardsListComponent,
  RewardsListTabbedComponent,
  RewardComponent,
  RewardsLargeListComponent,
  StampsCardsListComponent
];

export function rewardsServiceFactory(http: HttpClient, config: Config, configService: ConfigService): RewardsService {
  if (config.isWhistler) {
    return new WhistlerRewardsService(http, config);
  }
  // Make decision on what to instantiate base on config
  return new V4RewardsService(http, configService);
}

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    DragScrollModule,
    CommonModule,
    MaterialModule,
    UtilsModule
  ],
  exports: [
    ...components,
  ]
})
export class RewardsModule {
  public static forRoot(): ModuleWithProviders<RewardsModule> {
    return {
      ngModule: RewardsModule,
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
  public static forChild(): ModuleWithProviders<RewardsModule> {
    return {
      ngModule: RewardsModule
    };
  }
}
