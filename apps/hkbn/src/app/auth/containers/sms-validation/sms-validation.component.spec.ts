import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsValidationComponent } from './sms-validation.component';
import { AuthenticationService, UtilsModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('SmsValidationComponent', () => {
  let component: SmsValidationComponent;
  let fixture: ComponentFixture<SmsValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UtilsModule, RouterTestingModule],
      declarations: [SmsValidationComponent],
      providers: [
        {
          provide: AuthenticationService, useValue: {
            verifyOTP: () => of(true),
            v4GameOauth: () => Promise.resolve(true),
            resendOTP: () => of(true)
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
});
