import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { campaignServiceFactory } from './campaign.module';
import { WhistlerCampaignService } from './whistler-campaign.service';
import { V4CampaignService } from './v4-campaign.service';
import { ConfigService } from '../config/config.service';
import { of } from 'rxjs';

describe('CampaingModule', () => {
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ConfigService, useValue: configServiceStub }
      ]
    });
  });

  it('should call campaignServiceFactory', inject([HttpClient, ConfigService], (http: HttpClient, configService: ConfigService) => {
    const instWhistler = campaignServiceFactory(http, { isWhistler: true }, configService) instanceof WhistlerCampaignService;
    expect(instWhistler).toBeTruthy();
    const inst = campaignServiceFactory(http, { isWhistler: false }, configService) instanceof V4CampaignService;
    expect(inst).toBeTruthy();
  }));
});
