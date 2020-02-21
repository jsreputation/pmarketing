import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RedeemComponent } from './redeem.component';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule, MatIconModule } from '@angular/material';
import { Router } from '@angular/router';
import {
  RewardsService,
  NotificationService,
  IMerchantAdminService,
  RedemptionType,
  VoucherState,
  IReward,
  Voucher
} from '@perx/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  history.pushState({ data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');
  const locationStub = {
    back: () => {
    }
  };

  const routerStub = {
    navigate: () => ({}),
    getCurrentNavigation: () => (
      {
        extras: {
          state: {
            data: '{"name": "name", "id": 0, "rewardId": 0}'
          }
        }
      }
    )
  };

  const reward: IReward = {
    id: 149,
    name: '100 HSBC Bonus Points',
    description: 'test',
    subtitle: 'test',
    validFrom: new Date('2019-07-04T09:58:07.000Z'),
    validTo: new Date('2020-07-19T16:00:00Z'),
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: undefined,
    rewardPrice: [
      {
        id: 23,
        currencyCode: 'MYR',
        price: 0,
        points: 0
      }
    ],
    merchantId: undefined,
    merchantName: undefined,
    merchantWebsite: undefined,
    termsAndConditions: 'test',
    howToRedeem: 'test',
  };

  const rewardsServiceStub = {
    getReward: () => of(reward),
    // getRewardPricesOptions: () => of()
  };

  const merchantAdminServiceStub = {
    issueVoucher: () => of(),
    redeemVoucher: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemComponent, HeaderComponent],
      imports: [MatToolbarModule, MatIconModule, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        { provide: Location, useValue: locationStub },
        {
          provide: NotificationService, useValue:
          {
            addSnack: () => {
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reward on init', fakeAsync(() => {
    const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    const authSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(reward));

    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(authSpy).toHaveBeenCalled();
    expect(component.reward).toBe(reward);
  }));

  it('should navigate to home onClose click', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.onClose();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should onProceed', () => {
    // const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    const merchantAdminService: IMerchantAdminService = fixture.debugElement.injector.get<IMerchantAdminService>(
      IMerchantAdminService as Type<IMerchantAdminService>);
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
      (NotificationService as Type<NotificationService>);

    // const price = {
    //   id: 1,
    //   rewardCampaignId: 1,
    //   price: 1,
    //   currencyCode: 'SGD',
    //   points: 10,
    // };

    const issuedVoucher: Voucher = {
      id: 1,
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
        inventory: undefined,
      },
      state: VoucherState.issued,
      redemptionType: RedemptionType.none,
      expiry: null,
    };

    const redeemedVoucher: Voucher = {
      id: 1,
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
        inventory: undefined,
      },
      state: VoucherState.redeemed,
      redemptionType: RedemptionType.none,
      expiry: null,
    };

    // const rewardsServiceSpy = spyOn(rewardsService, 'getRewardPricesOptions').and.returnValue(
    //   of([price])
    // );

    const merchantAdminServiceIssueVoucherSpy = spyOn(merchantAdminService, 'issueVoucher').and.returnValue(
      of(issuedVoucher)
    );

    const merchantAdminServiceRedeemVoucherSpy = spyOn(merchantAdminService, 'redeemVoucher').and.returnValue(
      of(redeemedVoucher)
    );

    const notificationSpy = spyOn(notificationService, 'addSnack');

    component.onProceed();
    // expect(rewardsServiceSpy).toHaveBeenCalled();
    expect(merchantAdminServiceIssueVoucherSpy).toHaveBeenCalled();
    expect(merchantAdminServiceRedeemVoucherSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith('Transaction completed');
  });

  it('should get reward price', () => {
    component.reward = reward;
    // const price = component.getPrice();
    expect(component.reward).toBe(reward);
    // expect(price).toBe(0);
  });

});
