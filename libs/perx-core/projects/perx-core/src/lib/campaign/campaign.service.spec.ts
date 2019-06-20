import { TestBed } from '@angular/core/testing';

import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './env-config';

describe('CampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [EnvConfig]
  }));

  it('should be created', () => {
    const service: CampaignService = TestBed.get(CampaignService);
    expect(service).toBeTruthy();
  });
});
