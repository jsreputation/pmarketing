import { TestBed } from '@angular/core/testing';

import { WhistlerVouchersService } from './whistler-vouchers.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../public-api';

describe('WhistlerVouchersService', () => {

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: true,
    preAuth: false,
    baseHref: '/'
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({ ...environment })
    ]
  }));

  it('should be created', () => {
    const service: WhistlerVouchersService = TestBed.get(WhistlerVouchersService);
    expect(service).toBeTruthy();
  });
});
