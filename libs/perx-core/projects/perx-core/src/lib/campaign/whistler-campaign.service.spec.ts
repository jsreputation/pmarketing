import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { WhistlerCampaignService } from './whistler-campaign.service';
import { ConfigModule } from '../config/config.module';
import { ICampaign } from './models/campaign.model';

import {
  IWCampaignAttributes,
  WEngagementType,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiItemPayload,
} from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('WhistlerCampaignService', () => {
  let service: WhistlerCampaignService;
  let httpClientSpy: { get: jasmine.Spy };

  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const now = new Date();
  const tomorrow = (new Date());
  tomorrow.setDate(now.getDate() + 1);
  const campaingMock = {
    data: [{
      id: '111',
      type: 'test',
      links: {
        self: 'test'
      }, attributes: {
        start_date_time: null,
        name: '',
        engagement_type:
          WEngagementType.games,
        engagement_id: 1
      }
    }], meta: {
      page_count: 3
    }
  };

  const mockCampaign: IJsonApiItem<IWCampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      pool_id: null,
      name: 'I love that stuff',
      start_date_time: now.toISOString(),
      engagement_type: WEngagementType.survey,
      engagement_id: 1
    }
  };

  const mockFutureCampaign: IJsonApiItem<IWCampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      pool_id: null,
      name: '',
      start_date_time: tomorrow.toISOString(),
      engagement_type: WEngagementType.survey,
      engagement_id: 1
    }
  };

  const yesterday = (new Date());
  yesterday.setDate(now.getDate() - 1);
  const mockExpiredCampaign: IJsonApiItem<IWCampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      pool_id: null,
      name: '',
      start_date_time: yesterday.toISOString(),
      end_date_time: yesterday.toISOString(),
      engagement_type: WEngagementType.survey,
      engagement_id: 1
    }
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.get(WhistlerCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty campaigns', (done: DoneFn) => {
    const res: IJsonApiListPayload<IWCampaignAttributes> = {
      data: [],
      meta: {
        page_count: 1
      }
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        expect(campaigns.length).toBe(0);
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/campaign/entities', { params: { 'page[number]': '1' } }]);
  });

  it('should get campaigns pages', (done: DoneFn) => {
    const res: IJsonApiListPayload<IWCampaignAttributes> = {
      data: [
        mockCampaign,
        mockFutureCampaign,
        mockExpiredCampaign
      ],
      meta: {
        page_count: 1
      }
    };
    httpClientSpy.get.and.returnValue(of(res));

    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        // only one campaign is expected as the 2 other ones are not active yet
        expect(campaigns.length).toBe(1);
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/campaign/entities', { params: { 'page[number]': '1' } }]);
  });

<<<<<<< HEAD
  it('should get one campaign', (done: jest.DoneCallback) => {
=======
  it('should get one campaign', (done: DoneFn) => {
    const res: IJsonApiItemPayload<IWCampaignAttributes> = { data: mockCampaign };
    httpClientSpy.get.and.returnValue(of(res));
>>>>>>> c55e7e8aa479dae130567672a374e9590db9481b
    service.getCampaign(42)
      .subscribe((campaign: ICampaign) => {
        expect(`${campaign.id}`).toEqual(mockCampaign.id);
        expect(campaign.name).toEqual(mockCampaign.attributes.name);
        done();
      });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['https://blabla/campaign/entities/42']);
  });

  it('endDate should be null if end_date_time is null or not defined', () => {
    const { endsAt } = WhistlerCampaignService.WhistlerCampaignToCampaign(mockCampaign);
    expect(endsAt).toEqual(null);
  });

  it('endDate should be proper Date object if end_date_time is defined', () => {
    const { endsAt } = WhistlerCampaignService.WhistlerCampaignToCampaign(mockExpiredCampaign);
    expect(endsAt).toEqual(yesterday);
  });

  it('startsAfter handle null values', fakeAsync(inject([WhistlerCampaignService, HttpClient],
    (campaign: WhistlerCampaignService) => {
      httpClientSpy.get.and.returnValue(of(campaingMock));
      campaign.getCampaigns().subscribe(() => { });
      // second call for write value to cashe
      campaign.getCampaigns().subscribe(() => { });
      tick();
      expect(httpClientSpy.get).toHaveBeenCalled();
    })));
});
