import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupFieldComponent } from './question-group-field.component';

describe('QuestionGroupFieldComponent', () => {
  let component: QuestionGroupFieldComponent;
  let fixture: ComponentFixture<QuestionGroupFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
