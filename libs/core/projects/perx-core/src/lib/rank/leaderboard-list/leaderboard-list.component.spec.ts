import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardListComponent } from './leaderboard-list.component';
// import { MatCardModule, MatRippleModule } from '@angular/material';
// import { VouchersModule } from '../../vouchers/vouchers.module';
// import { RouterTestingModule } from '@angular/router/testing';
// import { IVoucher, VoucherState } from '../../vouchers/models/voucher.model';
// import { ConfigModule } from '../../config/config.module';
// import { of } from 'rxjs';
// import { IMerchantsService } from '../../merchants/imerchants.service';
// import { IVoucherService } from '../../vouchers/ivoucher.service';
// import { RewardsService } from '../../rewards/rewards.service';
// import { By } from '@angular/platform-browser';
// import { DatePipe } from '@angular/common';
// import { RedemptionType } from '../../perx-core.models';
// import { TranslateModule } from '@ngx-translate/core';
// import { IReward } from '../../rewards/models/reward.model';

describe('LeaderboardListComponent', () => {
  let component: LeaderboardListComponent;
  let fixture: ComponentFixture<LeaderboardListComponent>;
  // const rewardsServiceStub: Partial<RewardsService> = {
  //   getReward: () => of()
  // };

  // const merchantsServiceStub: Partial<IMerchantsService> = {
  //   getMerchant: () => of()
  // };

  // const mockReward: IReward = {
  //   id: 21,
  //   name: '',
  //   favorite: false,
  //   description: '',
  //   subtitle: '',
  //   validFrom: new Date(),
  //   validTo: new Date(),
  //   sellingFrom: new Date(),
  //   rewardThumbnail: '',
  //   rewardBanner: '',
  //   merchantImg: '',
  //   rewardPrice: [],
  //   merchantId: 1,
  //   merchantName: '',
  //   merchantWebsite: '',
  //   termsAndConditions: '',
  //   howToRedeem: '',
  //   categoryTags: [],
  //   loyalty: []
  // };

  // const mockRedeemedVoucherDetail: IVoucher = {
  //   id: 21,
  //   expiry: null,
  //   state: VoucherState.redeemed,
  //   redemptionType: RedemptionType.txtCode,
  //   reward: mockReward,
  // };

  // const mockIssuedVoucherDetail: IVoucher = {
  //   id: 21,
  //   expiry: null,
  //   state: VoucherState.issued,
  //   redemptionType: RedemptionType.txtCode,
  //   reward: mockReward,
  // };

  // const voucherServiceStub: Partial<IVoucherService> = {
  //   get: () => of(mockIssuedVoucherDetail),
  //   getAll: () => of([])
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // MatCardModule,
        // MatRippleModule,
        // RouterTestingModule,
        // VouchersModule,
        // ConfigModule.forRoot({}),
        // TranslateModule.forRoot()
      ],
      providers: [
        // DatePipe,
        // { provide: IVoucherService, useValue: voucherServiceStub },
        // { provide: RewardsService, useValue: rewardsServiceStub },
        // { provide: IMerchantsService, useValue: merchantsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
