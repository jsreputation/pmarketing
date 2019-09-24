import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITheme, DARK, LIGHT } from './themes.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from '../../config/config';
import { IJsonApiItemPayload } from '../../jsonapi.payload';
import { map, tap } from 'rxjs/operators';

interface WhistlerITenant {
  account_id: string;
  alias: string;
  created_at: string;
  name: string;
  properties: WhistlerISetting;
}

interface WhistlerISetting {
  currency: number;
  time_zone: number;
  'theme.accent': string;
  'theme.button_color': string;
  'theme.font': string;
  'theme.header_color': string;
  'theme.logo': string;
  'theme.primary': string;
  'theme.style': string;
  'theme.title': string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private active: ITheme = LIGHT;
  private availableThemes: ITheme[] = [LIGHT, DARK];
  private themeSettingEndpoint: string;

  constructor(
    private http: HttpClient,
    config: Config,
  ) {
    if (!config.production) {
      this.themeSettingEndpoint = 'http://localhost:4000/themes';
    } else {
      this.themeSettingEndpoint = config.baseHref + 'themes';
    }
  }

  private static WThemeToTheme(setting: WhistlerISetting): ITheme {
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
        '--button_color': setting['theme.button_color'],
        '--header_color': setting['theme.header_color'],
        '--background': backgroundColor,
        '--font_color': fontColor,
      }
    };
  }

  public getAvailableThemes(): ITheme[] {
    return this.availableThemes;
  }

  public getActiveTheme(): ITheme {
    return this.active;
  }

  public setActiveTheme(theme: ITheme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  public getThemeSetting(): Observable<ITheme> {
    const params = new HttpParams().append('url', location.host);

    return this.http.post<IJsonApiItemPayload<WhistlerITenant>>(this.themeSettingEndpoint, null, { params }).pipe(
      map(res => res.data.attributes.properties),
      map((setting) => ThemesService.WThemeToTheme(setting)),
      tap((theme) => this.setActiveTheme(theme))
    );
  }
}
