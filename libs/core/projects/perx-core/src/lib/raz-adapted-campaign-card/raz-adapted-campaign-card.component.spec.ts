import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazAdaptedCampaignCardComponent } from './raz-adapted-campaign-card.component';

describe('RazAdaptedCampaignCardComponent', () => {
  let component: RazAdaptedCampaignCardComponent;
  let fixture: ComponentFixture<RazAdaptedCampaignCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazAdaptedCampaignCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazAdaptedCampaignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
