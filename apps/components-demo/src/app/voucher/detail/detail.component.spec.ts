import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { VouchersModule, IVoucherService, Voucher, VoucherState, RedemptionType } from '@perx/core';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  const mockVoucher: Voucher = {
    id: 1,
    rewardId: 2,
    reward: null,
    state: VoucherState.expired,
    name: 'string',
    redemptionType: RedemptionType.none,
    thumbnailImg: 'string',
    rewardBanner: 'string',
    merchantImg: 'string',
    merchantName: 'string',
    expiry: null,
    description: [],
    redemptionSuccessTxt: 'string',
    redemptionSuccessImg: 'string'
  };
  const vouchersServiceStub = {
    get: () => of(mockVoucher)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        VouchersModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
