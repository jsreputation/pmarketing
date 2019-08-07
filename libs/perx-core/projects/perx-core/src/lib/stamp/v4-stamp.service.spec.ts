import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4StampService } from './v4-stamp.service';
import { EnvConfig } from '../shared/env-config';

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
    const service: V4StampService = TestBed.get(V4StampService);
    expect(service).toBeTruthy();
  });
});
