import { NgModule } from '@angular/core';
import {
  AuthModule,
  AUTH_SERVICE,
  PROTECTED_FALLBACK_PAGE_URI,
  PUBLIC_FALLBACK_PAGE_URI
} from 'ngx-auth';
import { TokenStorage } from './token-storage.service';
import { PerxAuthenticationService } from './perx-authentication.service';

export function factory(authenticationService: PerxAuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [AuthModule],
  providers: [
    TokenStorage,
    PerxAuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AUTH_SERVICE,
      deps: [PerxAuthenticationService],
      useFactory: factory
    }
  ],
  declarations: [],
  exports: []
})
export class PerxAuthenticationModule {
}
