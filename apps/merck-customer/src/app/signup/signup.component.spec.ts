import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { AuthenticationService, NotificationService } from '@perx/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const routerStub = {
    navigateByUrl: () => ({}),
    navigate: () => {}
  };
  const notificationServiceStub = { addSnack: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: { signup: () => of() }
        },
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {

    it('should fail password matching and call addSnack', () => {
      component.signupForm.controls.password.setValue(1234);
      component.signupForm.controls.confirmPassword.setValue(123);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
        (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onSubmit();
      expect(notificationServiceSpy).toHaveBeenCalledWith('Passwords do not match.');
    });

    it('should call addSnack if terms and conditions not accepted', () => {
      component.signupForm.controls.accept_terms.setValue(false);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
        (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onSubmit();
      expect(notificationServiceSpy).toHaveBeenCalledWith('Please accept terms & conditions.');
    });

    it('should call addSnack if terms and conditions is accepted and receive marketing communications NOT accepted', () => {
      component.signupForm.controls.accept_terms.setValue(true);
      component.signupForm.controls.accept_marketing.setValue(false);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
        (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onSubmit();
      expect(notificationServiceSpy).toHaveBeenCalledWith('Please agree to receive marketing communications from Merck Group hk.');
    });

    it('should able to signup', fakeAsync(() => {
      component.signupForm.controls.password.setValue(1234);
      component.signupForm.controls.confirmPassword.setValue(1234);
      component.signupForm.controls.accept_terms.setValue(true);
      component.signupForm.controls.accept_marketing.setValue(true);
      component.signupForm.controls.mobileNo.setValue(1234);
      component.signupForm.controls.name.setValue('testUser');
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
        (AuthenticationService as Type<AuthenticationService>);
      const authenticationSpy = spyOn(authenticationService, 'signup').and.returnValue(
        of({
          id: 1,
          state: '',
          firstName: 'testUser',
          lastName: '',
          middleName: '',
          phone: '1234',
          email: '',
          birthDate: '',
          gender: '',
          joinedDate: '',
          passwordExpiryDate: '',
          customProperties: {}
        })
      );
      const router: Router = fixture.debugElement.injector.get(Router);
      const routerSpy = spyOn(router, 'navigate');
      component.onSubmit();
      tick();
      expect(authenticationSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['enter-pin/register'], { state: { mobileNo: 1234 } });
    }));

  });

  it('should go to login', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.goToLogin();
    expect(routerSpy).toHaveBeenCalledWith('/login');
  });
});
