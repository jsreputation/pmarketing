import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RedeemComponent } from './redeem.component';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { RewardsService, VouchersService, NotificationService } from '@perx/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  history.pushState({data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');

  const routerStub = {
    navigate: () => ({}),
    getCurrentNavigation: () =>  (
      {
        extras: {
          state: {
            data: '{"name": "name", "id": 0, "rewardId": 0}'
          }
        }
      }
    )
  };

  const reward = {
    id: 149,
    name: '100 HSBC Bonus Points',
    description: null,
    subtitle: null,
    validFrom: new Date('2019-07-04T09:58:07.000Z'),
    validTo: new Date('2020-07-19T16:00:00Z'),
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: null,
    rewardPrice: [
      {
        id: 23,
        currencyCode: 'MYR',
        price: 0
      }
    ],
    merchantId: null,
    merchantName: null,
    merchantWebsite: null,
    termsAndConditions: null,
    howToRedeem: null,
  };

  const rewardsServiceStub = {
    getReward: () => of(reward),
    getRewardPricesOptions: () => of()
  };

  const vouchersServiceStub = {
    redeemVoucher: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemComponent, HeaderComponent ],
      imports: [ MatToolbarModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: VouchersService, useValue: vouchersServiceStub },
        { provide: NotificationService, useValue:
          {
            addSnack: () => {}
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
    const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    const vouchersService: VouchersService = fixture.debugElement.injector.get<VouchersService>(VouchersService as Type<VouchersService>);
    const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
      (NotificationService as Type<NotificationService>);

    const price = {
      id: 1,
      rewardCampaignId: 1,
      price: 1,
      currencyCode: 'SGD',
      points: 10,
    };

    const rewardsServiceSpy = spyOn(rewardsService, 'getRewardPricesOptions').and.returnValue(
      of([price])
    );

    const vouchersServiceSpy = spyOn(vouchersService, 'redeemVoucher').and.returnValue(
      of(1)
    );

    const notificationSpy = spyOn(notificationService, 'addSnack');

    component.onProceed();
    expect(rewardsServiceSpy).toHaveBeenCalled();
    expect(vouchersServiceSpy).toHaveBeenCalled();
    expect(notificationSpy).toHaveBeenCalledWith('Transaction completed');
  });

  it('should get reward price', () => {
    component.reward = reward;
    const price = component.getPrice();
    expect(component.reward).toBe(reward);
    expect(price).toBe(0);
  });

});
