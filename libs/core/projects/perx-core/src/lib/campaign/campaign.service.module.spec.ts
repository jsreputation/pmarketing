import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { campaignServiceFactory } from './campaign.service.module';
import { WhistlerCampaignService } from './whistler-campaign.service';
import { V4CampaignService } from './v4-campaign.service';
import { ConfigService } from '../config/config.service';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

describe('CampaignServiceModule', () => {
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ConfigService, useValue: configServiceStub }],
    });
  });
  // no longer calls campaignServiceFacotry here
  it('should call campaignServiceFactory', inject(
    [HttpClient, ConfigService],
    (http: HttpClient, configService: ConfigService, translateService: TranslateService) => {
      const instWhistler =
        campaignServiceFactory(
          http,
          { isWhistler: true },
          configService,
          translateService
        ) instanceof WhistlerCampaignService;
      expect(instWhistler).toBeTruthy();
      const inst =
        campaignServiceFactory(
          http,
          { isWhistler: false },
          configService,
          translateService
        ) instanceof V4CampaignService;
      expect(inst).toBeTruthy();
    }
  ));
});
