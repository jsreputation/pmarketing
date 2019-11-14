import { TestBed } from '@angular/core/testing';

import { CustomTranslateLoader } from './land.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../config/config.service';
import { of } from 'rxjs';

describe('CustomTranslateLoader', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      CustomTranslateLoader,
      {
        provide: ConfigService,
        useValue: {
          readAppConfig: () => of({ production: true })
        }
      }
    ]
  }));

  it('should be created', () => {
    const service: CustomTranslateLoader = TestBed.get(CustomTranslateLoader);
    expect(service).toBeTruthy();
  });
});
