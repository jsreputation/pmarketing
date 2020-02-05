import { TestBed } from '@angular/core/testing';

import { RulesService } from './rules.service';
import { ApiConfigService } from '../configs/api-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RulesService', () => {
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
    const service: RulesService = TestBed.get(RulesService);
    expect(service).toBeTruthy();
  });
});
