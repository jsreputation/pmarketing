import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  map,
  tap,
  catchError,
} from 'rxjs/operators';
import {
  Observable,
  of,
} from 'rxjs';

import { ThemesService } from './themes.service';
import { ITheme } from './themes.model';
import { LIGHT } from './themes.model';

import { Config } from '../../config/config';
import { IConfig } from '../../config/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class V4ThemesService extends ThemesService {
  private themeSettingEndpoint: string;
  private responseCache: Map<string, ITheme> = new Map();

  constructor(private http: HttpClient, config: Config) {
    super();
    this.themeSettingEndpoint = `${config.baseHref}assets/theme.json`;
  }

  public getThemeSetting(config?: IConfig<ITheme>): Observable<ITheme> {
    let url: string = this.themeSettingEndpoint;
    if (config && config.sourceType) {
      url = `${config.baseHref}assets/${config.sourceType}-theme.json`;
    }
    const themeSettingFromCache: ITheme | undefined = this.responseCache.get(url);
    if (themeSettingFromCache) {
      return of(themeSettingFromCache);
    }

    const response: Observable<ITheme> = this.http.get(url).pipe(
      map((res) => res as ITheme),
      tap((theme: ITheme) => this.setActiveTheme(theme)),
      catchError(() => of(LIGHT))
    );
    response.subscribe((themeSetting: ITheme) => this.responseCache.set(url, themeSetting));
    return response;
  }
}
