import { TestBed } from '@angular/core/testing';

import { V4TeamsService } from './v4-teams.service';
import { ConfigService } from '@perxtech/core';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('V4TeamsService', () => {
  let service: V4TeamsService;

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
      ]
    });
    service = TestBed.inject(V4TeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
