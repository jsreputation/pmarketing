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

export function factory(authenticationService: AuthenticationService): AuthenticationService {
  return authenticationService;
}

@NgModule({
  imports: [AuthModule],
  declarations: [],
  exports: []
})
export class AuthenticationModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        TokenStorage,
        {
          provide: EnvConfig,
          useValue: config
        },
        { provide: V4AuthenticationService, useClass: V4AuthenticationService },
        { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
        { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
        {
          provide: AUTH_SERVICE,
          deps: [AuthenticationService],
          useFactory: factory
        }
      ]
    };
  }
}
