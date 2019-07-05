import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsPageComponent } from './new-campaign-rewards-page.component';

describe('NewCampaignRewardsPageComponent', () => {
  let component: NewCampaignRewardsPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignRewardsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
