import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4StampService } from './v4-stamp.service';
import { VouchersService } from '../vouchers/vouchers.service';
import { ConfigModule } from '../../public-api';

describe('StampService', () => {
  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: VouchersService, useValue: vouchersServiceMock }
    ]
  }));

  it('should be created', () => {
    const service: V4StampService = TestBed.get(V4StampService);
    expect(service).toBeTruthy();
  });
});
