import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileModule } from './profile.module';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule.forRoot({ env: { apiHost: '' } })
    ]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
