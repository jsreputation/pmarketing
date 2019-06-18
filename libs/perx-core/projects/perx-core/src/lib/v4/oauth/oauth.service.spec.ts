import { TestBed } from '@angular/core/testing';

import { OauthService } from './oauth.service';
import { OauthModule } from './oauth.module';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('OauthService', () => {
  const environment = {
    apiHost: 'localhost:4000',
    production: false,
    preAuthPath: '/preauth',
    preAuth: false,
    clientId: '',
    clientSecret: ''
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      OauthModule.forRoot({ env: environment }),
    ],
    providers: [HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: OauthService = TestBed.get(OauthService);
    expect(service).toBeTruthy();
  });
});
