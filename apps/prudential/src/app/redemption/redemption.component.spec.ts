import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { MatCardModule } from '@angular/material';
import {
  Voucher, VoucherState, VouchersModule, IVoucherService, RewardsService, IMerchantsService
} from '@perx/core';

import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import {MerchantService} from '@perx/hsbc-rewards/src/app/shared/service/merchant.service';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;
  const mockVoucher: Partial<Voucher> = {
    id: 2,
    state: VoucherState.issued,
    expiry: null,
  };

  const voucherServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher as Voucher)
  };
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const merchantsServiceStub: Partial<MerchantService> = {
    getMerchants: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionComponent],
      imports: [
        MatCardModule,
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule,
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub },
        {
          provide: RewardsService, useValue: rewardsServiceStub
        },
        {
          provide: IMerchantsService, useValue: merchantsServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
