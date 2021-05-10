import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { ICampaignService, LoyaltyService, RewardsService } from '@perxtech/core';
import { PrizeSetOutcomeComponent } from './prize-set-outcome.component';

const campaignServiceStub: Partial<ICampaignService> = {};
const loyaltyServiceStub: Partial<LoyaltyService> = {};
const rewardServiceStub: Partial<RewardsService> = {};

describe('PrizeSetOutcomeComponent', () => {
  let component: PrizeSetOutcomeComponent;
  let fixture: ComponentFixture<PrizeSetOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeSetOutcomeComponent],
      imports: [ MatToolbarModule,
        MatCardModule,
        RouterTestingModule],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeSetOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
