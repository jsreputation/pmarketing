import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITheme, DARK, LIGHT, PagesObject } from './themes.model';
import { IWSetting, IWTenant, } from '@perx/whistler';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { map, tap } from 'rxjs/operators';
import { ThemesService } from './themes.service';

import { IJsonApiListPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerThemesService extends ThemesService {
  private themeSettingEndpoint: string;
  private settings: any;

  constructor(
    private http: HttpClient,
    config: Config,
  ) {
    super();
    if (!config.production) {
      this.themeSettingEndpoint = 'http://localhost:4000/themes';
    } else {
      this.themeSettingEndpoint = config.baseHref + 'themes';
    }
  }

  private static WThemeToTheme(setting: IWSetting): ITheme {
    if (!setting) {
      return LIGHT;
    }
    let backgroundColor = LIGHT.properties['--background'];
    let fontColor = LIGHT.properties['--font_color'];
    if (setting['theme.style'] === DARK.name) {
      backgroundColor = DARK.properties['--background'];
      fontColor = DARK.properties['--font_color'];
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
      }
    };
  }

  public getThemeSetting(): Observable<ITheme> {
    const themesRequest: { url: string } = {
      url: location.host
    };

    return this.http.post<IJsonApiListPayload<IWTenant>>(this.themeSettingEndpoint, themesRequest).pipe(
      map(res => res.data && res.data[0].attributes.display_properties),
      map((setting) => WhistlerThemesService.WThemeToTheme(setting)),
      tap((theme) => this.setActiveTheme(theme))
    );
  }

  public getAccountSettings(): Observable<PagesObject> {
    if (this.settings) {
      return of(this.settings);
    }
    const accountSettingRequest: { url: string } = {
      url: location.host
    };
    return this.http.post<IJsonApiListPayload<IWTenant>>(this.themeSettingEndpoint, accountSettingRequest).pipe(
      map(res => res.data && res.data[0].attributes.display_properties),
      map((displayProps) => displayProps.account || { pages: [] }),
      map((account) => this.settings = account)
    );
  }
}
