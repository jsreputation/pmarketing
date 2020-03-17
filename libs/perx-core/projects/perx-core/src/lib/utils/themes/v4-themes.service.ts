import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map,
  catchError
} from 'rxjs/operators';
import {
  Observable,
  of,
} from 'rxjs';

import { ThemesService } from './themes.service';
import {ITheme, IThemeV4ApiProperties, ThemeJsonApiItem, ThemeJsonApiItemPayLoad} from './themes.model';
import { LIGHT } from './themes.model';

import { Config } from '../../config/config';
import { IConfig } from '../../config/models/config.model';
import { oc } from 'ts-optchain';

@Injectable({
  providedIn: 'root'
})
export class V4ThemesService extends ThemesService {
  private themeSettingEndpoint: string;
  private responseCache: Map<string, ITheme> = new Map();

  constructor(private http: HttpClient, config: Config) {
    super();
    this.themeSettingEndpoint = `${config.apiHost}/v4/settings/microsite_settings`;

  }

  public getThemeSetting(config?: IConfig<ITheme>): Observable<ITheme> {
    // it is intended on browser refresh for previous theme to be lost and theme refetched
    // use same throughout to return same and correct theme cached
    const url: string = this.themeSettingEndpoint;
    // return from cache if it is in cache
    const themeSettingFromCache: ITheme | undefined = this.responseCache.get(url);
    if (themeSettingFromCache) {
      return of(themeSettingFromCache);
    }
    // pipe tap to see fallback theme data
    let responseFallback: Observable<ITheme>;
    if (config) {
      responseFallback = this.http.get<ITheme>(`${config.baseHref}assets/theme.json`);
    }

    const response = this.http.get<ThemeJsonApiItemPayLoad<IThemeV4ApiProperties>>(this.themeSettingEndpoint)
      .pipe(
        map((res) => V4ThemesService.VThemeToTheme(res.data)),
        catchError(() => {
          if (responseFallback) {
            return responseFallback;
          }
          return of(LIGHT);
        })
      );
    response.subscribe((themeSetting: ITheme) => {
      this.responseCache.set(url, themeSetting);
      this.setActiveTheme(themeSetting);
    });
    return response;
  }

  private static VThemeToTheme(setting: ThemeJsonApiItem<IThemeV4ApiProperties>): ITheme {
    // we want to follow material all in all font_color and surface, pop_up color
    // we hardcore these three values, their values is suppose to come from material theme setting
    return  {
      name: setting.key + setting.id, // more unique than using title from properties
      properties: {
        '--font': setting.json_value.font,
        '--title': setting.json_value.title,
        '--logo': setting.json_value.logo.file || oc(setting).json_value.logo.value.file(''),
        '--accent': setting.json_value.accent_color,
        '--primary': setting.json_value.primary_color,
        '--button_text_color': setting.json_value.CTA_button_text_color,
        '--button_background_color': setting.json_value.CTA_button_bg_color,
        '--header_color': setting.json_value.header_color,
        '--background': setting.json_value.app_bg_color,
        '--login_background_colour': setting.json_value.login_page_bg_color,
        '--font_color': '#231f20',
        '--surface_colour': '#ffffff',
        '--popup_background_colour': '#ffffff'
      }
    };
  }
}
