import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Config } from './config';
import { HttpClient } from '@angular/common/http';
import { WhistlerConfigService } from './whistler-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('WhistlerConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: Config, useValue: { production: false } }
      ]
    });
  });

  it('should create service with and without config', fakeAsync(inject([HttpClient, Config],
    (http: HttpClient) => {
      const serviceProd = new WhistlerConfigService(http, { production: true, baseHref: 'http://test' });
      expect(serviceProd).toBeTruthy();
      const service = new WhistlerConfigService(http, { production: false });
      expect(service).toBeTruthy();
    })));
  it('read app config', fakeAsync(inject([WhistlerConfigService, HttpClient],
    (config: WhistlerConfigService, http: HttpClient) => {
      const spy = spyOn(http, 'post').and.returnValue(of({
        data: [{
          attributes: {
            display_properties: {
              showHistoryPage: false,
              showHomePage: false
            }
          }
        }]
      }));
      config.readAppConfig().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
  it('getAccountSettings', fakeAsync(inject([WhistlerConfigService, HttpClient],
    (config: WhistlerConfigService, http: HttpClient) => {
      const spy = spyOn(http, 'post').and.returnValue(of({
        data: [{ attributes: { display_properties: { account: null } } }]
      }));
      config.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
      // get cashe
      spy.calls.reset();
      config.getAccountSettings().subscribe(() => { });
      tick();
      expect(spy).not.toHaveBeenCalled();
    })));
});