import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from '../vouchers.module';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucher, VoucherState, RedemptionType } from '../models/voucher.model';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const mockRedeemedVoucherDetail: IVoucher = {
    description: [{ title: 'Vidyut', content: '', tag: [] }],
    id: 21,
    name: 'Vidyut what are you doing',
    expiry: null,
    state: VoucherState.redeemed,
    rewardId: 12,
    redemptionType: RedemptionType.none,
    thumbnailImg: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    redemptionSuccessTxt: '',
    redemptionSuccessImg: ''
    // img: undefined,
  };

  const mockIssuedVoucherDetail: IVoucher = {
    description: [{ title: 'Vidyut', content: '', tag: [] }],
    id: 21,
    name: 'Vidyut what are you doing',
    expiry: null,
    state: VoucherState.issued,
    rewardId: 12,
    redemptionType: RedemptionType.none,
    thumbnailImg: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    redemptionSuccessTxt: '',
    redemptionSuccessImg: ''
    // img: undefined,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatRippleModule,
        HttpClientTestingModule,
        RouterTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } })
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
