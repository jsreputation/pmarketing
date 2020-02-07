import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { V4SettingsService } from './v4-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { of } from 'rxjs';
import { IWAppAccessTokenResponse } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import {IConfig} from '../config/models/config.model';
import { ITheme } from '../utils/themes/themes.model';

const authenticationServiceStub = {
  getAppToken: () => of()
};

describe('V4SettingsService', () => {
  // let httpTestingController: HttpTestingController;
  let service: V4SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: AuthenticationService,
        useValue: authenticationServiceStub
      }]
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

  it('getAccountSettings', fakeAsync(inject([V4SettingsService, HttpClient],
    (settings: V4SettingsService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({
        displayProperties: {
          account: null
        }
      }));
      settings.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
