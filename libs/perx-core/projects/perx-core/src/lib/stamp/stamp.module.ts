import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EnvConfig } from './env-config';
import { StampService } from './stamp.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class StampModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: StampModule,
      providers: [
        StampService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
