import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StampService } from './stamp.service';
import { EnvConfig } from './env-config';

import { VouchersService } from '../vouchers/vouchers.service';

describe('StampService', () => {
  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      EnvConfig,
      { provide: VouchersService, useValue: vouchersServiceMock }
    ]
  }));

  it('should be created', () => {
    const service: StampService = TestBed.get(StampService);
    expect(service).toBeTruthy();
  });
});
