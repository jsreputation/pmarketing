import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { RedemptionComponent } from './redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  ConfigService,
  IVoucherService,
  NotificationService,
  RedemptionType,
  RewardsService,
  UtilsModule,
  Voucher,
  VouchersModule,
  VoucherState
} from '@perxtech/core';
import { RewardDetailComponent } from '../reward/reward-detail/reward-detail.component';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { ExpireTimerComponent } from '../reward/expire-timer/expire-timer.component';
import {
  of,
  Subject,
  throwError
} from 'rxjs';
import { vouchers } from '../vouchers.mock';
import { Type } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import { Location } from '@angular/common';
import { rewards } from '../rewards.mock';
import { AnalyticsService } from '../analytics.service';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { QRCodeModule } from 'angularx-qrcode';

const rewardsServiceStub: Partial<RewardsService> = {
  getReward: () => of(rewards[0])
};

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;
  let analyticsService: AnalyticsService;
  let voucherService: IVoucherService;
  const voucher: Voucher = {
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
      categoryTags: [{
        id: 1,
        title: 'test'
      }],
      inventory: undefined,
      loyalty: []
    },
    state: VoucherState.expired,
    redemptionType: RedemptionType.none,
    expiry: null,
  };

  const vouchersServiceStub: Partial<IVoucherService> = {
    redeemVoucher: () => of(),
    get: () => of(voucher)
  };

  const locationStub: Partial<Location> = {
    back: () => { }
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addSnack: () => { }
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  let params: Subject<Params>;

  const routerStub: Partial<Router> = { navigateByUrl: () => Promise.resolve(true) };

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
        UtilsModule,
        QRCodeModule,
        NgxBarcode6Module,
        MatListModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        {
          provide: ActivatedRoute, useValue: { queryParams: params }
        },
        { provide: Location, useValue: locationStub },
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
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

  it('should redeemVoucher failed', fakeAsync(() => {
    const voucherCustom = { ...vouchers[0], ...{ reward: voucher.reward } };
    const voucherServiceSpy = spyOn(voucherService, 'redeemVoucher')
      .and.returnValue(throwError({}));
    // const notificationService: NotificationService = fixture.debugElement.injector.get<NotificationService>
    // (NotificationService as Type<NotificationService>);
    // const notificationSpy = spyOn(notificationService, 'addSnack').and.callThrough();
    component.voucher = voucherCustom;
    component.full('2222');
    tick(3500);
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(component.pinInputError).toBe(true);
    // expect(notificationSpy).toHaveBeenCalledWith('Sorry! Voucher redemption failed.');
  }));

  it('should show pin ', () => {
    component.showPinComponent();
    expect(component.showEnterPinComponent).toBeTruthy();
  });

  describe('onInit', () => {
    it('should NOT get voucher based if queryParams id is NOT present', () => {
      const defVal = component.voucher;
      params.next({ id: null });
      component.ngOnInit();
      expect(component.voucher).toBe(defVal);
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
