import { TestBed } from '@angular/core/testing';

import { WhistlerRewardsService } from './whistler-rewards.service';
import { ConfigModule } from '../config/config.module';
import { of } from 'rxjs';
import { IReward } from './models/reward.model';
import { HttpClient } from '@angular/common/http';
import { takeLast } from 'rxjs/operators';

import {
  IWRewardEntityAttributes,
  IJsonApiItem,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  WRedemptionType,
} from '@perx/whistler';

describe('WhistlerRewardsService', () => {
  let httpClientSpy: Partial<HttpClient>;
  let getSpy: jest.Mock;
  let service: WhistlerRewardsService;

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
      redemption_type: WRedemptionType.promoCode,
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
      redemption_type: WRedemptionType.qrCode,
      cost_of_reward: 42,
      tags: [],
      display_properties: {
        loyalties: {}
      },
      organization_id: '42'
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
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.get(WhistlerRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a reward from its id without merchant', (done: jest.DoneCallback) => {
    const res: IJsonApiItemPayload<IWRewardEntityAttributes> = {
      data: mockReward
    };
    getSpy.mockReturnValue(of(res));

    service.getReward(42)
      .subscribe((r: IReward) => {
        expect(`${r.id}`).toEqual(mockReward.id);
        expect(r.merchantName).not.toBeDefined();
        done();
      });

    expect(getSpy.mock.calls.length).toBe(1);
    expect(getSpy.mock.calls[0]).toEqual([
      'https://blabla/reward/entities/42',
      { params: { include: 'organization,tier_reward_costs' } }
    ]);
  });

  it('should get a reward from its id with merchant', (done: jest.DoneCallback) => {
    const res: IJsonApiItemPayload<IWRewardEntityAttributes> = {
      data: mockRewardWithMerchant
    };
    getSpy.mockReturnValue(of(res));

    service.getReward(42)
      .subscribe((r: IReward) => {
        expect(`${r.id}`).toEqual(mockReward.id);
        done();
      });

    expect(getSpy.mock.calls.length).toBe(1);
    expect(getSpy.mock.calls[0]).toEqual([
      'https://blabla/reward/entities/42',
      { params: { include: 'organization,tier_reward_costs' } }
    ]);
  });

  it('should get a page of rewards', (done: jest.DoneCallback) => {
    const res: IJsonApiListPayload<IWRewardEntityAttributes> = {
      data: [mockReward, mockRewardWithMerchant]
    };
    getSpy.mockReturnValue(of(res));

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

    expect(getSpy.mock.calls.length).toBe(1);
    expect(getSpy.mock.calls[0]).toEqual([
      'https://blabla/reward/entities',
      { params: { 'page[number]': '1', 'page[size]': '10', 'filter[tags]': '42tags', 'filter[category]': '42categories', include: 'organization,tier_reward_costs' } }
    ]);
  });

  it('should get all rewards', (done: jest.DoneCallback) => {
    const res: IJsonApiListPayload<IWRewardEntityAttributes> = {
      data: [mockReward, mockRewardWithMerchant],
      meta: {
        page_count: 2
      }
    };
    getSpy.mockReturnValue(of(res));

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

    expect(getSpy.mock.calls.length).toBe(2);
    expect(getSpy.mock.calls[0]).toEqual([
      'https://blabla/reward/entities',
      { params: { 'page[number]': '1', 'page[size]': '10', 'filter[tags]': '42tags', 'filter[category]': '42categories', include: 'organization,tier_reward_costs' } }
    ]);
  });
});
