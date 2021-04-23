import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { MatCardModule } from '@angular/material/card';
import {
  Voucher, VoucherState, VouchersModule, IVoucherService, RewardsService, IMerchantsService
} from '@perxtech/core';

import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture<RedemptionComponent>;
  const mockVoucher: Voucher = {
    id: 2,
    reward: null,
    state: VoucherState.issued,
    expiry: null,
  };

  const voucherServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher)
  };
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const merchantsServiceStub: Partial<IMerchantsService> = {
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
