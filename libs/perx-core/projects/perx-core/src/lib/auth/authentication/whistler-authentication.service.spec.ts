import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { TokenStorage } from './token-storage.service';
import { ProfileModule } from '../../profile/profile.module';
import { ConfigModule } from '../../config/config.module';
import { Observable } from 'rxjs';

fdescribe('WhistlerAuthenticationService', () => {
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

  it('should create with config', () => {
    const service: WhistlerAuthenticationService = new WhistlerAuthenticationService({ production: true }, null, null);
    expect(service).toBeTruthy();
  });

  it('failedAuth', inject([WhistlerAuthenticationService],(auth: WhistlerAuthenticationService)=>{
    expect(auth.$failedAuth instanceof Observable).toBeTruthy();
  }));

  it('check isAuthorized', inject([WhistlerAuthenticationService, TokenStorage], 
    (auth: WhistlerAuthenticationService, storage: TokenStorage)=>{
      const spy = spyOn(storage, 'getAppInfoProperty');
      auth.isAuthorized();
      expect(spy).toHaveBeenCalledWith('userAccessToken');
  }));
});
