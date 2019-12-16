import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../config/config.module';
import { WhistlerThemesService } from './whistler-themes.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { LIGHT, DARK } from './themes.model';

describe('ThemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: WhistlerThemesService = TestBed.get(WhistlerThemesService);
    expect(service).toBeTruthy();
  });

  it('should create with config prod', inject([HttpClient], (http: HttpClient) => {
    expect(new WhistlerThemesService(http, { production: true })).toBeTruthy();
  }));

  it('get Theme Setting', fakeAsync(inject([WhistlerThemesService, HttpClient],
    (service: WhistlerThemesService, http: HttpClient) => {
      const spy = spyOn(http, 'post').and.returnValue(of({
        data: [{
          attributes: {
            display_properties: {
              'theme.style': 'test'
            }
          }
        }]
      }));
      service.getThemeSetting().subscribe((theme) => expect(theme.name).toBe('test'));
      tick();
      spy.and.returnValue(of({ data: [{ attributes: { display_properties: null } }] }));
      service.getThemeSetting().subscribe((theme) => expect(theme).toEqual(LIGHT));
      tick();
      spy.and.returnValue(of({ data: [{ attributes: { display_properties: { 'theme.style': DARK.name } } }] }));
      service.getThemeSetting()
        .subscribe((theme) => expect(theme.properties['--backgroundColor']).toEqual(DARK.properties['--backgroundColor']));
      tick();
    })));
});
