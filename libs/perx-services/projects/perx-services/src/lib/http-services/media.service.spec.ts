import { TestBed } from '@angular/core/testing';

import { MediaService } from './media.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MediaService', () => {
  const configStub: Partial<ApiConfigService> = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      { provide: ApiConfigService, useValue: configStub },
    ]
  }));

  it('should be created', () => {
    const service: MediaService = TestBed.get(MediaService);
    expect(service).toBeTruthy();
  });
});
