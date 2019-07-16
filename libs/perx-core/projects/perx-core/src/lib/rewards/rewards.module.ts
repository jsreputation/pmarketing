import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig } from './env-config';
import { RewardsService } from './rewards.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RewardsService
  ],
})
export class RewardsModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: RewardsModule,
      providers: [
        RewardsService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
