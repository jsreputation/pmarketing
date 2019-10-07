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

@NgModule({
  imports: [AuthModule],
  declarations: [],
  exports: [],
  providers: [
    TokenStorage,
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
    }
  ]
})
export class AuthenticationModule {
}
