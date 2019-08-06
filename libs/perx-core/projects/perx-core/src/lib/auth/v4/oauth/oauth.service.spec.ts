import { TestBed } from '@angular/core/testing';

import { OauthService } from './oauth.service';
import { OauthModule } from './oauth.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ProfileModule } from '../../../profile/profile.module';

describe('OauthService', () => {
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
  let service: OauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        ProfileModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ]
    });
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(OauthService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should get app acccess token', (done: DoneFn) => {
    service.getAppAccessToken()
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
    const url = location.host;
    const req = httpTestingController.expectOne(baseUrlForAppAccessToken + 'v2/oauth/token?url=' + url);

    expect(req.request.method).toEqual('POST');

    req.flush(null);

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

  it('should verify forgot password OTP', (done: DoneFn) => {
    service.verifyOTP('6398898888', '8888')
      .subscribe((res: { message: string, code: number }) => {
        expect(res.message).toBe('OTP is correct');
        expect(res.code).toBe(20);
        done();
      });

    const req = httpTestingController.expectOne(baseUrl + 'v4/customers/confirm');

    expect(req.request.method).toEqual('PUT');

    req.flush({ message: 'OTP is correct', code: 20 });

    httpTestingController.verify();
  });

  it('should reset password', (done: DoneFn) => {
    service.resetPassword({ phone: '6398898888', newPassword: '1237', otp: '8888', passwordConfirmation: '1237' })
      .subscribe((res: { message: string }) => {
        expect(res.message).toBe('Password has been reset!');
        done();
      });

    const req = httpTestingController.expectOne(baseUrl + 'v4/customers/reset_password');

    expect(req.request.method).toEqual('PUT');

    req.flush({ message: 'Password has been reset!' });

    httpTestingController.verify();
  });

  it('should resend OTP', (done: DoneFn) => {
    service.resendOTP('6398898888')
      .subscribe((res: { message: string }) => {
        expect(res.message).toBe('Verification code has been resent');
        done();
      });

    const req = httpTestingController.expectOne(baseUrl + 'v4/customers/resend_confirmation?phone=6398898888');

    expect(req.request.method).toEqual('GET');

    req.flush({ message: 'Verification code has been resent' });

    httpTestingController.verify();
  });

});
