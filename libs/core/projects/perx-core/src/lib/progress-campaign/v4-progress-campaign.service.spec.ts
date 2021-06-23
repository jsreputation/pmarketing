import { TestBed } from '@angular/core/testing';

import { V4ProgressCampaignService } from './v4-progress-campaign.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '@perxtech/core';
import { of } from 'rxjs';

describe('V4ProgressCampaignService', () => {
  let service: V4ProgressCampaignService;

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
      ]
    });
    service = TestBed.inject(V4ProgressCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
