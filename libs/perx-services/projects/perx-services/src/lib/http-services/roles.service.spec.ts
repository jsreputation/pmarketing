import { TestBed } from '@angular/core/testing';

import { RolesService } from './roles.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiConfigService } from '../configs/api-config';

describe('RolesService', () => {
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
    const service: RolesService = TestBed.get(RolesService);
    expect(service).toBeTruthy();
  });
});
