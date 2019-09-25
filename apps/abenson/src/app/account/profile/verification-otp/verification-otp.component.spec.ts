import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOtpComponent } from './verification-otp.component';
import { UtilsModule, ProfileService, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const profileServiceStub = {
  whoAmI: () => of({ phone: '12345' })
};

const authenticationServiceStub = {
  changePhone: () => of(),
  requestVerificationToken: () => of(),
  resendOTP: () => of()
};

describe('VerificationOtpComponent', () => {
  let component: VerificationOtpComponent;
  let fixture: ComponentFixture<VerificationOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOtpComponent],
      imports: [
        UtilsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
