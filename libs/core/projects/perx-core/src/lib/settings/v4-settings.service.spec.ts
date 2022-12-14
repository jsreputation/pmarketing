import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { V4SettingsService } from './v4-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { of } from 'rxjs';
import { IWAppAccessTokenResponse } from '@perxtech/whistler';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '../config/models/config.model';
import { ITheme } from '../utils/themes/themes.model';
import { ConfigService } from '../config/config.service';

describe('V4SettingsService', () => {
  const authenticationServiceStub: Partial<AuthenticationService> = {
    getAppToken: () => of()
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      redirectAfterLogin: '/home',
      apiHost: 'string',
      production: true,
      baseHref: '/',
      isWhistler: true,
      preAuth: false,
    })
  };

  // let httpTestingController: HttpTestingController;
  let service: V4SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceStub
        },
        {
          provide: ConfigService,
          useValue: configServiceStub
        }
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    // httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(V4SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('v4MicrositeSettingsToMicrositeSettings', () => {
    const convertObject = {
      id: 1,
      key: 'key',
      string_value: 'key',
      json_value: {}
    };
    const val = V4SettingsService.v4MicrositeSettingsToMicrositeSettings(convertObject);
    expect(val.id).toBe(convertObject.id);
  });

  it('getTenantAppSettings', fakeAsync(inject([V4SettingsService, AuthenticationService, HttpClient],
    (settings: V4SettingsService, auth: AuthenticationService, http: HttpClient) => {
      const spyHttpGet = jest.spyOn(http, 'get');
      spyHttpGet.mockReturnValue(of({ apiHost: '11' } as IConfig<ITheme>));
      // config.readAppConfig().subscribe(() => { });
      // tick();
      const spy = jest.spyOn(V4SettingsService, 'v4MicrositeSettingsToMicrositeSettings');
      jest.spyOn(auth, 'getAppToken').mockReturnValue(of({} as IWAppAccessTokenResponse));
      spyHttpGet.mockReturnValue(of({}));
      jest.spyOn(settings, 'getTenantAppSettings').mockImplementation(() => {
        const convertObject = {
          id: 1,
          key: 'key',
          string_value: 'key',
          json_value: {}
        };
        const val = V4SettingsService.v4MicrositeSettingsToMicrositeSettings(convertObject);
        return of(val);
      });
      settings.getTenantAppSettings('key').subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('getAccountSettings', fakeAsync(inject([V4SettingsService, ConfigService],
    (settings: V4SettingsService, configService: ConfigService) => {
      const spy = jest.spyOn(configService, 'readAppConfig');
      settings.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
