import { TestBed } from '@angular/core/testing';

import { V4ConfigService } from './v4-config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../auth/authentication/authentication.service';

const authenticationServiceStub = { getAppToken: { subscribe: () => ({}) } };

describe('V4ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{
      provide: AuthenticationService,
      useValue: authenticationServiceStub
    }]
  }));

  it('should be created', () => {
    const service: V4ConfigService = TestBed.get(V4ConfigService);
    expect(service).toBeTruthy();
  });
});
