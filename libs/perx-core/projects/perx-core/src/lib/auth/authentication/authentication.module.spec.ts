import { TestBed, inject } from '@angular/core/testing';
import { AuthServiceFactory, FormsServiceFactory, TokenStorageServiceFactory } from './authentication.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { ProfileService } from '../../profile/profile.service';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { V4AuthenticationService } from './v4-authentication.service';
import { WhistlerFormsService } from './whistler-forms.service';
import { TokenType } from './models/authentication.model';
import { LocalTokenStorage } from './local-token-storage.service';

describe('should create module', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {
        provide: TokenStorage,
        useValue: {},
      },
      {
        provide: ProfileService,
        useValue: {},
      }
    ]
  }));
  it('should create AuthService', inject([HttpClient, TokenStorage, ProfileService],
    (http: HttpClient, token: TokenStorage, profile: ProfileService) => {
      let service = AuthServiceFactory(http, { isWhistler: true }, token, profile);
      expect(service instanceof WhistlerAuthenticationService);
      service = AuthServiceFactory(http, { isWhistler: false }, token, profile);
      expect(service instanceof V4AuthenticationService);
    }));

  it('should create formsService', inject([HttpClient], (http: HttpClient) => {
    const service = FormsServiceFactory({}, http);
    expect(service instanceof WhistlerFormsService).toBeTruthy();
  }));

  it('should create tokenService', () => {
    let service = TokenStorageServiceFactory({ storageType: TokenType.local });
    expect(service instanceof LocalTokenStorage).toBeTruthy();
    service = TokenStorageServiceFactory({});
    expect(service instanceof LocalTokenStorage).toBeTruthy();
  });
});
