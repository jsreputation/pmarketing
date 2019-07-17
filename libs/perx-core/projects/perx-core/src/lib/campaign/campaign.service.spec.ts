import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './env-config';
import { ICampaign, CAMPAIGN_TYPE, CAMPAIGN_STATE } from './models/campaign.model';
import { VouchersService } from '../vouchers/vouchers.service';

describe('CampaignService', () => {
  let httpTestingController: HttpTestingController;
  let service: CampaignService;
  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        EnvConfig,
        { provide: VouchersService, useValue: vouchersServiceMock }
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(CampaignService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get campaigns', (done: DoneFn) => {
    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        expect(campaigns.length).toBe(2);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [{}, {}], meta: {} });

    httpTestingController.verify();
  });

  it('should get campaigns with details', (done: DoneFn) => {
    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        expect(campaigns.length).toBe(1);
        const campaign = campaigns[0];
        expect(campaign.id).toBe(1);
        expect(campaign.name).toBe('UAT GAME');
        expect(campaign.description).toBe('UAT description');
        expect(campaign.type).toBe('game');
        expect(campaign.state).toBe(CAMPAIGN_STATE.active);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns');

    expect(req.request.method).toEqual('GET');

    req.flush({
      data: [
        {
          id: 1,
          name: 'UAT GAME',
          state: CAMPAIGN_STATE.active,
          description: 'UAT description',
          begins_at: '2019-06-26T08:46:06.000Z',
          ends_at: null,
          enrolled: true,
          campaign_type: 'game',
          images: [],
          favourite: false,
          custom_fields: {},
          category_tags: [],
          tags: []
        }
      ],
      meta: {}
    });

    httpTestingController.verify();
  });

  it('should map campaigns with new property name', () => {
    const mapCampaign = CampaignService.v4CampaignToCampaign({
      id: 1,
      name: 'UAT GAME',
      description: 'UAT description',
      begins_at: '2019-06-26T08:46:06.000Z',
      ends_at: null,
      enrolled: true,
      campaign_type: CAMPAIGN_TYPE.game,
      images: [],
      favourite: false,
      custom_fields: {},
      category_tags: [],
      tags: [],
      state: CAMPAIGN_STATE.active
    });
    expect(mapCampaign.id).toBe(1);
    expect(mapCampaign.name).toBe('UAT GAME');
    expect(mapCampaign.description).toBe('UAT description');
    expect(mapCampaign.type).toBe('game');
    expect(mapCampaign.state).toBe('active');

  });
});
