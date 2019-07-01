import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './env-config';
import { ICampaignsResponse, IStampCard, IStampCardResponse } from './campaign.service';

describe('CampaignService', () => {
  let httpTestingController: HttpTestingController;
  let service: CampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [EnvConfig]
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
      .subscribe((campaigns: ICampaignsResponse) => {
        expect(campaigns.data.length).toBe(2);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [{}, {}], meta: {} });

    httpTestingController.verify();
  });

  it('should get stamp cards', (done: DoneFn) => {
    service.getCards(1)
      .subscribe((stampCards: IStampCard[]) => {
        expect(stampCards.length).toBe(0);
        done();
      });

    const req = httpTestingController.expectOne('https://api.perxtech.io/v4/campaigns/1/stamp_cards');

    expect(req.request.method).toEqual('GET');

    req.flush({ data: [] });

    httpTestingController.verify();
  });

  it('should get current stamp card', (done: DoneFn) => {
    service.getCurrentCard(1)
      .subscribe((stampCard: IStampCardResponse) => {
        expect(stampCard.data.id).not.toBe(0);
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

    req.flush(null);

    httpTestingController.verify();
  });

});
