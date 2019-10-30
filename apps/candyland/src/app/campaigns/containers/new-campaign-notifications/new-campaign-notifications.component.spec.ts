import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignNotificationsComponent } from './new-campaign-notifications.component';

describe('NewCampaignNotificationsComponent', () => {
  let component: NewCampaignNotificationsComponent;
  let fixture: ComponentFixture<NewCampaignNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
