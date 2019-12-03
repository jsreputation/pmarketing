import { TestBed, inject } from '@angular/core/testing';
import { configServiceFactory } from './config.module';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication/authentication.service';
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
        { provide: AuthenticationService, useValue: {} },
        { provide: Config, useValue: {} }
      ]
    });
  });
  it('should', inject([HttpClient, Config, AuthenticationService],
    (http: HttpClient, configService: Config, auth: AuthenticationService) => {
      expect(configServiceFactory(http, {isWhistler: true}, auth) instanceof WhistlerConfigService).toBeTruthy();
      expect(configServiceFactory(http, configService, auth) instanceof V4ConfigService).toBeTruthy();
    }));
});
