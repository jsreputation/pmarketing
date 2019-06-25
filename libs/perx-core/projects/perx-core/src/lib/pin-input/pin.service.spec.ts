import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VouchersModule } from '../vouchers/vouchers.module';
import { PinService } from './pin.service';

describe('PinService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        VouchersModule.forRoot({ env: { apiHost: '' } }),
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: PinService = TestBed.get(PinService);
    expect(service).toBeTruthy();
  });
});
