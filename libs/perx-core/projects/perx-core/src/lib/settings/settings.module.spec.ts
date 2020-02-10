import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { Config } from '../config/config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {WhistlerSettingsService} from './whistler-settings.service';
import {V4SettingsService} from './v4-settings.service';
import {settingsServiceFactory} from './settings.module';
import {ConfigService} from '../config/config.service';
import {of} from 'rxjs';

const configServiceStub = {
  readAppConfig: () => of({
    production: true,
    baseHref: '/'
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
  it('should', inject([HttpClient, Config, ConfigService, AuthenticationService],
    (http: HttpClient, config: Config, configService: ConfigService, auth: AuthenticationService) => {
      expect(settingsServiceFactory(http, {isWhistler: true}, configService, auth) instanceof WhistlerSettingsService).toBeTruthy();
      expect(settingsServiceFactory(http, config, configService, auth) instanceof V4SettingsService).toBeTruthy();
    }));
});
