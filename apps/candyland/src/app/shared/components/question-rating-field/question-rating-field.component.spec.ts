import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRatingFieldComponent } from './question-rating-field.component';

describe('QuestionRatingFieldComponent', () => {
  let component: QuestionRatingFieldComponent;
  let fixture: ComponentFixture<QuestionRatingFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRatingFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRatingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
