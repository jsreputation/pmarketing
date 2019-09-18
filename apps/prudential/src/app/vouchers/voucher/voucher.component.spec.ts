import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherComponent } from './voucher.component';
import { VouchersModule, IVoucherService, Voucher, VoucherState, RedemptionType, RewardsService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  let router: Router;

  const mockVoucher: Voucher = {
    id: 1,
    rewardId: 1,
    state: VoucherState.issued,
    name: '',
    redemptionType: RedemptionType.none,
    thumbnailImg: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    expiry:  null,
    description: []
  };
  const vouchersServiceStub = {
    get: () => of(mockVoucher)
  };
  const rewardsServiceStub = {
    getReward: () => of()
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
