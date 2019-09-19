import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { MatCardModule } from '@angular/material/card';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { of } from 'rxjs';
import { IVoucherService } from '../ivoucher.service';
import { RewardsService } from '../../rewards/rewards.service';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  const voucherServiceStub = {
    get: () => of(''),
    getAll: () => of([])
  };
  const rewardsServiceStub = {
    getReward: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
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
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
