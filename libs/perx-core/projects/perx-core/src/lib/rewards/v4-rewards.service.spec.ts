import { TestBed } from '@angular/core/testing';

import { V4RewardsService } from './v4-rewards.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvConfig } from '../shared/env-config';
import { VouchersModule } from '../vouchers/vouchers.module';
import { ConfigModule } from '../../public-api';

describe('V4RewardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      VouchersModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      EnvConfig,
    ]
  }));

  it('should be created', () => {
    const service: V4RewardsService = TestBed.get(V4RewardsService);
    expect(service).toBeTruthy();
  });
});
