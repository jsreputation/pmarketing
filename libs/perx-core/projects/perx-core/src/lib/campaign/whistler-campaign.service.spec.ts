import { TestBed } from '@angular/core/testing';

import { WhistlerCampaignService } from './whistler-campaign.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('WhistlerCampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
  }));

  it('should be created', () => {
    const service: WhistlerCampaignService = TestBed.get(WhistlerCampaignService);
    expect(service).toBeTruthy();
  });
});
