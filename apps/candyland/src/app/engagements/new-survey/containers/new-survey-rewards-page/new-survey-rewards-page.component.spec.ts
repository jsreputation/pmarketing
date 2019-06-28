import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSurveyRewardsPageComponent } from './new-survey-rewards-page.component';

describe('NewSurveyRewardsPageComponent', () => {
  let component: NewSurveyRewardsPageComponent;
  let fixture: ComponentFixture<NewSurveyRewardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSurveyRewardsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSurveyRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
