import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { MatCardModule } from '@angular/material/card';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { of } from 'rxjs';
import { IMerchantsService } from '../../merchants/imerchants.service';
import { IVoucherService } from '../ivoucher.service';
import { RewardsService } from '../../rewards/rewards.service';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { Type, SimpleChange } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RedemptionType } from '../../perx-core.models';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;

  const mockVoucher: IVoucher = {
    id: 1,
    reward: {
      id: 1,
      name: 'reward name',
      description: 'reward descriptiomn',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: 'https://picsum.photos/50/50?random=1',
      merchantImg: 'https://picsum.photos/50/50?random=1',
      rewardPrice: [],
      merchantId: 1,
      merchantName: 'merchant name',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    code: 'yo',
    expiry: null,
  };

  const voucherServiceStub = {
    get: () => of(mockVoucher),
    getAll: () => of([])
  };
  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        VouchersModule,
        ConfigModule.forRoot({})
      ],
      providers: [
        DatePipe,
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IMerchantsService, useValue: merchantsServiceStub }
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

  it('should display reward name in component', fakeAsync(() => {
    component.voucherId = 1;
    const voucherService: IVoucherService = fixture.debugElement.injector
      .get<IVoucherService>(IVoucherService as Type<IVoucherService>);
    const voucherServiceSpy = spyOn(voucherService, 'get').and.returnValue(
      of(mockVoucher)
    );
    component.ngOnChanges({
      voucherId: new SimpleChange(null, 1, true)
    });
    fixture.detectChanges();
    tick();
    expect(voucherServiceSpy).toHaveBeenCalled();
    expect(mockVoucher.reward).not.toBeNull();
    // @ts-ignore
    expect(fixture.nativeElement.querySelector('.reward-name').textContent.trim()).toEqual(mockVoucher.reward.name);
    // @ts-ignore
    expect(fixture.nativeElement.querySelector('.merchant-name').textContent.trim()).toEqual(mockVoucher.reward.merchantName);
    // @ts-ignore
    expect(fixture.nativeElement.querySelector('#rewardDescription').textContent.trim()).toEqual(mockVoucher.reward.description);
    // @ts-ignore
    expect(fixture.nativeElement.querySelector('.merchant-image').src).toEqual(mockVoucher.reward.merchantImg);
    // @ts-ignore
    expect(fixture.nativeElement.querySelector('.reward-image').src).toEqual(mockVoucher.reward.rewardBanner);
  }));
});
