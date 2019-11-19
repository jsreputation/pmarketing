import { NgModule, ModuleWithProviders} from '@angular/core';
import {Config} from './config';
import {ConfigService} from './config.service';
import { V4ConfigService } from './v4-config.service';
import { WhistlerConfigService } from './whistler-config.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication/authentication.service';

export function configServiceFactory(http: HttpClient, config: Config, authenticationService: AuthenticationService): ConfigService {
  if (config.isWhistler) {
    return new WhistlerConfigService();
  }
  return new V4ConfigService(http, authenticationService);
}

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: ConfigService,
      useFactory: configServiceFactory,
      deps: [HttpClient, Config, AuthenticationService]
    }
  ]
})

export class ConfigModule {
  public static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: Config,
          useValue: config
        }
      ],
    };
  }
}
