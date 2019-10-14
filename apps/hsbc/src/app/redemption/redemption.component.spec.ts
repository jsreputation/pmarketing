import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionComponent } from './redemption.component';
import { VouchersModule, IVoucherService, Voucher, VoucherState } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RedemptionComponent', () => {
  let component: RedemptionComponent;
  let fixture: ComponentFixture< RedemptionComponent>;
  const mockVoucher: Voucher = {
    id: 2,
    reward: {
      id: 2,
      name: '',
      description: '',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      redemptionType: null,
      categoryTags: [],
      inventory: null,
    },
    state: VoucherState.issued,
    code: 'string;',
    expiry: null,
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
        { provide: IVoucherService, useValue: vouchersServiceStub }
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
