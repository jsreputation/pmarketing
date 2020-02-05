import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomersService', () => {
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
    const service: CustomersService = TestBed.get(CustomersService);
    expect(service).toBeTruthy();
  });
});
