import { TestBed, inject } from '@angular/core/testing';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { Config } from '../config/config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {WhistlerSettingsService} from './whistler-settings.service';
import {V4SettingsService} from './v4-settings.service';
import {settingsServiceFactory} from './settings.module';
import {ConfigService} from '../config/config.service';
import {of} from 'rxjs';

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({
    redirectAfterLogin: '/home',
    apiHost: 'string',
    production: true,
    baseHref: '/',
    isWhistler: true,
    preAuth: false,
  })
};

describe('SettingsModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: {} },
        { provide: Config, useValue: {} },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    });
  });
  it('should', inject([ HttpClient, HttpBackend, Config, ConfigService, AuthenticationService ],
    (http: HttpClient, httpBackend: HttpBackend, config: Config, configService: ConfigService, auth: AuthenticationService) => {
      expect(settingsServiceFactory(http, httpBackend, { isWhistler: true }, configService, auth) instanceof WhistlerSettingsService).toBeTruthy();
      expect(settingsServiceFactory(http, httpBackend, config, configService, auth) instanceof V4SettingsService).toBeTruthy();
    }));
});
