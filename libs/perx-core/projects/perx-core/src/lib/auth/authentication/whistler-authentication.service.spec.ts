import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerAuthenticationService } from './whistler-authentication.service';
import { TokenStorage } from './token-storage.service';
import { ProfileModule } from '../../profile/profile.module';
import { ConfigModule } from '../../config/config.module';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const tokenStorageStub = {
  getAppInfoProperty: () => null,
  clearAppInfoProperty: () => { },
  setAppInfoProperty: () => { }
};

describe('WhistlerAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: TokenStorage, useValue: tokenStorageStub }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerAuthenticationService = TestBed.get(WhistlerAuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should create with config', () => {
    // @ts-ignore
    const service: WhistlerAuthenticationService = new WhistlerAuthenticationService({ production: true }, null, null);
    expect(service).toBeTruthy();
  });

  it('failedAuth', inject([WhistlerAuthenticationService], (auth: WhistlerAuthenticationService) => {
    expect(auth.$failedAuth instanceof Observable).toBeTruthy();
  }));

  it('check isAuthorized', inject([WhistlerAuthenticationService, TokenStorage],
    (auth: WhistlerAuthenticationService, storage: TokenStorage) => {
      const spy = spyOn(storage, 'getAppInfoProperty');
      auth.isAuthorized();
      expect(spy).toHaveBeenCalledWith('userAccessToken');
    }));

  it('refreshToken', inject([WhistlerAuthenticationService], (auth: WhistlerAuthenticationService) => {
    const spyLogOut = spyOn(auth, 'logout');
    auth.refreshToken().subscribe(() => { });
    expect(spyLogOut).toHaveBeenCalled();
    spyOn(auth, 'getPI').and.returnValue('2');
    const spyLogin = spyOn(auth, 'autoLogin').and.returnValue(of(null));
    auth.refreshToken().subscribe(() => { });
    expect(spyLogin).toHaveBeenCalled();
  }));

  it('autoLogin', fakeAsync(inject([WhistlerAuthenticationService, HttpClient],
    (auth: WhistlerAuthenticationService, http: HttpClient) => {
      const spyHttp = spyOn(http, 'post').and.returnValue(of({ data: [{ attributes: { jwt: 'token' } }] }));
      auth.autoLogin().subscribe(() => { });
      tick();
      expect(spyHttp).toHaveBeenCalled();
    })));

  it('autoLogin error handle', fakeAsync(inject([WhistlerAuthenticationService, HttpClient],
    (auth: WhistlerAuthenticationService, http: HttpClient) => {
      spyOn(http, 'post').and.returnValue(of({ data: [{ attributes: { jwt: null } }] }));
      const errorFunction = () => {
        auth.autoLogin().subscribe(() => { });
        tick();
      };
      expect(errorFunction).toThrowError();
    })));

  it('createUserAndAutoLogin', fakeAsync(inject([WhistlerAuthenticationService, HttpClient],
    (auth: WhistlerAuthenticationService, http: HttpClient) => {
      const spy = spyOn(auth, 'savePI');
      spyOn(http, 'post').and.returnValue(of({ data: [{ attributes: { jwt: 'token' } }] }));
      auth.createUserAndAutoLogin(
        'test',
        {
          title: 'test',
          firstName: 'test',
          lastName: 'test',
          phoneNumber: '999',
          emailAddress: 'test',
          primaryIdentifier: 'null'
        }
      ).subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('createUserAndAutoLogin error handle', fakeAsync(inject([WhistlerAuthenticationService, HttpClient],
    (auth: WhistlerAuthenticationService, http: HttpClient) => {
      spyOn(http, 'post').and.returnValue(of({ data: [{ attributes: { jwt: null } }] }));
      const errorFunction = () => {
        auth.createUserAndAutoLogin('test').subscribe(() => { });
        tick();
      };
      expect(errorFunction).toThrowError();
    })));

  it('should call refreshShouldHappen', inject([WhistlerAuthenticationService], (whService: WhistlerAuthenticationService) => {
    expect(whService.refreshShouldHappen({} as HttpErrorResponse)).toBeFalsy();
  }));

  it('should verify token request', inject([WhistlerAuthenticationService], (whService: WhistlerAuthenticationService) => {
    expect(whService.verifyTokenRequest('http://test.com/preauth')).toBeTruthy();
    expect(whService.verifyTokenRequest('http://test.com//v4/oauth/token')).toBeTruthy();
    expect(whService.verifyTokenRequest('http://test.com/v2/oauth/token')).toBeTruthy();
    expect(whService.verifyTokenRequest('http://test.com/v2/cognito/login')).toBeTruthy();
  }));

  it('should login', fakeAsync(inject([WhistlerAuthenticationService, HttpClient],
    (auth: WhistlerAuthenticationService, http: HttpClient) => {
      const spy = spyOn(http, 'post').and.returnValue(of({ headers: { get: () => 'token' } }));
      auth.login('test', 'test').subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();

      spy.and.returnValue(throwError(null));
      auth.login('test', 'test').subscribe(() => { });

      spy.and.returnValue(of({ headers: { get: () => null } }));
      const errorFunction = () => {
        auth.login('test', 'test').subscribe(() => { });
        tick();
      };
      expect(errorFunction).toThrowError();
    })));

  it('handle error', fakeAsync(inject([WhistlerAuthenticationService], (whService: WhistlerAuthenticationService) => {
    const checkError = (err) => expect(err).toBe('Not implement yet');
    whService.getAppToken().subscribe(() => { }, checkError);
    whService.forgotPassword('').subscribe(() => { }, checkError);
    whService.resetPassword({ phone: 'string', newPassword: 'string', otp: 'string', passwordConfirmation: 'string' })
      .subscribe(() => { }, checkError);
    whService.resendOTP('99').subscribe(() => { }, checkError);
    whService.signup({ phone: 'string;', password: 'string;', passwordConfirmation: 'string;' }).subscribe(() => { }, checkError);
    whService.requestVerificationToken('').subscribe(() => { }, checkError);
    whService.changePhone({ phone: '', otp: '' }).subscribe(() => { }, checkError);
    whService.verifyOTP('', '').subscribe(() => { }, checkError);
    whService.changePassword({ newPassword: 'string;', passwordConfirmation: 'string;', oldPassword: 'string;', otp: 'string;', })
      .subscribe(() => { }, checkError);
  })));

  it('handle InterruptedUrl', inject([WhistlerAuthenticationService], (whService: WhistlerAuthenticationService) => {
    const url = 'google';
    whService.setInterruptedUrl(url);
    expect(whService.getInterruptedUrl()).toBe(url);
  }));

  it('logout', inject([WhistlerAuthenticationService, TokenStorage],
    (auth: WhistlerAuthenticationService, tokenStorage: TokenStorage) => {
      const spy = spyOn(tokenStorage, 'clearAppInfoProperty');
      auth.logout();
      expect(spy).toHaveBeenCalled();
    }));

  it('getAccessToken', fakeAsync(inject([WhistlerAuthenticationService], (auth: WhistlerAuthenticationService) => {
    auth.getAccessToken().subscribe((token) => {
      expect(token).toBe(auth.getUserAccessToken() ? auth.getUserAccessToken() : auth.getUserAccessToken());
    });
    tick();
    spyOn(auth, 'getUserAccessToken').and.returnValue('token');
    auth.getAccessToken().subscribe((token) => {
      expect(token).toBe('token');
    });
    tick();
  })));

  it('should call tokenStorage', inject([WhistlerAuthenticationService, TokenStorage],
    (auth: WhistlerAuthenticationService, tokenStorage: TokenStorage) => {
      const setAppInfoProperty = spyOn(tokenStorage, 'setAppInfoProperty');
      auth.saveAppAccessToken('token');
      expect(setAppInfoProperty).toHaveBeenCalledWith('token', 'appAccessToken');
      auth.savePI('pi');
      expect(setAppInfoProperty).toHaveBeenCalledWith('pi', 'pi');
    }));

  it('should  get anonymous', fakeAsync(inject([WhistlerAuthenticationService, TokenStorage], 
    (auth: WhistlerAuthenticationService, storage: TokenStorage) => { 
      spyOn(storage, 'getAppInfoProperty').and.returnValue('true');
      expect(auth.getAnonymous()).toBeTruthy();
  })));

  it('should  getUserId', fakeAsync(inject([WhistlerAuthenticationService, TokenStorage], 
    (auth: WhistlerAuthenticationService, storage: TokenStorage) => { 
      const spy = spyOn(storage, 'getAppInfoProperty')
      spy.and.returnValue('30');
      expect(auth.getUserId()).toBe(30);
      spy.and.returnValue(undefined);
      expect(auth.getUserId()).toBe(null);
  })));

  it('mergeUserById', fakeAsync(inject([WhistlerAuthenticationService, HttpClient], 
    (auth: WhistlerAuthenticationService, http: HttpClient)=>{
      const spy = spyOn(http, 'post').and.returnValue(of());
      auth.mergeUserById([1],2);
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
