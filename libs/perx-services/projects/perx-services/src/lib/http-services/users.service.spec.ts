import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
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
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
