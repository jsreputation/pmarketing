import { TestBed } from '@angular/core/testing';

import { V4ProfileService } from './v4-profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileModule } from './profile.module';
import { ConfigModule, TokenStorage } from '../../public-api';

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
