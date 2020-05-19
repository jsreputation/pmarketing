import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { MaterialModule } from '../shared/material.module';
import { RewardComponent } from './reward/reward.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { EllipsisModule } from 'ngx-ellipsis';
import { UtilsModule } from '../utils/utils.module';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerRewardsService } from './whistler-rewards.service';
import { StampsCardsListComponent } from '../stamp/stamps-cards-list/stamps-cards-list.component';
import { ConfigService } from '../config/config.service';
import { TranslateModule } from '@ngx-translate/core';

const components = [
  RewardsCollectionComponent,
  RewardsListComponent,
  RewardsListTabbedComponent,
  RewardComponent,
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
    CommonModule,
    MaterialModule,
    NgxMultiLineEllipsisModule,
    EllipsisModule,
    UtilsModule,
    TranslateModule.forChild()
  ],
  exports: [
    ...components,
  ],
  providers: [
    {
      provide: RewardsService,
      useFactory: rewardsServiceFactory,
      deps: [HttpClient, Config, ConfigService]
    }
  ]
})
export class RewardsModule {
}
