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

@NgModule({
  declarations: [
    RewardsCarouselComponent,
    RewardsListComponent,
    RewardsListTabbedComponent,
    RewardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    RewardsCarouselComponent,
    RewardsListComponent,
    RewardsListTabbedComponent
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
