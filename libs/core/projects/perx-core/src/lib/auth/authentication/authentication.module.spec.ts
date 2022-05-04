import { inject, TestBed } from '@angular/core/testing';
import { AuthServiceFactory, FormsServiceFactory } from './authentication.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ProfileService } from '../../profile/profile.service';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { V4AuthenticationService } from './v4-authentication.service';

import { WhistlerFormsService } from './whistler-forms.service';
import { V4FormsService } from './v4-forms.service';

import { TokenStorage } from '../../utils/storage/token-storage.service';
import { UtilsModule } from '../../utils/utils.module';
import { LocalTokenStorage } from '../../utils/storage/local-token-storage.service';
import { TokenType } from '../../utils/storage/models/token-storage.model';
import { TokenStorageServiceFactory } from '../../utils/storage/storage.module';
import { of } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { NotificationService } from '../../utils/notification/notification.service';

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    redirectAfterLogin: '/home',
    apiHost: 'string',
    production: true,
    preAuth: true,
    isWhistler: true,
    baseHref: ''
  })
};

describe('AuthenticationModule', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      UtilsModule
    ],
    providers: [
      {
        provide: TokenStorage,
        useValue: {},
      },
      {
        provide: ProfileService,
        useValue: {},
      },
      { provide: ConfigService, useValue: configServiceStub }
    ]
  }));
  it('should create AuthService', inject([HttpClient, TokenStorage, ProfileService, ConfigService, NotificationService, HttpBackend],
    (
      http: HttpClient,
      token: TokenStorage,
      profile: ProfileService,
      configService: ConfigService,
      notificationService: NotificationService,
      httpBackend: HttpBackend
    ) => {
      let service = AuthServiceFactory(http, { isWhistler: true }, token, profile, configService, notificationService, httpBackend);
      expect(service instanceof WhistlerAuthenticationService);
      service = AuthServiceFactory(http, { isWhistler: false }, token, profile, configService, notificationService, httpBackend);
      expect(service instanceof V4AuthenticationService);
    }));

  it('should create formsService', inject([HttpClient], (http: HttpClient) => {
    let service = FormsServiceFactory({ isWhistler: true }, http);
    expect(service instanceof WhistlerFormsService).toBeTruthy();
    service = FormsServiceFactory({ isWhistler: false }, http);
    expect(service instanceof V4FormsService).toBeTruthy();
  }));

  it('should create tokenService', inject([HttpClient], (http: HttpClient) => {
    let service = TokenStorageServiceFactory(http, { storageType: TokenType.local });
    expect(service instanceof LocalTokenStorage).toBeTruthy();
    service = TokenStorageServiceFactory(http, {});
    expect(service instanceof LocalTokenStorage).toBeTruthy();
  }));
});
