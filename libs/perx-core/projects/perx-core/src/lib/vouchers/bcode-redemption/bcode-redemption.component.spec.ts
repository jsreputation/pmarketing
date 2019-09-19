import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcodeRedemptionComponent } from './bcode-redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { of } from 'rxjs';
import { IVoucherService } from '../ivoucher.service';
import { RewardsService } from '../../rewards/rewards.service';

describe('BcodeRedemptionComponent', () => {
  let component: BcodeRedemptionComponent;
  let fixture: ComponentFixture<BcodeRedemptionComponent>;
  const voucherServiceStub = {
    get: () => of('')
  };

  const rewardsServiceStub = {
    getReward: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VouchersModule,
        ConfigModule.forRoot({})
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub },
        {
          provide: RewardsService, useValue: rewardsServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
