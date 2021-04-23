import {NgModule, ModuleWithProviders} from '@angular/core';
import {Config} from '../config/config';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import {SettingsService} from './settings.service';
import {V4SettingsService} from './v4-settings.service';
import {AuthenticationService} from '../auth/authentication/authentication.service';
import {WhistlerSettingsService} from './whistler-settings.service';
import {ConfigService} from '../config/config.service';

export function settingsServiceFactory(
  http: HttpClient,
  httpBackend: HttpBackend,
  config: Config,
  configService: ConfigService,
  authService: AuthenticationService): SettingsService {
  if (config.isWhistler) {
    return new WhistlerSettingsService(http, configService);
  }
  return new V4SettingsService(http, httpBackend, configService, authService);
}

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: SettingsService,
      useFactory: settingsServiceFactory,
      deps: [HttpClient, HttpBackend, Config, ConfigService, AuthenticationService]
    }
  ]
})

export class SettingsModule {
  public static forRoot(config: Config): ModuleWithProviders<SettingsModule> {
    return {
      ngModule: SettingsModule,
      providers: [
        {
          provide: Config,
          useValue: config
        }
      ],
    };
  }
}
