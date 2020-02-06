import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { V4AuthenticationService } from './v4-authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';

import { ProfileModule } from '../../profile/profile.module';
import { ConfigModule } from '../../config/config.module';

import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ProfileService } from '../../profile/profile.service';
import { TokenStorage } from '../../utils/storage/token-storage.service';
import { LocalTokenStorage } from '../../utils/storage/local-token-storage.service';
import {ConfigService} from '../../config/config.service';

function fakeFactory(): TokenStorage {
  return new LocalTokenStorage({});
}

const configServiceStub = {
  readAppConfig: () => of({
    production: true,
    baseHref: '/',
    preAuth: false,
    apiHost: 'https://api.perxtech.io'
  })
};

describe('V4AuthenticationService', () => {
  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const baseUrl = 'https://api.perxtech.io/';
  // const baseUrlForAppAccessToken = 'http://localhost:4000/';
  let httpTestingController: HttpTestingController;
  let service: V4AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ProfileModule,
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        { provide: TokenStorage, useFactory: fakeFactory },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    });
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(V4AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get app access token', (done: jest.DoneCallback) => {
    service.getAppToken()
      .subscribe((res) => {
        expect(res.access_token).toBe('test-token');
        done();
      });
    const url = location.host;
    const req = httpTestingController.expectOne(`/v2/oauth/token`);
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

  it('should send forgot password token', (done: jest.DoneCallback) => {
    service.forgotPassword('6398898888')
      .subscribe((res: { message: string }) => {
        expect(res.message).toBe('Confirmation to reset password has been sent');
        done();
      });

    const req = httpTestingController.expectOne(`${baseUrl}v4/customers/forget_password?phone=6398898888`);

    expect(req.request.method).toEqual('GET');

    req.flush({ message: 'Confirmation to reset password has been sent' });

    httpTestingController.verify();
  });

  it('should reset password', (done: jest.DoneCallback) => {
    service.resetPassword({ phone: '6398898888', newPassword: '1237', otp: '8888', passwordConfirmation: '1237' })
      .subscribe((res: { message: string }) => {
        expect(res.message).toBe('Password has been reset!');
        done();
      });

    const req = httpTestingController.expectOne(`${baseUrl}v4/customers/reset_password`);

    expect(req.request.method).toEqual('PATCH');

    req.flush({ message: 'Password has been reset!' });

    httpTestingController.verify();
  });

  it('should return observable', () => {
    const observable = service.$failedAuth;
    expect(observable instanceof Observable).toBeTruthy();
  });

  it('should create service with config production', () => {
    // @ts-ignore
    const serviceWithConfig = new V4AuthenticationService( configServiceStub, null, null, null);
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
    const spy = jest.spyOn(authService, 'saveUserAccessToken');
    const spyAuth = jest.spyOn(authService, 'authenticateUser').mockReturnValue(of({ bearer_token: 'token' }));
    authService.login('user', 'pass').subscribe(() => { });
    tick();
    expect(spyAuth).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  })));

  it('should check authenticateUser', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'post');
      authService.authenticateUser('test', 'test', 'test', 'test', 'test');
      expect(spy).toHaveBeenCalled();

    })));
  it('should authenticate user', inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spyHttp = jest.spyOn(http, 'post');
      authService.authenticateUser('user', 'password');
      expect(spyHttp).toHaveBeenCalled();
    }));

  it('should handle error', fakeAsync(inject([V4AuthenticationService], (authService: V4AuthenticationService) => {
    const spyAuth = jest.spyOn(authService, 'authenticateUser');
    // api returning something not complete should yield an error
    spyAuth.mockReturnValue(of({}));
    let error: Error | null = null;
    authService.login('user', 'pass').subscribe(
      () => { },
      (err: Error) => error = err
    );
    tick();
    expect(error).toBeTruthy();
    spyAuth.mockReturnValue(throwError(null));
    authService.login('user', 'pass').subscribe(() => { }, () => { });
    tick();
    authService.$failedAuth.subscribe((val => expect(val).toBeTruthy()));
  })));

  it('should throw err', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      // api returning something not complete should yield an error
      jest.spyOn(http, 'post').mockReturnValue(of({}));
      (window as any).primaryIdentifier = 'user';
      const fun = { err: () => { } };
      const spy = jest.spyOn(fun, 'err');
      authService.autoLogin().subscribe(() => { }, fun.err);
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should autoLogin', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      jest.spyOn(http, 'post').mockReturnValue(of({ bearer_token: 'token' }));
      (window as any).primaryIdentifier = 'user';
      const spy = jest.spyOn(authService, 'saveUserAccessToken');
      authService.autoLogin().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should handle error response', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      // authService.$failedAuthObservable = null;
      jest.spyOn(http, 'post').mockReturnValue(throwError(null));
      authService.autoLogin().subscribe(() => { });
      tick();
      authService.$failedAuth.subscribe((val => expect(val).toBeTruthy()));
    })));

  it('sheck set and get InterruptedUrl', inject([V4AuthenticationService], (authService: V4AuthenticationService) => {
    const url = 'http://test';
    authService.setInterruptedUrl(url);
    expect(authService.getInterruptedUrl()).toBe(url);
  }));

  it('should clear token', inject([V4AuthenticationService, TokenStorage],
    (authService: V4AuthenticationService, tokenSotrage: TokenStorage) => {
      const spy = jest.spyOn(tokenSotrage, 'clearAppInfoProperty');
      authService.logout();
      expect(spy).toHaveBeenCalled();
    }));
  it('should get token', inject([V4AuthenticationService, TokenStorage],
    (authService: V4AuthenticationService, tokenSotrage: TokenStorage) => {
      const spy = jest.spyOn(tokenSotrage, 'getAppInfoProperty');
      authService.getAppAccessToken();
      expect(spy).toHaveBeenCalled();
    }));
  it('should get AccessToken', inject([V4AuthenticationService],
    (authService: V4AuthenticationService) => {
      const spyUser = jest.spyOn(authService, 'getUserAccessToken');
      const spyApp = jest.spyOn(authService, 'getAppAccessToken');
      authService.getAccessToken();
      expect(spyUser).toHaveBeenCalled();
      spyUser.mockReturnValue('test');
      authService.getAccessToken();
      expect(spyApp).toHaveBeenCalled();
    }));
  it('should handle error then we call forgotPassword', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spy = jest.spyOn(console, 'log');
      jest.spyOn(http, 'get').mockReturnValue(throwError('error'));
      try {
        authService.forgotPassword('').subscribe(() => { });
        tick();
      } catch {
        expect(spy).toHaveBeenCalledWith('error');
      }
    })));
  it('should handle error then we call forgotPassword', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spy = jest.spyOn(console, 'log');
      jest.spyOn(http, 'patch').mockReturnValue(throwError('error'));
      try {
        authService.resetPassword({
          phone: '1',
          newPassword: '2',
          otp: '3',
          passwordConfirmation: '4'
        }).subscribe(() => { });
        tick();
      } catch {
        expect(spy).toHaveBeenCalledWith('error');
      }
    })));

  it('should handle getUserAccessToken', inject([V4AuthenticationService, TokenStorage],
    (authService: V4AuthenticationService, tokenSotrage: TokenStorage) => {
      const spyGet = jest.spyOn(tokenSotrage, 'getAppInfoProperty');
      const spySet = jest.spyOn(tokenSotrage, 'setAppInfoProperty');
      authService.getUserAccessToken();
      authService.saveUserAccessToken('token');
      expect(spyGet).toHaveBeenCalledWith('userAccessToken');
      expect(spySet).toHaveBeenCalledWith('token', 'userAccessToken');
    }));

  it('should resend otp', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({}));
      const spyLog = jest.spyOn(console, 'log');
      spy.mockReturnValue(of('test'));
      authService.resendOTP('999').subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
      expect(spyLog).toHaveBeenCalledWith('test');
      tick();
      spy.mockReturnValue(throwError('test'));
      try {
        authService.resendOTP('999').subscribe(() => { });
        tick();
      } catch {
        expect(spyLog).toHaveBeenCalledWith('test');
      }
    })));

  it('should signup', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (authService: V4AuthenticationService, http: HttpClient) => {
      const spyLog = jest.spyOn(console, 'log');
      const spy = jest.spyOn(http, 'post');
      spy.mockReturnValue(of({ data: {} }));
      authService.signup({
        lastName: 'name',
        password: '1234',
        phone: '1234',
        passwordConfirmation: '1234'
      }).subscribe(() => { });
      tick();
      expect(spyLog).toHaveBeenCalled();
      spy.mockReturnValue(throwError('error'));
      try {
        authService.signup({
          lastName: 'name',
          password: '1234',
          phone: '1234',
          passwordConfirmation: '1234'
        }).subscribe(() => { });
        tick();
      } catch {
        expect(spyLog).toHaveBeenCalled();
      }
    })));

  it(
    'should create User And Auto Login',
    inject([V4AuthenticationService, HttpClient], (auth: V4AuthenticationService, http: HttpClient) => {
      const obs = { login: () => { } };
      const spyObs = jest.spyOn(obs, 'login');
      const spy = jest.spyOn(http, 'post');
      spy.mockReturnValue(of({ data: {} }));
      auth.createUserAndAutoLogin('')
        .subscribe(
          obs.login
        );
      expect(spyObs).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    })
  );

  it('should verify otp', fakeAsync(inject([V4AuthenticationService, HttpClient],
    (auth: V4AuthenticationService, http: HttpClient) => {
      const spyHttp = jest.spyOn(http, 'patch');
      const spyLog = jest.spyOn(console, 'log');
      spyHttp.mockReturnValue(of('success'));
      auth.verifyOTP('', '').subscribe(() => { });
      tick();
      expect(spyLog).toHaveBeenCalledWith('success');
      spyHttp.mockReturnValue(throwError('error'));
      try {
        auth.verifyOTP('', '').subscribe(() => { });
        tick();
      } catch {
        expect(spyLog).toHaveBeenCalledWith('error');
      }
    })));

  it('should change Password', fakeAsync(inject([V4AuthenticationService, HttpClient, ProfileService],
    (auth: V4AuthenticationService, http: HttpClient, profile: ProfileService) => {
      jest.spyOn(profile, 'whoAmI').mockReturnValue(of({ id: 1, firstName: '123', lastName: '123' }));
      const spy = jest.spyOn(http, 'patch').mockReturnValue(of({}));
      auth.changePassword({ oldPassword: '123', passwordConfirmation: '123', otp: '123', newPassword: '123' }).subscribe(() => { });
      tick();
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('requestVerificationToken', fakeAsync(inject([V4AuthenticationService, HttpClient, ProfileService],
    (auth: V4AuthenticationService, http: HttpClient, profile: ProfileService) => {
      jest.spyOn(profile, 'whoAmI').mockReturnValue(of({ id: 1, firstName: '123', lastName: '123' }));
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({}));
      auth.requestVerificationToken().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
      auth.requestVerificationToken('1234').subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('changePhone', fakeAsync(inject([V4AuthenticationService, HttpClient, ProfileService],
    (auth: V4AuthenticationService, http: HttpClient, profile: ProfileService) => {
      jest.spyOn(profile, 'whoAmI').mockReturnValue(of({ id: 1, firstName: '123', lastName: '123' }));
      const spy = jest.spyOn(http, 'patch').mockReturnValue(of({}));
      auth.changePhone({ otp: '123', phone: '123' }).subscribe(() => { });
      expect(spy).toHaveBeenCalled();
    })));

  it('handle pi', inject([V4AuthenticationService, TokenStorage], (auth: V4AuthenticationService, storage: TokenStorage) => {
    const spyGet = jest.spyOn(storage, 'getAppInfoProperty');
    const spySet = jest.spyOn(storage, 'setAppInfoProperty');
    auth.getPI();
    expect(spyGet).toHaveBeenCalled();
    auth.savePI('1234');
    expect(spySet).toHaveBeenCalledWith('1234', 'pi');
  }));

  it('should  get anonymous', fakeAsync(inject([V4AuthenticationService, TokenStorage],
    (auth: V4AuthenticationService, storage: TokenStorage) => {
      jest.spyOn(storage, 'getAppInfoProperty').mockReturnValue('true');
      expect(auth.getAnonymous()).toBeTruthy();
    })));
  it('should  set anonymous', fakeAsync(inject([V4AuthenticationService, TokenStorage],
    (auth: V4AuthenticationService, storage: TokenStorage) => {
      const spy = jest.spyOn(storage, 'setAppInfoProperty');
      auth.saveAnonymous(true);
      expect(spy).toHaveBeenCalled();
    })));
  it('should  getUserId', fakeAsync(inject([V4AuthenticationService, TokenStorage],
    (auth: V4AuthenticationService, storage: TokenStorage) => {
      const spy = jest.spyOn(storage, 'getAppInfoProperty');
      spy.mockReturnValue('30');
      expect(auth.getUserId()).toBe(30);
      spy.mockReturnValue(undefined);
      expect(auth.getUserId()).toBe(null);
    })));
  it('should save userId', inject([V4AuthenticationService, TokenStorage],
    (auth: V4AuthenticationService, storage: TokenStorage) => {
      const spy = jest.spyOn(storage, 'setAppInfoProperty');
      auth.saveUserId(1);
      expect(spy).toHaveBeenCalledWith(1, 'id');
    }));
  it('mergeUserById', fakeAsync(inject([V4AuthenticationService],
    (auth: V4AuthenticationService) => {
      const spyObject = {
        err(): void { }
      };
      const spy = jest.spyOn(spyObject, 'err');
      auth.mergeUserById([1], 1).subscribe(() => { }, spyObject.err);
      expect(spy).toHaveBeenCalled();
    })));
});
