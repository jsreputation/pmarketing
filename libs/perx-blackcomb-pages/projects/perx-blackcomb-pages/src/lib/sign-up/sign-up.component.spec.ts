import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyModule as PerxSurveyModule, IFormsService, AuthenticationService } from '@perx/core';
import { SignUpComponent } from './sign-up.component';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material';

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
      imports: [PerxSurveyModule],
      providers: [
        {
          provide: IFormsService, useValue: formSvcStub
        },
        {
          provide: MatSnackBar, useValue: matSnackStub
        },
        {
          provide: Router, useValue: {}
        },
        {
          provide: AuthenticationService, useValue: {}
        }
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
