import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { VouchersModule } from '../vouchers.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { ConfigModule } from '../../config/config.module';
import { of } from 'rxjs';
import { IMerchantsService } from '../../merchants/imerchants.service';
import { IVoucherService } from '../ivoucher.service';
import { RewardsService } from '../../rewards/rewards.service';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  const mockRedeemedVoucherDetail: IVoucher = {
    id: 21,
    expiry: null,
    state: VoucherState.redeemed,
    reward: null,
  };

  const mockIssuedVoucherDetail: IVoucher = {
    id: 21,
    expiry: null,
    state: VoucherState.issued,
    reward: null,
  };

  const voucherServiceStub = {
    get: () => of(''),
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatRippleModule,
        RouterTestingModule,
        VouchersModule,
        ConfigModule.forRoot({})
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
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remain if voucher is redeemed', () => {
    // tslint:disable-next-line: deprecation
    spyOn(component.route, 'emit');
    component.onClick(mockRedeemedVoucherDetail);
    // tslint:disable-next-line: deprecation
    expect(component.route.emit).not.toHaveBeenCalled();
  });

  it('should emit with voucher id if voucher is issued', () => {
    // tslint:disable-next-line: deprecation
    spyOn(component.route, 'emit');
    component.onClick(mockIssuedVoucherDetail);
    // tslint:disable-next-line: deprecation
    expect(component.route.emit).toHaveBeenCalledWith(21);
  });

});
