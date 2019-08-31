import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerModule } from '../../../ui/error-handler/error-handler.module';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ErrorHandlerModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            login: () => of(true),
            getInterruptedUrl: () => null
          }
        }
      ],
      declarations: [LoginComponent, LoginFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to forgot password, when call forgotPassword method', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.forgotPassword();
    expect(navigateSpy).toHaveBeenCalledWith(['/forgot-password'], {queryParams: {identifier: ''}});
  });

  describe('login method', () => {

    let authenticationService;
    let loginSpy;
    let getInterruptedUrlSpy;
    let navigateSpy;

    beforeEach(() => {
      authenticationService = TestBed.get(AuthenticationService);
      loginSpy = spyOn(authenticationService, 'login');
      getInterruptedUrlSpy = spyOn(authenticationService, 'getInterruptedUrl');
      navigateSpy = spyOn(router, 'navigate');
    });

    it('should call login method, authorize and redirect to root page', async () => {
      loginSpy = loginSpy.and.returnValue(of({bearer_token: 'SWWERW'}));
      getInterruptedUrlSpy = getInterruptedUrlSpy.and.returnValue(null);

      await component.login({user: '639876543210', pass: 'qwerty123', stayLoggedIn: false});

      expect(loginSpy).toHaveBeenCalledWith('639876543210', 'qwerty123');
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

    it('should call login method, authorize and redirect to InterruptedUrl page', async () => {
      loginSpy = loginSpy.and.returnValue(of({bearer_token: 'SWWERW'}));
      getInterruptedUrlSpy = getInterruptedUrlSpy.and.returnValue('/wallet');

      await component.login({user: '639876543210', pass: 'qwerty123', stayLoggedIn: false});

      expect(loginSpy).toHaveBeenCalledWith('639876543210', 'qwerty123');
      expect(navigateSpy).toHaveBeenCalledWith(['/wallet']);
    });
  });
});
