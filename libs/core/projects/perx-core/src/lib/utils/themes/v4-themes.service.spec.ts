import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../config/config.module';
import { V4ThemesService } from './v4-themes.service';
import { IConfig } from '../../config/models/config.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DARK, ITheme } from './themes.model';

describe('ThemesService', () => {
  let service: V4ThemesService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));
  beforeEach(() => {
    service = TestBed.get(V4ThemesService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get theme setting', fakeAsync(inject([HttpClient], (http: HttpClient) => {
    jest.spyOn(http, 'get').mockReturnValue(of(DARK));
    service.getThemeSetting({ sourceType: 'test', baseHref: 'test' } as IConfig<ITheme>)
      .subscribe((val) => expect(val).toEqual(DARK));
    tick();
    service.getThemeSetting()
      .subscribe((val) => expect(val).toEqual(DARK));
    tick();
  })));
});
