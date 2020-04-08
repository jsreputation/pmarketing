import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SmsValidationComponent } from './sms-validation.component';
import { AuthenticationService, UtilsModule } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Type } from '@angular/core';
import { DataTransferService } from '../../../services/data-transfer.service';
import { MatIconModule } from '@angular/material';

describe('SmsValidationComponent', () => {
  let component: SmsValidationComponent;
  let fixture: ComponentFixture<SmsValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UtilsModule,
        RouterTestingModule.withRoutes([{
          path: 'home',
          component: SmsValidationComponent
        }]),
        TranslateModule.forRoot(),
        MatIconModule
      ],
      declarations: [SmsValidationComponent],
      providers: [
        {
          provide: AuthenticationService, useValue: {
            verifyOTP: () => of(true),
            login: () => of(true),
            resendOTP: () => of(true),
            getInterruptedUrl: () => 'home'
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ identifier: '639876543210' })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validate method', () => {
    let authenticationService;
    let transferService: DataTransferService;
    let spyverifyOTP;
    let router: Router;

    beforeEach(() => {
      authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
      transferService = TestBed.get<DataTransferService>(DataTransferService as Type<DataTransferService>);
      router = TestBed.get<Router>(Router as Type<Router>);
      spyverifyOTP = spyOn(authenticationService, 'verifyOTP');
    });

    it('should validate otp, authorize and redirect to root page', fakeAsync(() => {
      spyverifyOTP.and.returnValue(of({ message: 'OTP verified' }));
      jest.spyOn(transferService, 'updateData$', 'get').mockReturnValue(of(null));
      spyOn(authenticationService, 'login').and.returnValue(of(null));
      spyOn(component, 'login').and.returnValue(of(null));
      const spy = spyOn(router, 'navigateByUrl');
      component.validate('888888');
      tick();
      expect(spy).toHaveBeenCalledWith('home');
    }));
  });

  it('should make request for send otp, when call resendSms method', () => {
    const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    const resendSpy = spyOn(authenticationService, 'resendOTP').and.returnValue(of(null));
    component.resendSms();
    expect(resendSpy).toHaveBeenCalledWith('639876543210');
  });
});
