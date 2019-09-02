import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { TokenStorage } from './token-storage.service';
import { ProfileModule } from '../../profile/profile.module';

describe('WhistlerAuthenticationService', () => {
  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule.forRoot({ env: environment })
    ],
    providers: [TokenStorage]
  }));

  it('should be created', () => {
    const service: WhistlerAuthenticationService = TestBed.get(WhistlerAuthenticationService);
    expect(service).toBeTruthy();
  });
});
