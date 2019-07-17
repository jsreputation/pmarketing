import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from './env-config';
import { V4RewardsService } from './v4-rewards.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    V4RewardsService
  ],
})
export class RewardsModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: RewardsModule,
      providers: [
        V4RewardsService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
