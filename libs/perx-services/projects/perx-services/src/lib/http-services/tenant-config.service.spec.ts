import { TestBed } from '@angular/core/testing';

import { TenantConfigService } from './tenant-config.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TenantConfigService', () => {
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
    const service: TenantConfigService = TestBed.get(TenantConfigService);
    expect(service).toBeTruthy();
  });
});
