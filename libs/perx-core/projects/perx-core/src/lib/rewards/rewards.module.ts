import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '../shared/env-config';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { MaterialModule } from '../shared/material.module';
import { RewardComponent } from './reward/reward.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { UtilsModule } from '../utils/utils.module';
import {VouchersModule} from '../vouchers/vouchers.module';

const components = [
  RewardsCollectionComponent,
  RewardsListComponent,
  RewardsListTabbedComponent,
  RewardComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMultiLineEllipsisModule,
    UtilsModule,
    VouchersModule
  ],
  exports: [
    ...components,
  ]
})
export class RewardsModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: RewardsModule,
      providers: [
        {
          provide: EnvConfig,
          useValue: config
        },
        {
          provide: RewardsService,
          useClass: V4RewardsService
        }
      ],
    };
  }
}
