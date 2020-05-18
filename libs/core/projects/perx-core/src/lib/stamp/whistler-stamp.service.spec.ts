import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConfigModule } from '../config/config.module';
import { ICampaignService } from '../campaign/icampaign.service';
import { WhistlerStampService } from './whistler-stamp.service';

describe('WhistlerStampService', () => {
  const campaignServiceStub: Partial<ICampaignService> = {};
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: ICampaignService, useValue: campaignServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerStampService = TestBed.get(WhistlerStampService);
    expect(service).toBeTruthy();
  });
});
