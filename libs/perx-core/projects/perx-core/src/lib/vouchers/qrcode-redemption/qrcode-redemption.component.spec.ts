import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeRedemptionComponent } from './qrcode-redemption.component';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from './../../config/config.module';
import { IVoucherService } from '../ivoucher.service';
import { RewardsService } from '../../rewards/rewards.service';
import { of } from 'rxjs';
import { IMerchantsService } from '../../merchants/imerchants.service';

describe('QrcodeRedemptionComponent', () => {
  let component: QrcodeRedemptionComponent;
  let fixture: ComponentFixture<QrcodeRedemptionComponent>;
  const voucherServiceStub = {
    get: () => of(''),
    getAll: () => of([])
  };

  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
    fixture = TestBed.createComponent(QrcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
