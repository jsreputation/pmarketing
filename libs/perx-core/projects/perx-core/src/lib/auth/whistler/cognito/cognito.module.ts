import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CognitoService, EnvConfig} from './cognito.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  exports: []
})

export class CognitoModule {
  constructor(@Optional() @SkipSelf() parentModule: CognitoModule) {
    if (parentModule) {
      throw new Error(
        'CognitoModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: CognitoModule,
      providers: [
        CognitoService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
