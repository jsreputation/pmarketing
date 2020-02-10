import { TestBed } from '@angular/core/testing';

import { CataloguesService } from './catalogues.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CataloguesService', () => {
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
    const service: CataloguesService = TestBed.get(CataloguesService);
    expect(service).toBeTruthy();
  });
});
