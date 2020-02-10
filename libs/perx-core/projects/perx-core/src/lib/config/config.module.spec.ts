import { TestBed, inject } from '@angular/core/testing';
import { configServiceFactory } from './config.module';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { V4ConfigService } from './v4-config.service';
import { WhistlerConfigService } from './whistler-config.service';

describe('ConfigModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Config, useValue: {} }
      ]
    });
  });
  it('should', inject([HttpClient, Config],
    (http: HttpClient, configService: Config) => {
      expect(configServiceFactory(http, {isWhistler: true}) instanceof WhistlerConfigService).toBeTruthy();
      expect(configServiceFactory(http, configService) instanceof V4ConfigService).toBeTruthy();
    }));
});
