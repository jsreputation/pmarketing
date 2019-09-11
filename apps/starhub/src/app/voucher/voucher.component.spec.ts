import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersService, VoucherState, RedemptionType } from '@perx/core';
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
        RouterTestingModule
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub },
        {
          provide: ActivatedRoute, useValue: { queryParams: params }
        },
        { provide: VouchersService, useValue: vouchersServiceStub }
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
      expect(component.voucher).toBe(voucher);
    }));

    it('should voucher be undefined if param id is not present', () => {
      params.next({id: null});
      expect(component.voucher).toBe(undefined);
    });
  });

  describe('setButton', () => {
    it('should set isButtonEnable to true', () => {
      component.setButton(true);
      expect(component.isButtonEnable).toBe(true);
    });

    it('should set isButtonEnable to false', () => {
      component.setButton(false);
      expect(component.isButtonEnable).toBe(false);
    });
  });
});
