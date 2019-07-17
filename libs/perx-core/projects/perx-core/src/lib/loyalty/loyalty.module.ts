import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnvConfig } from './env-config';
import { V4LoyaltyService } from './v4-loyalty.service';
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
        {
          provide: EnvConfig,
          useValue: config
        },
        {
          provide: LoyaltyService,
          useClass: V4LoyaltyService
        }
      ],
    };
  }
}
