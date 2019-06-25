import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurveyAppearancePageComponent } from './new-survey-appearance-page.component';

describe('NewSurveyAppearancePageComponent', () => {
  let component: NewSurveyAppearancePageComponent;
  let fixture: ComponentFixture<NewSurveyAppearancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSurveyAppearancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyAppearancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
