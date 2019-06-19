import { TestBed } from '@angular/core/testing';

import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';

describe('CampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CampaignService = TestBed.get(CampaignService);
    expect(service).toBeTruthy();
  });
});
