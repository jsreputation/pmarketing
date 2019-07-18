import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCountryCodeFieldComponent } from './question-country-code-field.component';

describe('QuestionCountryCodeFieldComponent', () => {
  let component: QuestionCountryCodeFieldComponent;
  let fixture: ComponentFixture<QuestionCountryCodeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCountryCodeFieldComponent ]
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
