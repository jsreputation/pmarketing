import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurveyQuestionsPageComponent } from './new-survey-questions-page.component';

describe('NewSurveyQuestionsPageComponent', () => {
  let component: NewSurveyQuestionsPageComponent;
  let fixture: ComponentFixture<NewSurveyQuestionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSurveyQuestionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
