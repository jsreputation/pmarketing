import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChangeMobileComponent } from './change-mobile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';
import { Router } from '@angular/router';

const authenticationService = {
  requestVerificationToken: () => of(null)
};

describe('ChangeMobileComponent', () => {
  let component: ChangeMobileComponent;
  let fixture: ComponentFixture<ChangeMobileComponent>;
  let auth: AuthenticationService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeMobileComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([{
          path: 'verify_otp/phone',
          component: ChangeMobileComponent
        }])
      ],
      providers: [
        {
          provide: AuthenticationService, useValue: authenticationService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobileComponent);
    component = fixture.componentInstance;
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request otp', fakeAsync(() => {
    spyOn(auth, 'requestVerificationToken').and.callThrough();
    const routerSpy = spyOn(router, 'navigate');
    component.requestOtp();
    tick();
    expect(routerSpy).toHaveBeenCalled();
  }));
});
