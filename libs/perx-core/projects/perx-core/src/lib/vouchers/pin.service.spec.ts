import {
  TestBed,
  async,
} from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import {
  IVoucher,
  VoucherState,
} from './models/voucher.model';
import { PinService } from './pin.service';
import { VouchersModule } from './vouchers.module';
import { IVoucherService } from './ivoucher.service';

import { RewardsService } from '../rewards/rewards.service';
import { IMerchantsService } from '../merchants/imerchants.service';
import { ConfigModule } from '../config/config.module';

describe('PinService', () => {
  let service: PinService;
  let vouchersService: IVoucherService;
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const merchantsServiceStub: Partial<IMerchantsService> = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
    }).compileComponents();
    service = TestBed.get(PinService);
    vouchersService = TestBed.get<IVoucherService>(IVoucherService as Type<IVoucherService>);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pin from voucher Id', (done: jest.DoneCallback) => {
    const mockReturn: IVoucher = {
      id: 1,
      reward: {
        id: 52,
        name: 'Get a Free Coke',
        description: '',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date(),
        rewardBanner: '',
        merchantImg: '',
        termsAndConditions: '',
        howToRedeem: '',
      },
      state: VoucherState.expired,
      expiry: new Date('2019-04-30T15:59:59.999Z'),
    };

    jest.spyOn(vouchersService, 'get').mockReturnValue(of(mockReturn));
    service.getPin(1)
      .subscribe(pinCode => {
        expect(pinCode).toBe('0052');
        done();
      });
  });

  it('should add 0 before if the id length is less than 4', () => {
    expect(service.generatePinCode('52')).toEqual('0052');
  });

  it('should take last 4 digits if id length is greater or equal than 4', () => {
    expect(service.generatePinCode('23152')).toEqual('3152');
  });

});
