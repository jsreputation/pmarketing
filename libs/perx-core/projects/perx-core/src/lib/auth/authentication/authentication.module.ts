import { NgModule } from '@angular/core';
import {
  AuthModule,
  PROTECTED_FALLBACK_PAGE_URI,
  PUBLIC_FALLBACK_PAGE_URI,
  AUTH_SERVICE
} from 'ngx-auth';
import { TokenStorage } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import { V4AuthenticationService } from './v4-authentication.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { ProfileService } from '../../profile/profile.service';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { LocalTokenStorage } from './local-token-storage.service';
import { IFormsService } from './iforms.service';
import { WhistlerFormsService } from './whistler-forms.service';

export function AuthServiceFactory(
  http: HttpClient,
  config: Config,
  tokenStorage: TokenStorage,
  profileService: ProfileService,
): AuthenticationService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerAuthenticationService(config, http, tokenStorage);
  }
  return new V4AuthenticationService(config, http, tokenStorage, profileService);
}

export function TokenStorageServiceFactory(
  config: Config
): TokenStorage {
  switch (config.storageType) {
    case 'local':
      return new LocalTokenStorage(config);
    default:
      return new LocalTokenStorage(null);
  }
}

export function FormsServiceFactory(config: Config, http: HttpClient): IFormsService {
  return new WhistlerFormsService(config, http);
}

@NgModule({
  imports: [AuthModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: TokenStorage,
      useFactory: TokenStorageServiceFactory,
      deps: [Config]
    },
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AuthenticationService,
      useFactory: AuthServiceFactory,
      deps: [HttpClient, Config, TokenStorage, ProfileService]
    },
    {
      provide: AUTH_SERVICE,
      useFactory: AuthServiceFactory,
      deps: [HttpClient, Config, TokenStorage, ProfileService]
    },
    { provide: IFormsService, useFactory: FormsServiceFactory, deps: [Config, HttpClient] }
  ]
})
export class AuthenticationModule {
}
