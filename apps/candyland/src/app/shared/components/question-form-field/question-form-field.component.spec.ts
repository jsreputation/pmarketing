import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormFieldComponent } from './question-form-field.component';

describe('QuestionFormFieldComponent', () => {
  let component: QuestionFormFieldComponent;
  let fixture: ComponentFixture<QuestionFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
