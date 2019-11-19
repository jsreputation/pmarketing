import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { V4CampaignService } from './v4-campaign.service';
import { ICampaign, CampaignType, CampaignState } from './models/campaign.model';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { ConfigModule } from '../config/config.module';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IV4Reward } from '../rewards/v4-rewards.service';

describe('V4CampaignService', () => {
  let httpTestingController: HttpTestingController;
  let service: V4CampaignService;
  const vouchersServiceMock = jasmine.createSpyObj('IVoucherService', ['']);

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ConfigModule.forRoot({ ...environment })],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceMock }
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(V4CampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get campaigns', (done: DoneFn) => {
    service.getCampaigns()
      .subscribe((campaigns: ICampaign[]) => {
        expect(campaigns.length).toBe(0);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [], meta: {} });

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
        expect(campaign.state).toBe(CampaignState.active);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns');

    expect(req.request.method).toEqual('GET');

    req.flush({
      data: [
        {
          id: 1,
          name: 'UAT GAME',
          state: CampaignState.active,
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
    const mapCampaign = V4CampaignService.v4CampaignToCampaign({
      id: 1,
      name: 'UAT GAME',
      description: 'UAT description',
      begins_at: '2019-06-26T08:46:06.000Z',
      enrolled: true,
      campaign_type: CampaignType.game,
      images: [],
      favourite: false,
      custom_fields: {},
      category_tags: [],
      tags: [],
      state: CampaignState.active
    });
    expect(mapCampaign.id).toBe(1);
    expect(mapCampaign.name).toBe('UAT GAME');
    expect(mapCampaign.description).toBe('UAT description');
    expect(mapCampaign.type).toBe('game');
    expect(mapCampaign.state).toBe('active');
  });

  it('getCampaign', fakeAsync(inject([V4CampaignService, HttpClient], (campaingService: V4CampaignService, http: HttpClient) => {
    const spy = spyOn(http, 'get').and.returnValue(of({data: {
      images: [{
        type: 'campaign_thumbnail',
        url: 'test'
      }],
      rewards: [{
        id: 1,
        description: 'test'
      } as IV4Reward],
      ends_at: '11.12.2020'
    }}));
    campaingService.getCampaign(1).subscribe(() => { });
    tick();
    expect(spy).toHaveBeenCalled();
  })));
});
