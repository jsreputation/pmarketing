import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCountryCodeFieldComponent } from './question-country-code-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { SurveyService } from '@cl-core/services/survey.service';

describe('QuestionCountryCodeFieldComponent', () => {
  let component: QuestionCountryCodeFieldComponent;
  let fixture: ComponentFixture<QuestionCountryCodeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [ QuestionCountryCodeFieldComponent ],
      providers: [
        {
          provide: SurveyService, useValue: {getCountriesList: () => []}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCountryCodeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
