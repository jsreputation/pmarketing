import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyModule as PerxSurveyModule, IFormsService } from '@perx/core';
import { SignUpComponent } from './sign-up.component';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const formSvcStub = {
    getSignupForm: () => of('')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [PerxSurveyModule],
      providers: [
        {
          provide: IFormsService, useValue: formSvcStub
        }]
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
