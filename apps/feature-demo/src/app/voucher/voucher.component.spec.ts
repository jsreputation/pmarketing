import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucherService, VoucherState, RedemptionType, VouchersModule } from '@perx/core';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { RewardDetailComponent } from '../reward/reward-detail/reward-detail.component';
import { ExpireTimerComponent } from '../reward/expire-timer/expire-timer.component';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;

  const voucher = {
    id: 1,
    rewardId: 1,
    reward: {
      id: 1,
      name: 'reward test',
      description: '',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: null,
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
      inventory: null,
    },
    state: VoucherState.issued,
    name: '',
    code: '',
    redemptionType: RedemptionType.pin,
    thumbnailImg: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    merchantId: 1,
    expiry: null,
    redemptionDate: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  };
  const vouchersServiceStub = {
    get: () => of(voucher)
  };
  let params: Subject<Params>;

  beforeEach(async(() => {
    params = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [VoucherComponent, LocationShortFormatComponent, RewardDetailComponent, ExpireTimerComponent],
      imports: [
        MatIconModule,
        RouterTestingModule,
        VouchersModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        {
          provide: ActivatedRoute, useValue: { queryParams: params }
        },
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should get voucher from service if id is present', fakeAsync(() => {
      params.next({id: '1'});
      component.ngOnInit();
      tick();
      expect(component.voucher$).toBeTruthy();
    }));
  });

  describe('setButton', () => {
    it('should set isButtonEnable to true', () => {
      component.setButton(true);
      expect(component.isButtonEnabled).toBe(true);
    });

    it('should set isButtonEnable to false', () => {
      component.setButton(false);
      expect(component.isButtonEnabled).toBe(false);
    });
  });
});
