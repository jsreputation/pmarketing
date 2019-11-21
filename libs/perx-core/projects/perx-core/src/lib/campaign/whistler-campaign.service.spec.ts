import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { WhistlerCampaignService } from './whistler-campaign.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { ICampaign } from './models/campaign.model';
import { Type } from '@angular/core';

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
  let httpTestingController: HttpTestingController;
  let service: WhistlerCampaignService;

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
  const campaingMock = {data:[{
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
  } }
  
  const mockCampaign: IJsonApiItem<IWCampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
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
      name: '',
      start_date_time: yesterday.toISOString(),
      end_date_time: yesterday.toISOString(),
      engagement_type: WEngagementType.survey,
      engagement_id: 1
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfigModule.forRoot({ ...environment })
      ],
    });
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(WhistlerCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty campaigns', (done: DoneFn) => {
    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        expect(campaigns.length).toBe(0);
        done();
      });

    const req = httpTestingController.expectOne('https://blabla/campaign/entities?page[number]=1');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiListPayload<IWCampaignAttributes> = {
      data: [],
      meta: {
        page_count: 1
      }
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should get campaigns pages', (done: DoneFn) => {
    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        // only one campaign is expected
        expect(campaigns.length).toBe(1);
        done();
      });

    const req1 = httpTestingController.expectOne('https://blabla/campaign/entities?page[number]=1');
    expect(req1.request.method).toEqual('GET');
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
    req1.flush(res);

    httpTestingController.verify();
  });

  it('should get one campaign', (done: DoneFn) => {
    service.getCampaign(42)
      .subscribe((campaign: ICampaign) => {
        expect(`${campaign.id}`).toEqual(mockCampaign.id);
        expect(campaign.name).toEqual(mockCampaign.attributes.name);
        done();
      });

    const req1 = httpTestingController.expectOne('https://blabla/campaign/entities/42');
    expect(req1.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<IWCampaignAttributes> = {
      data: mockCampaign
    };
    req1.flush(res);

    httpTestingController.verify();
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
    (campaign: WhistlerCampaignService, http: HttpClient) => {
      const spy = spyOn(http, 'get').and.returnValue(of(campaingMock))
      campaign.getCampaigns().subscribe(() => { });
      // second call for write value to cashe
      campaign.getCampaigns().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});