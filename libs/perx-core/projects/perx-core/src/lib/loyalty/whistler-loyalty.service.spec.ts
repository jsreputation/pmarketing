import { TestBed } from '@angular/core/testing';

import { WhistlerLoyaltyService } from './whistler-loyalty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { AuthenticationService } from '../auth/authentication/authentication.service';

describe('WhistlerLoyaltyService', () => {
  const authServiceStub: Partial<AuthenticationService> = {
    getUserId: () => 0
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: AuthenticationService, useValue: authServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerLoyaltyService = TestBed.get(WhistlerLoyaltyService);
    expect(service).toBeTruthy();
  });
});
