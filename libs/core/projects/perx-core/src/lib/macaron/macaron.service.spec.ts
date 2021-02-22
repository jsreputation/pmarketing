import { TestBed } from '@angular/core/testing';

import { MacaronService } from './macaron.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('MacaronService', () => {

  const translateServiceStub: Partial<TranslateService> = {
    get: () => of()
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: TranslateService, useValue: translateServiceStub }
    ]
  }));

  it('should be created', () => {
    const service: MacaronService = TestBed.get(MacaronService);
    expect(service).toBeTruthy();
  });
});
