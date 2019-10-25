import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsValidationComponent } from './sms-validation.component';
import { UtilsModule, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('SmsValidationComponent', () => {
  let component: SmsValidationComponent;
  let fixture: ComponentFixture<SmsValidationComponent>;
  const authenticationServiceStub = {
    verifyOTP: () => of(),
    resendOTP: () => of(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsValidationComponent ],
      imports: [
        UtilsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationServiceStub}
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
