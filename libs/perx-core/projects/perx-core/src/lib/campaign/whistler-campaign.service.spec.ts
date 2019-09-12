import { TestBed } from '@angular/core/testing';

import { WhistlerCampaignService } from './whistler-campaign.service';

describe('WhistlerCampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhistlerCampaignService = TestBed.get(WhistlerCampaignService);
    expect(service).toBeTruthy();
  });
});
