import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazAdaptedCampaignCardComponent } from './raz-adapted-campaign-card.component';
import { ProgressBarModule } from '@perxtech/core';
import { MatCardModule } from '@angular/material';

describe('RazAdaptedCampaignCardComponent', () => {
  let component: RazAdaptedCampaignCardComponent;
  let fixture: ComponentFixture<RazAdaptedCampaignCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazAdaptedCampaignCardComponent ],
      imports: [
        ProgressBarModule,
        MatCardModule
      ]
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
