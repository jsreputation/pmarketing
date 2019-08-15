import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { VouchersModule, VouchersService, Voucher, VoucherState, RedemptionType } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture< RedemptionComponent>;
  const mockVoucher: Voucher = {
    id: 2,
    rewardId: 2,
    state: VoucherState.issued,
    name: 'string;',
    code: 'string;',
    redemptionType: RedemptionType.txtCode,
    thumbnailImg: 'string;',
    rewardBanner: 'string;',
    merchantImg: 'string;',
    merchantName: 'string;',
    expiry: null,
    description: [],
    redemptionSuccessTxt: 'string;',
    redemptionSuccessImg: 'string;',
  };
  const vouchersServiceStub = {
    get: () => of(mockVoucher)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        VouchersModule
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub }
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
