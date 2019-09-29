import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { MatDialogModule } from '@angular/material';
import { RewardsModule, RewardsService, LoyaltyService, IVoucherService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { rewards } from 'src/app/mock/rewards.mock';
import { loyalty } from 'src/app/mock/loyalty.mock';

const rewardsServiceStub = {
  getReward: () => of(rewards[0])
};

const LoyaltyServiceStub = {
  getLoyalty: () => of(loyalty)
};

const iVoucherServiceStub = {
  issueReward: () => of(null)
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
