import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4ProfileService } from './v4-profile.service';
import { ProfileModule } from './profile.module';

import { ConfigModule } from '../config/config.module';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4ProfileService = TestBed.get(V4ProfileService);
    expect(service).toBeTruthy();
  });
});
