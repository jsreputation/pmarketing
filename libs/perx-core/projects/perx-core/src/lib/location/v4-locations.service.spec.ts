import { TestBed } from '@angular/core/testing';

import { V4LocationsService } from './v4-locations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('V4LocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4LocationsService = TestBed.get(V4LocationsService);
    expect(service).toBeTruthy();
  });
});
