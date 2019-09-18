import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BcodeRedemptionComponent } from './bcode-redemption.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from '../vouchers.module';
import { ConfigModule } from '../../config/config.module';
import { RewardsService } from '../../rewards/rewards.service';
import { of } from 'rxjs';
import { IMerchantsService } from '../../merchants/imerchants.service';

describe('BcodeRedemptionComponent', () => {
  let component: BcodeRedemptionComponent;
  let fixture: ComponentFixture<BcodeRedemptionComponent>;

  const rewardsServiceStub = {
    getReward: () => of()
  };

  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
    fixture = TestBed.createComponent(BcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
