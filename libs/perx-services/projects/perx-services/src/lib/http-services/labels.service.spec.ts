import { TestBed } from '@angular/core/testing';

import { LabelsService } from './labels.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LabelsService', () => {
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
    const service: LabelsService = TestBed.get(LabelsService);
    expect(service).toBeTruthy();
  });
});
