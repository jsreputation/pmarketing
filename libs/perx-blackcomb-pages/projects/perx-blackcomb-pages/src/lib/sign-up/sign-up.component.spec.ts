import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SurveyModule as PerxSurveyModule,
  IFormsService,
  AuthenticationService,
  Config,
  IGameService,
  InstantOutcomeService,
  SurveyService
} from '@perx/core';
import { SignUpComponent } from './sign-up.component';
import { of } from 'rxjs';
import { MatSnackBar, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IWAppAccessTokenResponse } from '@perx/whistler';

const configStub: Partial<Config> = {
  preAuth: false
};

const gameServiceStub: Partial<IGameService> = {
  prePlayConfirm: () => of()
};

const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
  prePlayConfirm: () => of()
};

const locationStub: Partial<Location> = {
  getState: () => { }
};

const surveyServiceStub: Partial<SurveyService> = {
  postSurveyAnswer: () => of()
};

const authServiceStub: Partial<AuthenticationService> = {
  getUserId: () => 0,
  autoLogin: () => of(),
  mergeUserById: () => of(),
  getAppToken: () => of({} as IWAppAccessTokenResponse),
  getAppAccessToken: () => 'token'
};

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const formSvcStub: Partial<IFormsService> = {
    getSignupForm: () => of({
      title: '',
      questions: []
    })
  };
  const matSnackStub: Partial<MatSnackBar> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        PerxSurveyModule,
        MatInputModule,
        HttpClientModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
        ]),
      ],
      providers: [
        {
          provide: IFormsService, useValue: formSvcStub
        },
        {
          provide: MatSnackBar, useValue: matSnackStub
        },
        {
          provide: AuthenticationService, useValue: {}
        },
        { provide: Config, useValue: configStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: SurveyService, useValue: surveyServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
