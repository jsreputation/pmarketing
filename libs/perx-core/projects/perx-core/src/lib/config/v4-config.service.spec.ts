import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { V4ConfigService } from './v4-config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { Type } from '@angular/core';
import { of } from 'rxjs';
import { IWAppAccessTokenResponse } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { IConfig } from './models/config.model';
import { ITheme } from '../utils/themes/themes.model';

const authenticationServiceStub = {
  getAppToken: () => of()
};

describe('V4ConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: V4ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: AuthenticationService,
        useValue: authenticationServiceStub
      }]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(V4ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should readAppConfig', (done: DoneFn) => {
    service.readAppConfig()
      .subscribe((res) => {
        expect(res.apiHost).toBe('http://test.com');
        expect(res.production).toBe(false);
        expect(res.preAuth).toBe(false);
        expect(res.isWhistler).toBe(false);
        expect(res.baseHref).toBe('/');
        done();
      });

    const req = httpTestingController.expectOne('assets/config/app-config.json');

    expect(req.request.method).toEqual('GET');

    req.flush({
      apiHost: 'http://test.com',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '/',
    });

    httpTestingController.verify();
  });

  it('v4MicrositeSettingsToMicrositeSettings', () => {
    const convertObject = {
      id: 1,
      key: 'key',
      string_value: 'key',
      json_value: {}
    };
    const val = V4ConfigService.v4MicrositeSettingsToMicrositeSettings(convertObject);
    expect(val.id).toBe(convertObject.id);
  });

  it('getTenantAppSettings', fakeAsync(inject([V4ConfigService, AuthenticationService, HttpClient],
    (config: V4ConfigService, auth: AuthenticationService, http: HttpClient) => {
      const spyHttpGet = spyOn(http, 'get');
      spyHttpGet.and.returnValue(of({ apiHost: '11' } as IConfig<ITheme>));
      config.readAppConfig().subscribe(() => { });
      tick();
      const spy = spyOn(V4ConfigService, 'v4MicrositeSettingsToMicrositeSettings');
      spyOn(auth, 'getAppToken').and.returnValue(of({} as IWAppAccessTokenResponse));
      spyHttpGet.and.returnValue(of({}));
      config.getTenantAppSettings('key').subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('getAccountSettings', fakeAsync(inject([V4ConfigService, HttpClient],
    (config: V4ConfigService, http: HttpClient) => {
      const spy = spyOn(http, 'get').and.returnValue(of({
        displayProperties: {
          account: null
        }
      }));
      config.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
