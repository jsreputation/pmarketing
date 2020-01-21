import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsValidationComponent } from './sms-validation.component';
import { UtilsModule, AuthenticationService, LoyaltyService, ProfileService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';

describe('SmsValidationComponent', () => {
  let component: SmsValidationComponent;
  let fixture: ComponentFixture<SmsValidationComponent>;
  const authenticationServiceStub: Partial<AuthenticationService> = {
    verifyOTP: () => of(),
    resendOTP: () => of(),
    getAppAccessToken: () => '',
    getAppToken: () => of()
  };
  const loyaltyServiceStub = {
    getLoyalties: () => of()
  };
  const profileServiceStub = {
    setCardNumber: () => of()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmsValidationComponent],
      imports: [
        UtilsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        SharedDataService
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
});
