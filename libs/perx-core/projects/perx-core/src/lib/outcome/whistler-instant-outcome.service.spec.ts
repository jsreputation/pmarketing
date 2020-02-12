import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule, IVoucherService } from '../../public-api';
import { WhistlerInstantOutcomeService } from './whistler-instant-outcome.service';
import { of } from 'rxjs';

describe('WhistlerInstantOutcomeService', () => {
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of()
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: IVoucherService, useValue: vouchersServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerInstantOutcomeService = TestBed.get(WhistlerInstantOutcomeService);
    expect(service).toBeTruthy();
  });
});
