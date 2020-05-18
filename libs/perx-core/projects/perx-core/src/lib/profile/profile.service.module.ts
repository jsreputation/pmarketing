import {HttpClient} from '@angular/common/http';
import {Config} from '../config/config';
import {ConfigService} from '../config/config.service';
import {TokenStorage} from '../utils/storage/token-storage.service';
import {ProfileService} from './profile.service';
import {WhistlerProfileService} from './whistler-profile.service';
import {V4ProfileService} from './v4-profile.service';
import {ModuleWithProviders, NgModule} from '@angular/core';

export function profileServiceFactory(
  http: HttpClient,
  config: Config,
  configService: ConfigService,
  tokenStorage: TokenStorage): ProfileService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerProfileService(http, config, tokenStorage);
  }
  return new V4ProfileService(http, configService);
}

@NgModule({
})
export class ProfileServiceModule {
  public static forRoot(): ModuleWithProviders<ProfileServiceModule> {
    return {
      ngModule: ProfileServiceModule,
      providers: [
        {
          provide: ProfileService,
          useFactory: profileServiceFactory,
          deps: [HttpClient, Config, ConfigService, TokenStorage]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<ProfileServiceModule> {
    return {
      ngModule: ProfileServiceModule
    };
  }
}
