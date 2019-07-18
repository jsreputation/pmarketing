import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from '../shared/env-config';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';
import { RewardsCarouselComponent } from './rewards-carousel/rewards-carousel.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';

@NgModule({
  declarations: [
    RewardsCarouselComponent,
    RewardsListComponent,
    RewardsListTabbedComponent
  ],
  imports: [
    CommonModule
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
