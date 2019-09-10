import { TestBed } from '@angular/core/testing';

import { V4AuthenticationService } from './v4-authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TokenStorage } from './token-storage.service';
import { ProfileModule } from '../../profile/profile.module';

describe('V4AuthenticationService', () => {
  const baseUrl = 'https://api.perxtech.io/';
  const baseUrlForAppAccessToken = 'http://localhost:4000/';
  let httpTestingController: HttpTestingController;
  let service: V4AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ProfileModule,
      ],
      providers: [TokenStorage]
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
    const req = httpTestingController.expectOne(baseUrlForAppAccessToken + 'v2/oauth/token?url=' + url);

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

  // it('should verify forgot password OTP', (done: DoneFn) => {
  //   service.verifyOTP('6398898888', '8888')
  //     .subscribe((res: { message: string, code: number }) => {
  //       expect(res.message).toBe('OTP is correct');
  //       expect(res.code).toBe(20);
  //       done();
  //     });

  //   const req = httpTestingController.expectOne(baseUrl + 'v4/customers/confirm');

  //   expect(req.request.method).toEqual('PATCH');

  //   req.flush({ message: 'OTP is correct', code: 20 });

  //   httpTestingController.verify();
  // });

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

  // it('should resend OTP', (done: DoneFn) => {
  //   service.resendOTP('6398898888')
  //     .subscribe((res: { message: string }) => {
  //       expect(res.message).toBe('Verification code has been resent');
  //       done();
  //     });

  //   const req = httpTestingController.expectOne(baseUrl + 'v4/customers/resend_confirmation?phone=6398898888');

  //   expect(req.request.method).toEqual('GET');

  //   req.flush({ message: 'Verification code has been resent' });

  //   httpTestingController.verify();
  // });

});
