import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherComponent } from './voucher.component';
import { VouchersModule, IVoucherService, Voucher, VoucherState, RewardsService, IMerchantsService, RedemptionType } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  let router: Router;

  const mockVoucher: Voucher = {
    id: 1,
    reward: {
      id: 1,
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
    expiry: null,
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    get: () => of(mockVoucher)
  };
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const merchantsServiceStub: Partial<IMerchantsService> = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherComponent],
      imports: [
        VouchersModule,
        RouterTestingModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        {
          provide: RewardsService, useValue: rewardsServiceStub
        },
        {
          provide: IMerchantsService, useValue: merchantsServiceStub
        }
      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to activation page', () => {
    spyOn(router, 'navigate').and.stub();
    const id = '1';
    component.onRedeem(id);
    expect(router.navigate).toHaveBeenCalledWith([`/activation/${id}`]);
  });
});
