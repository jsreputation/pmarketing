import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { CognitoModule } from '../whistler/cognito/cognito.module';
import { ProfileModule } from './../../profile/profile.module';
import { OauthModule } from '../v4/oauth/oauth.module';

describe('AuthenticationService', () => {

  const environment = {
    apiHost: 'localhost:4000',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ProfileModule.forRoot({ env: environment }),
      CognitoModule.forRoot({ env: environment }),
      OauthModule.forRoot({ env: environment }),
    ],
    providers: [HttpClient, HttpHandler, TokenStorage]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
