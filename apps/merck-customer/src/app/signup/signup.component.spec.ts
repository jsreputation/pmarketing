import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService, NotificationService, ThemesService } from '@perxtech/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from '@angular/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

const themesServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const routerStub = {
    navigateByUrl: () => ({}),
    navigate: () => { }
  };
  const notificationServiceStub: Partial<NotificationService> = { addSnack: () => { } };

  const activatedRouteStub: Partial<ActivatedRoute> = {
    queryParams: of({ phone: '852123456' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          component: SignupComponent,
          path: 'login'
        }]),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            signup: () => of(),
            getAppToken: () => of({}),
            getAppAccessToken: () => 'token'
          }
        },
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
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
    it('should call addSnack if terms and conditions not accepted', () => {
      component.signupForm.controls.accept_terms.setValue(false);
      const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
      (NotificationService as Type<NotificationService>);
      const notificationServiceSpy = spyOn(notificationService, 'addSnack');
      component.onSubmit();
      expect(notificationServiceSpy).toHaveBeenCalledWith('SIGN_UP_PAGE.ACCEPT_TNC');
    });

    it('should able to signup', fakeAsync(() => {
      component.signupForm.controls.password.setValue(1234);
      component.signupForm.controls.confirmPassword.setValue(1234);
      component.signupForm.controls.accept_terms.setValue(true);
      component.signupForm.controls.mobileNo.setValue(1234);
      component.signupForm.controls.countryCode.setValue(852);
      // component.signupForm.controls.name.setValue('testUser');
      const authenticationService: AuthenticationService = fixture.debugElement.injector.get<AuthenticationService>
      (AuthenticationService as Type<AuthenticationService>);
      const authenticationSpy = spyOn(authenticationService, 'signup').and.returnValue(
        of({
          id: 1,
          state: '',
          firstName: '',
          lastName: '',
          middleName: '',
          phone: '8521234',
          email: '',
          birthDate: undefined,
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
      expect(routerSpy).toHaveBeenCalledWith(['enter-pin/register'],
        { state:
          {
            mobileNo: '8521234',
            countryCode: '852'
          }
        }
      );
    }));

  });

  it('should go to login', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.goToLogin();
    expect(routerSpy).toHaveBeenCalledWith('/login');
  });
});
