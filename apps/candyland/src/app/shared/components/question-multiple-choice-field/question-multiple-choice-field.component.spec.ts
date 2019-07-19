import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultipleChoiceFieldComponent } from './question-multiple-choice-field.component';

describe('QuestionMultipleChoiceFieldComponent', () => {
  let component: QuestionMultipleChoiceFieldComponent;
  let fixture: ComponentFixture<QuestionMultipleChoiceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMultipleChoiceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultipleChoiceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
