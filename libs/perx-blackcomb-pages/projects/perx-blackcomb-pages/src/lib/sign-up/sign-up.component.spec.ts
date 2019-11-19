import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyModule as PerxSurveyModule, IFormsService, AuthenticationService, Config, IGameService, InstantOutcomeService } from '@perx/core';
import { SignUpComponent } from './sign-up.component';
import { of } from 'rxjs';
import { MatSnackBar, MatInputModule, MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
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
