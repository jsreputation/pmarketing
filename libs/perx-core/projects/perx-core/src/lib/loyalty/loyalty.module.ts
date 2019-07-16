import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvConfig } from './env-config';
import { LoyaltyService } from './loyalty.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoyaltyModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: LoyaltyModule,
      providers: [
        LoyaltyService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
