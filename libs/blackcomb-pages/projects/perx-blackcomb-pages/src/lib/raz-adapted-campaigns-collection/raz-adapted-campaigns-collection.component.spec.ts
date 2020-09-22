import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazAdaptedCampaignsCollectionComponent } from './raz-adapted-campaigns-collection.component';
import { CampaignServiceModule, ICampaignService, LoyaltyService, ProgressBarModule, StampService } from '@perxtech/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

describe('RazAdaptedCampaignsCollectionComponent', () => {
  let component: RazAdaptedCampaignsCollectionComponent;
  let fixture: ComponentFixture<RazAdaptedCampaignsCollectionComponent>;
  const stampServiceStub: Partial<StampService> = {
    getCards: () => of()
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazAdaptedCampaignsCollectionComponent ],
      imports: [
        MatCardModule,
        ProgressBarModule,
        CampaignServiceModule.forRoot()
      ],
      providers: [
        { provide: StampService, value: stampServiceStub },
        { provide: LoyaltyService, value: loyaltyServiceStub },
        { provide: ICampaignService, value: campaignServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazAdaptedCampaignsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
