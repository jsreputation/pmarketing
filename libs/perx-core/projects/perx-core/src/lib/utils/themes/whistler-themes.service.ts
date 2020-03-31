import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  of,
} from 'rxjs';
import {
  map,
  tap,
  share,
} from 'rxjs/operators';

import { IJsonApiListPayload } from '@perxtech/whistler';
import {
  IWSetting,
  IWTenant,
} from '@perxtech/whistler';

import {
  ITheme,
  DARK,
  LIGHT,
} from './themes.model';
import { ThemesService } from './themes.service';

import { Config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class WhistlerThemesService extends ThemesService {
  private themeSettingEndpoint: string;
  private responseCache: Map<string, ITheme> = new Map();

  constructor(
    private http: HttpClient,
    config: Config,
  ) {
    super();
    if (!config.production) {
      this.themeSettingEndpoint = 'http://localhost:4000/themes';
    } else {
      this.themeSettingEndpoint = `${config.baseHref}themes`;
    }
  }

  private static WThemeToTheme(setting: IWSetting): ITheme {
    if (!setting) {
      return LIGHT;
    }
    let backgroundColor = LIGHT.properties['--background'];
    let fontColor = LIGHT.properties['--font_color'];
    let surfaceColor = LIGHT.properties['--surface_colour'];
    let popupBackgroundColor = LIGHT.properties['--popup_background_colour'];

    if (setting['theme.style'] === DARK.name) {
      backgroundColor = DARK.properties['--background'];
      fontColor = DARK.properties['--font_color'];
      surfaceColor = DARK.properties['--surface_colour'];
      popupBackgroundColor = DARK.properties['--popup_background_colour'];
    }
    return {
      name: setting['theme.style'],
      properties: {
        '--font': setting['theme.font'],
        '--logo': setting['theme.logo'],
        '--title': setting['theme.title'],
        '--accent': setting['theme.accent'],
        '--primary': setting['theme.primary'],
        '--button_text_color': setting['theme.button_text_color'],
        '--button_background_color': setting['theme.button_background_color'],
        '--header_color': setting['theme.header_color'],
        '--login_background_colour': setting['theme.login_background_colour'],
        '--background': backgroundColor,
        '--font_color': fontColor,
        '--surface_colour': surfaceColor,
        '--popup_background_colour': popupBackgroundColor
      }
    };
  }

  public getThemeSetting(): Observable<ITheme> {
    const themeSettingFromCache: ITheme | undefined = this.responseCache.get(this.themeSettingEndpoint);
    if (themeSettingFromCache) {
      return of(themeSettingFromCache);
    }

    const themesRequest: { url: string } = {
      url: location.host
    };
    const response: Observable<ITheme> = this.http.post<IJsonApiListPayload<IWTenant>>(this.themeSettingEndpoint, themesRequest)
      .pipe(
        map(res => res.data && res.data[0].attributes.display_properties),
        map((setting: IWSetting) => WhistlerThemesService.WThemeToTheme(setting)),
        tap((theme: ITheme) => this.setActiveTheme(theme)),
        share()
      );
    response.subscribe((themeSetting: ITheme) => this.responseCache.set(this.themeSettingEndpoint, themeSetting));
    return response;
  }
}
