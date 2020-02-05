import { TestBed } from '@angular/core/testing';

import { UploadsService } from './uploads.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UploadsService', () => {
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
    const service: UploadsService = TestBed.get(UploadsService);
    expect(service).toBeTruthy();
  });
});
