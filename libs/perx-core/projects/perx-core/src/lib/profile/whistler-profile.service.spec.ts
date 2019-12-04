import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileModule } from './profile.module';
import { V4ProfileService } from './v4-profile.service';

import { ConfigModule } from '../config/config.module';
import { TokenStorage } from '../utils/storage/token-storage.service';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule,
      ConfigModule.forRoot({})
    ],
    providers: [TokenStorage]
  }));

  it('should be created', () => {
    const service: V4ProfileService = TestBed.get(V4ProfileService);
    expect(service).toBeTruthy();
  });
});
