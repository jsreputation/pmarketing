import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';
import { ConfigModule, RewardsService } from '../../public-api';
import { of } from 'rxjs';
import { IReward } from '../rewards/models/reward.model';
import { IJsonApiItem, IJsonApiItemPayload, IJsonApiListPayload } from '../jsonapi.payload';
import { IWAssignedAttributes, WAssignedStatus } from '@perx/whistler';
import { IVoucher } from './models/voucher.model';
import { HttpClient } from '@angular/common/http';
import { last } from 'rxjs/operators';

describe('WhistlerVouchersService', () => {
  let httpClientSpy: { get: jasmine.Spy };

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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

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

  it('should get a voucher from its number', (done: DoneFn) => {
    const res: IJsonApiItemPayload<IWAssignedAttributes> = {
      data: mockVoucherApi
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.get(42)
      .subscribe((v: IVoucher) => {
        expect(`${v.id}`).toEqual(mockVoucherApi.id);
        done();
      });

    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/voucher-service/vouchers/42']);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should get all vouchers', (done: DoneFn) => {
    const res: IJsonApiListPayload<IWAssignedAttributes> = {
      data: [mockVoucherApi],
      meta: {
        page_count: 2
      }
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getAll()
      // make sure that we look at the final result
      .pipe(last())
      .subscribe((vs: IVoucher[]) => {
        // one voucher per call should yield to vouchers
        expect(vs.length).toEqual(2);
        done();
      });

    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/voucher-service/vouchers?page[number]=1&page[size]=10']);
    expect(httpClientSpy.get.calls.argsFor(1)).toEqual(['https://blabla/voucher-service/vouchers?page[number]=2&page[size]=10']);
    expect(httpClientSpy.get.calls.count()).toBe(2, 'Two pages');
  });
});
