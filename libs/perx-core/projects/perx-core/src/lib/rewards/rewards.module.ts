import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '../shared/env-config';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';
import { RewardsCarouselComponent } from './rewards-carousel/rewards-carousel.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { MaterialModule } from '../shared/material.module';
import { RewardComponent } from './reward/reward.component';

const components = [
  RewardsCarouselComponent,
  RewardsListComponent,
  RewardsListTabbedComponent,
  RewardComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...components
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
