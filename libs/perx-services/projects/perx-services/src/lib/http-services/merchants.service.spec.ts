import { TestBed } from '@angular/core/testing';

import { MerchantsService } from './merchants.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MerchantsService', () => {
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
    const service: MerchantsService = TestBed.get(MerchantsService);
    expect(service).toBeTruthy();
  });
});
