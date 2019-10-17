import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { V4AuthenticationService } from './v4-authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TokenStorage } from './token-storage.service';
import { ProfileModule } from '../../profile/profile.module';
import { ConfigModule } from '../../config/config.module';
import { LocalTokenStorage } from './local-token-storage.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

function fakeFactory(): TokenStorage {
  return new LocalTokenStorage({});
}

describe('V4AuthenticationService', () => {
  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const baseUrl = 'https://api.perxtech.io/';
  const baseUrlForAppAccessToken = 'http://localhost:4000/';
  let httpTestingController: HttpTestingController;
  let service: V4AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ProfileModule,
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [{ provide: TokenStorage, useFactory: fakeFactory }]
    });
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(V4AuthenticationService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should get app access token', (done: DoneFn) => {
    service.getAppToken()
      .subscribe((res) => {
        expect(res.access_token).toBe('test-token');
        done();
      });
    const url = location.host;
    const req = httpTestingController.expectOne(baseUrlForAppAccessToken + 'v2/oauth/token');
    expect(req.request.body).toEqual({ url });
    expect(req.request.method).toEqual('POST');

    req.flush({
      access_token: 'test-token',
      token_type: 'bearer',
      expires_in: 2629746,
      created_at: 1566975901
    });

    httpTestingController.verify();
  });

  it('should send forgot password token', (done: DoneFn) => {
    service.forgotPassword('6398898888')
      .subscribe((res: { message: string }) => {
        expect(res.message).toBe('Confirmation to reset password has been sent');
        done();
      });

    const req = httpTestingController.expectOne(baseUrl + 'v4/customers/forget_password?phone=6398898888');

    expect(req.request.method).toEqual('GET');

    req.flush({ message: 'Confirmation to reset password has been sent' });

    httpTestingController.verify();
  });

  it('should reset password', (done: DoneFn) => {
    service.resetPassword({ phone: '6398898888', newPassword: '1237', otp: '8888', passwordConfirmation: '1237' })
      .subscribe((res: { message: string }) => {
        expect(res.message).toBe('Password has been reset!');
        done();
      });

    const req = httpTestingController.expectOne(baseUrl + 'v4/customers/reset_password');

    expect(req.request.method).toEqual('PATCH');

    req.flush({ message: 'Password has been reset!' });

    httpTestingController.verify();
  });

  it('should return observable', () => {
    const observable = service.$failedAuth;
    expect(observable instanceof Observable).toBeTruthy();
  });

  it('should create service with config production', () => {
    const serviceWithConfig = new V4AuthenticationService({ baseHref: 'test', production: true }, null, null, null);
    expect(serviceWithConfig).toBeTruthy();
  });

  it('should check isAuthorized', () => {
    const isAuthorized = service.isAuthorized();
    expect(isAuthorized instanceof Observable).toBeTruthy();
  });

  it('should call refreshToken', () => {
    const refreshToken = service.refreshToken();
    expect(refreshToken instanceof Observable).toBeTruthy();
  });

  it('refresh should happen', () => {
    const refresh = service.refreshShouldHappen({
      name: 'HttpErrorResponse',
      message: 'test',
      status: 401,
      ok: false,
    } as HttpErrorResponse);
    expect(refresh).toBeTruthy();
  });

  it('should verify token request', () => {
    let result = service.verifyTokenRequest('url/preauth');
    expect(result).toBeTruthy();
    result = service.verifyTokenRequest('url/v4/oauth/token');
    expect(result).toBeTruthy();
    result = service.verifyTokenRequest('url/v2/oauth/token');
    expect(result).toBeTruthy();
  });

  it('should login', fakeAsync(inject([V4AuthenticationService], (authService: V4AuthenticationService) => {
    const spy = spyOn(authService, 'saveUserAccessToken');
    const spyAuth = spyOn(authService, 'authenticateUser').and.returnValue(of({ bearer_token: 'token' }));
    authService.login('user', 'pass').subscribe(() => { });
    tick();
    expect(spyAuth).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  })));

  it('should authenticate user', inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spyHttp = spyOn(http, 'post');
      authService.authenticateUser('user', 'password');
      expect(spyHttp).toHaveBeenCalled();
    }));

  it('shsould handle error', fakeAsync(inject([V4AuthenticationService], (authService: V4AuthenticationService) => {
    const spyAuth = spyOn(authService, 'authenticateUser')
    spyAuth.and.returnValue(of(null));
    let error = null;
    authService.login('user', 'pass').subscribe(() => { }, (err: Error) => {
      error = err;
    })
    tick();
    expect(error).toBeTruthy();
    spyAuth.and.returnValue(throwError(null));
    authService.login('user', 'pass').subscribe(() => { }, () => { });
    tick();
    expect(authService.$failedAuthObservable instanceof Observable).toBeTruthy();
  })));
});
