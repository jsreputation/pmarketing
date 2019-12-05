import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  Config,
  IGameService,
  InstantOutcomeService,
  AuthenticationService,
  NotificationService,
  SurveyService,
} from '@perx/core';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const notificationServiceStub: Partial<NotificationService> = {};

  const configStub: Partial<Config> = {
    preAuth: false
  };

  const gameServiceStub: Partial<IGameService> = {
    prePlayConfirm: () => of()
  };

  const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
    prePlayConfirm: () => of()
  };

  const authServiceStub: Partial<AuthenticationService> = {
    getUserId: () => 0,
    autoLogin: () => of(),
    mergeUserById: () => of(),
    getPI: () => '',
    getUserAccessToken: () => '',
    getAnonymous: () => true,
    logout: () => {}
  };

  const surveyServiceStub: Partial<SurveyService> = {
    postSurveyAnswer: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignInComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: Config, useValue: configStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: SurveyService, useValue: surveyServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
