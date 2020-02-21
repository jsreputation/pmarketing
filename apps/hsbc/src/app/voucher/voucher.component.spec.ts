import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { VouchersModule, CampaignModule, IVoucherService, Voucher, VoucherState, ConfigService, RedemptionType } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
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
      categoryTags: [],
      inventory: null,
    },
    state: VoucherState.issued,
    redemptionType: RedemptionType.none,
    code: 'string;',
    expiry: null,
    redemptionDate: null,
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher)
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
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
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
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
