import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsSurveyPageComponent } from './new-campaign-rewards-survey-page.component';

describe('NewCampaignRewardsSurveyPageComponent', () => {
  let component: NewCampaignRewardsSurveyPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsSurveyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignRewardsSurveyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsSurveyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
