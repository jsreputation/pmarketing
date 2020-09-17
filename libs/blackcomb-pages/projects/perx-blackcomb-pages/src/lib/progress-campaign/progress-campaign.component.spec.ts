import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCampaignComponent } from './progress-campaign.component';

describe('ProgressCampaignComponent', () => {
  let component: ProgressCampaignComponent;
  let fixture: ComponentFixture<ProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
