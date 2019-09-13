import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MerchantService } from './merchant.service';

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
