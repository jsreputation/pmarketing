import { TestBed } from '@angular/core/testing';

import { WhistlerRewardsService } from './whistler-rewards.service';
import { ConfigModule } from '../config/config.module';
import { IMerchantsService } from '../merchants/imerchants.service';
import { of } from 'rxjs';
import { IJsonApiItem, IJsonApiListPayload } from '../jsonapi.payload';
import { IWRewardEntityAttributes } from '@perx/whistler';
import { IReward } from './models/reward.model';
import { IJsonApiItemPayload } from '../jsonapi.payload';
import { IMerchant } from '../merchants/models/merchants.model';
import { HttpClient } from '@angular/common/http';
import { takeLast } from 'rxjs/operators';

describe('WhistlerRewardsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: WhistlerRewardsService;
  const mockMerchant: IMerchant = {
    id: 42,
    name: 'merchant 42'
  };

  const merchantsServiceStub = {
    getMerchant: () => of(mockMerchant)
  };

  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const mockReward: IJsonApiItem<IWRewardEntityAttributes> = {
    id: '1',
    type: '',
    links: { self: '' },
    attributes: {
      name: '42',
      reward_type: '42',
      category: '42',
      redemption_type: 'Promo Code',
      cost_of_reward: 42,
      tags: [],
      display_properties: {
        loyalties: {}
      }
    }
  };

  const mockRewardWithMerchant: IJsonApiItem<IWRewardEntityAttributes> = {
    id: '1',
    type: '',
    links: { self: '' },
    attributes: {
      name: '42',
      reward_type: '42',
      category: '42',
      redemption_type: 'QR Code',
      cost_of_reward: 42,
      tags: [],
      display_properties: {
        loyalties: {}
      },
      organization_id: '42'
    }
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        { provide: IMerchantsService, useValue: merchantsServiceStub },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.get(WhistlerRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a reward from its id without merchant', (done: DoneFn) => {
    const res: IJsonApiItemPayload<IWRewardEntityAttributes> = {
      data: mockReward
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getReward(42)
      .subscribe((r: IReward) => {
        expect(`${r.id}`).toEqual(mockReward.id);
        expect(r.merchantName).toBeNull();
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/reward/entities/42']);
  });

  it('should get a reward from its id with merchant', (done: DoneFn) => {
    const res: IJsonApiItemPayload<IWRewardEntityAttributes> = {
      data: mockRewardWithMerchant
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getReward(42)
      .subscribe((r: IReward) => {
        expect(`${r.id}`).toEqual(mockReward.id);
        expect(r.merchantName).toEqual(mockMerchant.name);
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/reward/entities/42']);
  });

  it('should get a page of rewards', (done: DoneFn) => {
    const res: IJsonApiListPayload<IWRewardEntityAttributes> = {
      data: [mockReward, mockRewardWithMerchant]
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getRewards(
      1,
      10,
      ['42tags'],
      ['42categories']
    )
      .subscribe((rs: IReward[]) => {
        expect(rs.length).toEqual(2);
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual([
      'https://blabla/reward/entities',
      { params: { 'page[number]': '1', 'page[size]': '10', 'filter[tags]': '42tags', 'filter[category]': '42categories' } }
    ]);
  });

  it('should get all rewards', (done: DoneFn) => {
    const res: IJsonApiListPayload<IWRewardEntityAttributes> = {
      data: [mockReward, mockRewardWithMerchant],
      meta: {
        page_count: 2
      }
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getAllRewards(
      ['42tags'],
      ['42categories']
    ).pipe(
      takeLast(1) // there are 2 pages, so, it should tick twice, make sure that we do not look at the first tick
    )
      .subscribe((rs: IReward[]) => {
        expect(rs.length).toEqual(4);
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(2, 'two calls');
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual([
      'https://blabla/reward/entities',
      { params: { 'page[number]': '1', 'page[size]': '10', 'filter[tags]': '42tags', 'filter[category]': '42categories' } }
    ]);
  });
});
