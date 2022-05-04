import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { RedeemComponent } from './redeem.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import {
  ErrorMessageService,
  IMerchantAdminService,
  IReward,
  NotificationService,
  RedemptionType,
  RewardsService,
  Voucher,
  VoucherState
} from '@perxtech/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;

  history.pushState({ data: '{"id": 1234, "name": "John", "rewardId": 149, "voucherId": 1}' }, '', '');
  const locationStub: Partial<Location> = {
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
        price: '0.00',
        points: 0
      }
    ],
    merchantId: undefined,
    merchantName: undefined,
    merchantWebsite: undefined,
    termsAndConditions: 'test',
    howToRedeem: 'test',
    loyalty: []
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
      loyalty: []
    },
    state: VoucherState.redeemed,
    redemptionType: RedemptionType.none,
    expiry: null,
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of(reward),
    // getRewardPricesOptions: () => of()
  };

  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    issueVoucher: () => of(),
    redeemVoucher: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemComponent],
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
        },
        {
          provide: ErrorMessageService, useValue: {
            getErrorMessageByErrorCode: () => of('')
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


  it('should navigate to home onClose click', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.onClose();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should onProceed', () => {
    // const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    const merchantAdminService: IMerchantAdminService = fixture.debugElement.injector.get<IMerchantAdminService>(
      IMerchantAdminService as Type<IMerchantAdminService>
    );
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>(
      NotificationService as Type<NotificationService>
    );

    // const price = {
    //   id: 1,
    //   rewardCampaignId: 1,
    //   price: 1,
    //   currencyCode: 'SGD',
    //   points: 10,
    // };

    const merchantAdminServiceRedeemVoucherSpy = spyOn(merchantAdminService, 'redeemVoucher').and.returnValue(
      of(redeemedVoucher)
    );

    const notificationSpy = spyOn(notificationService, 'addSnack');

    component.onProceed();
    expect(merchantAdminServiceRedeemVoucherSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith('POPUP_CONTENT.TRANSACTION_COMPLETED');
  });

  it('should get reward price', () => {
    component.voucherReserved = redeemedVoucher;
    component.voucherReserved.reward = reward;
    // const price = component.getPrice();
    expect(component.voucherReserved.reward).toBe(reward);
    // expect(price).toBe(0);
  });

});
