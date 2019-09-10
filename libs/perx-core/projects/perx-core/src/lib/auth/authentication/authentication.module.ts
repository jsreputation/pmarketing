import { ProfileService } from '@perx/core';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { EnvConfig } from '../../shared/env-config';
import {
  AuthModule,
  AUTH_SERVICE,
  PROTECTED_FALLBACK_PAGE_URI,
  PUBLIC_FALLBACK_PAGE_URI
} from 'ngx-auth';
import { TokenStorage } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import { V4AuthenticationService } from './v4-authentication.service';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';

export function AuthServiceFactory(http: HttpClient, config: Config, profileService: ProfileService, tokenStorage: TokenStorage): AuthenticationService {
  // Make decision on what to instantiate base on config
  return new V4AuthenticationService(http, config, profileService, tokenStorage);
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
      deps: [HttpClient, Config]
    }
  ]
})
export class AuthenticationModule {
}
