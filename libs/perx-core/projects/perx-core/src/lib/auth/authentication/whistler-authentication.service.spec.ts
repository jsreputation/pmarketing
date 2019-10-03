import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { TokenStorage } from './token-storage.service';
import { ProfileModule } from '../../profile/profile.module';
import { ConfigModule } from '../../config/config.module';

describe('WhistlerAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule,
      ConfigModule.forRoot({})
    ],
    providers: [TokenStorage]
  }));

  it('should be created', () => {
    const service: WhistlerAuthenticationService = TestBed.get(WhistlerAuthenticationService);
    expect(service).toBeTruthy();
  });
});
