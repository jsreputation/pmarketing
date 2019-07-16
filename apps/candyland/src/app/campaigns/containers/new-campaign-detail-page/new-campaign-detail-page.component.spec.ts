import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignDetailPageComponent } from './new-campaign-detail-page.component';

describe('NewCampaignDetailPageComponent', () => {
  let component: NewCampaignDetailPageComponent;
  let fixture: ComponentFixture<NewCampaignDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
