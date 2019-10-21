import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../auth/authentication/authentication.service';

const authenticationServiceStub = { getAppToken: { subscribe: () => ({}) } };

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{
      provide: AuthenticationService,
      useValue: authenticationServiceStub
    }]
  }));

  it('should be created', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });
});
