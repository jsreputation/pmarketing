import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { V4ProfileService } from './v4-profile.service';
import { EnvConfig } from '../shared/env-config';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class ProfileModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: ProfileModule,
      providers: [
        {
          provide: ProfileService,
          useClass: V4ProfileService
        },
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
