import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { VouchersModule, CampaignModule, VouchersService, Voucher, RedemptionType, VoucherState } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  const mockVoucher: Voucher = {
    id: 2,
    rewardId: 2,
    state: VoucherState.issued,
    name: 'string;',
    code: 'string;',
    redemptionType: RedemptionType.none,
    thumbnailImg: 'string;',
    rewardBanner: 'string;',
    merchantImg: 'string;',
    merchantName: 'string;',
    expiry: null,
    redemptionDate: null,
    description: [],
    redemptionSuccessTxt: 'string;',
    redemptionSuccessImg: 'string;',
  };
  const vouchersServiceStub = {
    get: () => of(mockVoucher)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherComponent],
      imports: [
        CampaignModule,
        VouchersModule,
        RouterTestingModule,
        MatProgressBarModule,
        NoopAnimationsModule
      ],
      providers: [
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
});
