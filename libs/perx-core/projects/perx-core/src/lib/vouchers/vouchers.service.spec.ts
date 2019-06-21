import { TestBed } from '@angular/core/testing';

import { VouchersService } from './vouchers.service';
import { HttpClientModule } from '@angular/common/http';
import { VouchersModule } from './vouchers.module';

describe('VouchersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      VouchersModule.forRoot({ env: { apiHost: '' } }),
    ]
  }));

  it('should be created', () => {
    const service: VouchersService = TestBed.get(VouchersService);
    expect(service).toBeTruthy();
  });
});
