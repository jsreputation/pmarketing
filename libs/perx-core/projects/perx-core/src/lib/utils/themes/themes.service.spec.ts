import { TestBed, fakeAsync } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../config/config.module';
import { ThemesService } from './themes.service';
import { LIGHT, DARK } from './themes.model';
// import { Type } from '@angular/core';

describe('ThemesService', () => {
  let service: ThemesService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: ThemesService, useClass: ThemesService }
    ]
  }));
  beforeEach(() => {
    service = TestBed.get(ThemesService);
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get avalable themes', () => {
    expect(service.getAvailableThemes()[0]).toEqual(LIGHT)
  });

  it('ActiveTheme', fakeAsync(() => {
    service.setActiveTheme(DARK);
    service.getActiveTheme().subscribe((res) => expect(res).toEqual(DARK));
  }));
});