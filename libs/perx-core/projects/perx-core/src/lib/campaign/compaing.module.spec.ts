import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { campaignServiceFactory } from './campaign.module';
import { WhistlerCampaignService } from './whistler-campaign.service';
import { V4CampaignService } from './v4-campaign.service';

describe('CampaingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should call campaignServiceFactory', inject([HttpClient], (http: HttpClient) => {
    const instWhistler = campaignServiceFactory(http, { isWhistler: true }) instanceof WhistlerCampaignService;
    expect(instWhistler).toBeTruthy();
    const inst = campaignServiceFactory(http, { isWhistler: false }) instanceof V4CampaignService;
    expect(inst).toBeTruthy();
  }));
});
