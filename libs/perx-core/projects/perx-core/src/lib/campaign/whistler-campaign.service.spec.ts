import { TestBed } from '@angular/core/testing';

import { WhistlerCampaignService } from './whistler-campaign.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { ICampaign } from './models/campaign.model';
import { Type } from '@angular/core';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';
import { ICampaignAttributes } from '@perx/whistler';
// import { tap } from 'rxjs/operators';

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

  const mockCampaign: IJsonApiItem<ICampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      name: 'I love that stuff',
      start_date_time: null,
      end_date_time: null,
      engagement_type: '',
      engagement_id: 1
    }
  };

  const now = new Date();
  const tomorrow = (new Date());
  tomorrow.setDate(now.getDate() + 1);
  const mockFutureCampaign: IJsonApiItem<ICampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      name: '',
      start_date_time: tomorrow.toISOString(),
      end_date_time: null,
      engagement_type: '',
      engagement_id: 1
    }
  };

  const yesterday = (new Date());
  yesterday.setDate(now.getDate() - 1);
  const mockExpiredCampaign: IJsonApiItem<ICampaignAttributes> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      name: '',
      start_date_time: null,
      end_date_time: yesterday.toISOString(),
      engagement_type: '',
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
    const res: IJsonApiListPayload<ICampaignAttributes> = {
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
    const res: IJsonApiListPayload<ICampaignAttributes> = {
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
    const res: IJsonApiItemPayload<ICampaignAttributes> = {
      data: mockCampaign
    };
    req1.flush(res);

    httpTestingController.verify();
  });
});
