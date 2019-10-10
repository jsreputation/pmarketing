import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RedemptionComponent } from './redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatDividerModule } from '@angular/material';
import { VouchersModule, IVoucherService, VoucherState, UtilsModule, RedemptionType, RewardsService, IReward } from '@perx/core';
import { RewardDetailComponent } from '../reward/reward-detail/reward-detail.component';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { ExpireTimerComponent } from '../reward/expire-timer/expire-timer.component';
import { of, Subject } from 'rxjs';
import { vouchers } from '../vouchers.mock';
import { Type } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { rewards } from '../rewards.mock';
import { AnalyticsService } from '../analytics.service';

const rewardsServiceStub = {
  getReward: () => of(rewards[0])
};

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;
  let voucherService: IVoucherService;
  let analyticsService: AnalyticsService;
  const voucher = {
    id: 1,
    rewardId: 1,
    reward: {
      id: 1,
      name: 'reward',
      description: 'description',
      subtitle: '',
      categoryTags: [{
        id: 1,
        title: 'test'
      }]
    } as IReward,
    state: VoucherState.expired,
    name: '10% OFF Total Bill',
    redemptionType: RedemptionType.pin,
    thumbnailImg: 'https://picsum.photos/50/50?random=3',
    rewardBanner: 'https://picsum.photos/400/200?random=20',
    merchantImg: '',
    merchantName: '',
    expiry: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  };

  const vouchersServiceStub = {
    redeemVoucher: () => { },
    get: () => of(voucher)
  };

  const locationStub = {
    back: () => { }
  };

  let params: Subject<Params>;

  const routerStub = { navigateByUrl: () => ({}) };

  beforeEach(async(() => {
    params = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [
        RedemptionComponent,
        RewardDetailComponent,
        LocationShortFormatComponent,
        ExpireTimerComponent,
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatDividerModule,
        VouchersModule,
        UtilsModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        {
          provide: ActivatedRoute, useValue: { queryParams: params }
        },
        { provide: Location, useValue: locationStub },
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    voucherService = fixture.debugElement.injector.get<IVoucherService>(IVoucherService as Type<IVoucherService>);
    analyticsService = TestBed.get<AnalyticsService>(AnalyticsService as Type<AnalyticsService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redeemVoucher', fakeAsync(() => {
    const voucherCustom = { ...vouchers[0], ...{ reward: voucher.reward } };
    const voucherServiceSpy = spyOn(voucherService, 'redeemVoucher')
      .and.returnValue(of(voucherCustom));
    component.voucher = voucherCustom;
    component.full('2222');
    tick(3500);
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(component.voucher.state).toBe(VoucherState.redeemed);
  }));

  it('should show pin ', () => {
    component.showPinComponent();
    expect(component.showEnterPinComponent).toBeTruthy();
  });

  describe('onInit', () => {
    it('should NOT get voucher based if queryParams id is NOT present', () => {
      params.next({ id: null });
      component.ngOnInit();
      expect(component.voucher).toBe(undefined);
    });

    it('should get voucher based if queryParams id is present', () => {
      params.next({ id: 1 });
      component.ngOnInit();
      expect(component.voucher).toBe(voucher);
    });
  });

  it('should navigate back on back()', () => {
    const locationFixture: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(locationFixture, 'back').and.callThrough();
    component.back();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should navigate back on cancelClicked()', () => {
    const locationFixture: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(locationFixture, 'back').and.callThrough();
    component.cancelClicked();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should navigate to home/vouchers on backMyRewardsClicked()', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigateByUrl').and.callThrough();
    component.backMyRewardsClicked();
    expect(router.navigateByUrl).toHaveBeenCalledWith('home/vouchers');
  });

  it('should', fakeAsync(() => {
    const spy = spyOn(analyticsService, 'addEvent');
    params.next({ id: 1 });
    spyOn(voucherService, 'get').and.returnValue(of(voucher));
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
  }));
});
