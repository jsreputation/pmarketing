import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCampaignHomeComponent } from './progress-campaign-home.component';

describe('ProgressCampaignHomeComponent', () => {
  let component: ProgressCampaignHomeComponent;
  let fixture: ComponentFixture<ProgressCampaignHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCampaignHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
