import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@perx/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';

const authenticationServiceStub = {
  requestVerificationToken: () => of(null)
};

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let auth: AuthenticationService;
  let sharedData: SharedDataService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([{
          path: 'account/profile/verify-otp/password',
          component: ChangePasswordComponent
        }])
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    sharedData = TestBed.get<SharedDataService>(SharedDataService as Type<SharedDataService>);
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change password', fakeAsync(() => {
    spyOn(auth, 'requestVerificationToken').and.callThrough();
    const sharedSpy = spyOn(sharedData, 'addData');
    const routerSpy = spyOn(router, 'navigate');
    component.changePassword();
    tick();
    expect(sharedSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  }));
});
