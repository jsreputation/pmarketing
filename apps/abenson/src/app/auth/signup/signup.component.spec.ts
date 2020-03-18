import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SignUpComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService, ProfileService, ConfigService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('SignupComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let auth: AuthenticationService;
  const authenticationServiceStub: Partial<AuthenticationService> = {
    getAppToken: () => of({
      access_token: 'string',
      token_type: 'string',
      expires_in: 666,
      created_at: 666
    }),
    getAppAccessToken: () => 'token'
  };
  const profileServiceStub: Partial<ProfileService> = { verifyCardNumber: () => of(true) };
  const configServiceStub: ConfigService = { readAppConfig: () => of() };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm', () => {
    const initFormSpy = spyOn(component, 'initForm');
    component.ngOnInit();
    expect(initFormSpy).toHaveBeenCalled();
  });

  it('should call this.authService.getAppToken if !token', fakeAsync(() => {
    const getAppTokenSpy = spyOn(auth, 'getAppToken').and.callThrough();
    const getAppAccessTokenSpy = spyOn(auth, 'getAppAccessToken').and.returnValue('');
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(getAppAccessTokenSpy).toHaveBeenCalled();
    expect(getAppTokenSpy).toHaveBeenCalled();
  }));
});
