import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLaunchMessageComponent } from './campaign-launch-message.component';

describe('CampaignLaunchMessageComponent', () => {
  let component: CampaignLaunchMessageComponent;
  let fixture: ComponentFixture<CampaignLaunchMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignLaunchMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLaunchMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
