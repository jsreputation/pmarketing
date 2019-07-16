import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './env-config';
import { ICampaign, CAMPAIGN_TYPE } from './models/campaign.model';
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
        expect(campaign.state).toBe(null);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns');

    expect(req.request.method).toEqual('GET');

    req.flush({
      data: [
        {
          id: 1,
          name: 'UAT GAME',
          description: 'UAT description',
          begins_at: '2019-06-26T08:46:06.000Z',
          ends_at: null,
          enrolled: true,
          campaign_type: 'game',
          campaign_referral_type: 'user',
          campaign_config: {
            campaign_results: {
              count: 6,
              first_result_id: 1
            }
          },
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
      campaign_referral_type: 'user',
      campaign_config: {
        campaign_results: {
          count: 6,
          first_result_id: 1
        }
      },
      images: [],
      favourite: false,
      custom_fields: {},
      category_tags: [],
      tags: [],
      state: null,
      icon: null
    });
    expect(mapCampaign.id).toBe(1);
    expect(mapCampaign.name).toBe('UAT GAME');
    expect(mapCampaign.description).toBe('UAT description');
    expect(mapCampaign.type).toBe('game');
    expect(mapCampaign.state).toBe(null);

  });

  it('should get stamp cards', (done: DoneFn) => {
    service.getCards(1)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns/1/stamp_cards?size=100');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [] });

    httpTestingController.verify();
  });

  it('should get current stamp card', (done: DoneFn) => {
    service.getCurrentCard(1)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns/1/stamp_cards/current');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [] });

    httpTestingController.verify();
  });

  it('should update stamp transaction', (done: DoneFn) => {
    service.putStampTransaction(1)
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/stamp_transactions/1');

    expect(req.request.method).toEqual('PUT');

    req.flush({
      data: {
        vouchers: []
      }
    });

    httpTestingController.verify();
  });

});
