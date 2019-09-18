import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { RewardsService } from '../../rewards/rewards.service';
import { of } from 'rxjs';
import { IMerchantsService } from '../../merchants/imerchants.service';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        HttpClientTestingModule,
        VouchersModule,
        ConfigModule.forRoot({})
      ],
      providers: [
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
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
