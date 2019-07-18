import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDateFieldComponent } from './question-date-field.component';

describe('QuestionDateFieldComponent', () => {
  let component: QuestionDateFieldComponent;
  let fixture: ComponentFixture<QuestionDateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDateFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
