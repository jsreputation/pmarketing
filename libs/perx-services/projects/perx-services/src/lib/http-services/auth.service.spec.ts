import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
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
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
