import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from './env-config';
import { RewardsService } from './rewards.service';
import { V4RewardsService } from './v4-rewards.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
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
