import { NgModule } from '@angular/core';
import {
  AuthModule,
  PROTECTED_FALLBACK_PAGE_URI,
  PUBLIC_FALLBACK_PAGE_URI,
  AUTH_SERVICE
} from 'ngx-auth';
import { AuthenticationService } from './authentication.service';
import { V4AuthenticationService } from './v4-authentication.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { ProfileService } from '../../profile/profile.service';
import { WhistlerAuthenticationService } from './whistler-authentication.service';

import { IFormsService } from './iforms.service';
import { WhistlerFormsService } from './whistler-forms.service';
import { V4FormsService } from './v4-forms.service';

import { TokenStorage } from '../../utils/storage/token-storage.service';
import { UtilsModule } from '../../utils/utils.module';
import { ConfigService } from '../../config/config.service';

export function AuthServiceFactory(
  http: HttpClient,
  config: Config,
  tokenStorage: TokenStorage,
  profileService: ProfileService,
  configService: ConfigService
): AuthenticationService {
  // Make decision on what to instantiate based on config
  if (config.isWhistler) {
    return new WhistlerAuthenticationService(config, http, tokenStorage);
  }
  return new V4AuthenticationService(configService, http, tokenStorage, profileService);
}

export function FormsServiceFactory(config: Config, http: HttpClient): IFormsService {
  if (config.isWhistler) {
    return new WhistlerFormsService(config, http);
  }
  return new V4FormsService();
}

@NgModule({
  imports: [AuthModule, UtilsModule],
  declarations: [],
  exports: [],
  providers: [
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AuthenticationService,
      useFactory: AuthServiceFactory,
      deps: [HttpClient, Config, TokenStorage, ProfileService, ConfigService]
    },
    {
      provide: AUTH_SERVICE,
      useFactory: AuthServiceFactory,
      deps: [HttpClient, Config, TokenStorage, ProfileService, ConfigService]
    },
    { provide: IFormsService, useFactory: FormsServiceFactory, deps: [Config, HttpClient] }
  ]
})
export class AuthenticationModule {
}
