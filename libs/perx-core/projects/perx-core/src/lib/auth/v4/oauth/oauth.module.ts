import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvConfig, OauthService } from './oauth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OauthModule {
  constructor(@Optional() @SkipSelf() parentModule: OauthModule) {
    if (parentModule) {
      throw new Error(
        'OauthModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: OauthModule,
      providers: [
        OauthService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
