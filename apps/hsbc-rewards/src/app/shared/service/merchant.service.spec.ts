import { TestBed } from '@angular/core/testing';

import { MerchantService } from './merchant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MerchantService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: MerchantService = TestBed.get(MerchantService);
    expect(service).toBeTruthy();
  });
});
