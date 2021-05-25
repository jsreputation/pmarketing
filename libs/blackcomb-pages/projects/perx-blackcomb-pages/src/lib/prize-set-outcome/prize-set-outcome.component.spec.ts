import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { ICampaignService, LoyaltyService, RewardsService, IPrizeSetOutcomeService } from '@perxtech/core';
import { PrizeSetOutcomeComponent } from './prize-set-outcome.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

const campaignServiceStub: Partial<ICampaignService> = {};
const loyaltyServiceStub: Partial<LoyaltyService> = {};
const rewardServiceStub: Partial<RewardsService> = {};
const prizeSetOutcomeService: Partial<IPrizeSetOutcomeService> = {};


describe('PrizeSetOutcomeComponent', () => {
  let component: PrizeSetOutcomeComponent;
  let fixture: ComponentFixture<PrizeSetOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeSetOutcomeComponent],
      imports: [
        MatToolbarModule,
        MatCardModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        TranslateModule.forChild()
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub },
        { provide: IPrizeSetOutcomeService, useValue: prizeSetOutcomeService }
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
