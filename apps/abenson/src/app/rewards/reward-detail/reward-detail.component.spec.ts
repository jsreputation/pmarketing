import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { MatDialogModule } from '@angular/material';
import { RewardsModule, RewardsService, LoyaltyService, IVoucherService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { rewards } from 'src/app/mock/rewards.mock';
import { loyalty } from 'src/app/mock/loyalty.mock';
import {VoucherState} from '../../../../../../libs/perx-core/projects/perx-core/src/lib/vouchers/models/voucher.model';
import {RedemptionType} from '../../../../../../libs/perx-core/projects/perx-core/src/lib/perx-core.models';

const rewardsServiceStub: Partial<RewardsService> = {
  getReward: () => of(rewards[0])
};

const LoyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalty: () => of(loyalty)
};

const iVoucherServiceStub: Partial<IVoucherService> = {
  issueReward: () => of( {
    id: 1,
    expiry: null,
    state: VoucherState.redeemed,
    redemptionType: RedemptionType.txtCode,
    reward: {
      id: 1,
      name: '',
      description: '',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
    }
  })
};

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailComponent],
      imports: [
        MatDialogModule,
        RewardsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: LoyaltyServiceStub },
        { provide: IVoucherService, useValue: iVoucherServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
