import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import {
  BadgeService,
  ICampaignService,
  IInstantOutcomeTransactionService,
  LoyaltyService, NotificationService,
  RewardsService,
  UtilsModule
} from '@perxtech/core';
import { InstantRewardOutcomeComponent } from './instant-reward-outcome.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

const campaignServiceStub: Partial<ICampaignService> = {};
const notificationServiceStub: Partial<NotificationService> = {};
const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalty: () => of(),
};
const badgeServiceStub: Partial<BadgeService> = {
  getBadge: () => of(),
};
const rewardServiceStub: Partial<RewardsService> = {
  getReward: () => of(),
};
const instantOutcomeTransactionServiceStub: Partial<IInstantOutcomeTransactionService> = {
  getInstantOutcomeTransactions: () => of([]),
  claimPrize: () => of(),
  getInstantRewardState: () => of(),
  getInstantOutcomeTransaction: () => of(),
  getInstantOutcomeTransactionOutcomes: () => of([]),
};

interface RouterWithQueryParam extends Router {
  queryParams: Observable<{ transactionId: number }>;
  params: Observable<{ id: number }>;
}

const routerStub: Partial<RouterWithQueryParam> = {
  navigate: () => Promise.resolve(true),
  params: of({ id: 1 }),
};

describe('PrizeSetOutcomeComponent', () => {
  let component: InstantRewardOutcomeComponent;
  let fixture: ComponentFixture<InstantRewardOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstantRewardOutcomeComponent],
      imports: [
        MatToolbarModule,
        MatCardModule,
        RouterTestingModule,
        MatProgressBarModule,
        MatListModule,
        UtilsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routerStub,
        },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub },
        {
          provide: IInstantOutcomeTransactionService,
          useValue: instantOutcomeTransactionServiceStub,
        },
        {
          provide: BadgeService,
          useValue: badgeServiceStub,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantRewardOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
