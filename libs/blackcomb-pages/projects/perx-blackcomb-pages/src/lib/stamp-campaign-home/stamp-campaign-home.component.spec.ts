import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampCampaignHomeComponent } from './stamp-campaign-home.component';

describe('StampCampaignHomeComponent', () => {
  let component: StampCampaignHomeComponent;
  let fixture: ComponentFixture<StampCampaignHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampCampaignHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCampaignHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
