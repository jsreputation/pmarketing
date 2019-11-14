import { TestBed } from '@angular/core/testing';

import { CustomTranslateLoader } from './land.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Config } from '../../config/config';

describe('CustomTranslateLoader', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      CustomTranslateLoader,
      { provide: Config, useValue: { production: true } }
    ]
  }));

  it('should be created', () => {
    const service: CustomTranslateLoader = TestBed.get(CustomTranslateLoader);
    expect(service).toBeTruthy();
  });
});
