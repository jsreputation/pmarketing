import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { WhistlerSettingsService } from './whistler-settings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import {ConfigService} from '../config/config.service';

const configServiceStub = {
  readAppConfig: () => of({
    production: true,
    baseHref: '/'
  })
};

describe('WhistlerSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub }
      ]
    });
  });

  it('should create', fakeAsync(inject([HttpClient, ConfigService],
    (http: HttpClient, configService: ConfigService) => {
      const service = new WhistlerSettingsService(http, configService);
      expect(service).toBeTruthy();
    })));
  it('getAccountSettings', fakeAsync(inject([WhistlerSettingsService, HttpClient],
    (config: WhistlerSettingsService, http: HttpClient) => {
      const spy = jest.spyOn(http, 'post').mockReturnValue(of({
        data: [{ attributes: { display_properties: { account: null } } }]
      }));
      config.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
      // get cashe
      spy.mockReset();
      config.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).not.toHaveBeenCalled();
    })));
});
