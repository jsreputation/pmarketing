import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLongTextFieldComponent } from './question-long-text-field.component';

describe('QuestionLongTextFieldComponent', () => {
  let component: QuestionLongTextFieldComponent;
  let fixture: ComponentFixture<QuestionLongTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLongTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLongTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
