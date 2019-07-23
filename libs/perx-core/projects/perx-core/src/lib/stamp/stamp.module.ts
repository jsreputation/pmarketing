import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EnvConfig } from '../shared/env-config';
import { V4StampService } from './v4-stamp.service';

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
        V4StampService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
