import { TestBed } from '@angular/core/testing';

import { V4ProgressCampaignService } from './v4-progress-campaign.service';

describe('V4ProgressCampaignService', () => {
  let service: V4ProgressCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(V4ProgressCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
