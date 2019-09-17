import { TestBed } from '@angular/core/testing';

import { WhistlerRewardsService } from './whistler-rewards.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';

describe('WhistlerRewardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: WhistlerRewardsService = TestBed.get(WhistlerRewardsService);
    expect(service).toBeTruthy();
  });
});
