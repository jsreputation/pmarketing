import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { last } from 'rxjs/operators';

import {
  IWAssignedAttributes,
  WAssignedStatus,
  IJsonApiItem,
  IJsonApiItemPayload,
  IJsonApiListPayload
} from '@perx/whistler';

import { IVoucher } from './models/voucher.model';
import { WhistlerVouchersService } from './whistler-vouchers.service';

import { ConfigModule } from '../config/config.module';
import { IReward } from '../rewards/models/reward.model';
import { RewardsService } from '../rewards/rewards.service';

describe('WhistlerVouchersService', () => {
  let httpClientSpy: Partial<HttpClient>;
  let getSpy: jest.Mock;
  let service: WhistlerVouchersService;
  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: true,
    preAuth: false,
    baseHref: '/'
  };

  const mockReward: IReward = {
    id: 1,
    name: 'string;',
    description: 'string;',
    subtitle: 'string;',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: 'string;',
    merchantImg: 'string;',
    termsAndConditions: 'string;',
    howToRedeem: 'string;',
  };

  const rewardsServiceStub = {
    getReward: () => of(mockReward)
  };

  const mockVoucherApi: IJsonApiItem<IWAssignedAttributes> = {
    id: '12',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      assigned_to_id: 42,
      value: '42',
      created_at: '42',
      valid_to: '42',
      source_id: 42,
      source_type: '42',
      valid_from: '42',
      status: WAssignedStatus.issued,
      updated_at: '42',
      urn: '42',
    }
  };

  beforeEach(() => {
    getSpy = jest.fn();
    httpClientSpy = { get: getSpy };

    TestBed.configureTestingModule({
      imports: [
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        {
          provide: RewardsService, useValue: rewardsServiceStub
        },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.get(WhistlerVouchersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a voucher from its number', (done: jest.DoneCallback) => {
    const res: IJsonApiItemPayload<IWAssignedAttributes> = {
      data: mockVoucherApi
    };
    getSpy.mockReturnValue(of(res));

    service.get(42)
      .subscribe((v: IVoucher) => {
        expect(`${v.id}`).toEqual(mockVoucherApi.id);
        done();
      });

    expect(getSpy.mock.calls[0]).toEqual(['https://blabla/voucher-service/vouchers/42']);
    expect(getSpy.mock.calls.length).toBe(1/*, 'one call'*/);
  });

  it('should get all vouchers', (done: jest.DoneCallback) => {
    const res: IJsonApiListPayload<IWAssignedAttributes> = {
      data: [mockVoucherApi],
      meta: {
        page_count: 2
      }
    };
    getSpy.mockReturnValue(of(res));

    service.getAll()
      // make sure that we look at the final result
      .pipe(last())
      .subscribe((vs: IVoucher[]) => {
        // one voucher per call should yield to vouchers
        expect(vs.length).toEqual(2);
        done();
      });

    expect(getSpy.mock.calls[0]).toEqual(['https://blabla/voucher-service/vouchers?page[number]=1&page[size]=10']);
    expect(getSpy.mock.calls[1]).toEqual(['https://blabla/voucher-service/vouchers?page[number]=2&page[size]=10']);
    expect(getSpy.mock.calls.length).toBe(2/*, 'Two pages'*/);
  });
});
