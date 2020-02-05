import { TestBed } from '@angular/core/testing';

import { AudiencesService } from './audiences.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AudiencesService', () => {
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
    const service: AudiencesService = TestBed.get(AudiencesService);
    expect(service).toBeTruthy();
  });
});
