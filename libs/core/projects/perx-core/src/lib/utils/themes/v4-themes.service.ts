import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ThemesService } from './themes.service';
import { ITheme, IThemeV4ApiProperties, LIGHT, ThemeJsonApiItem, ThemeJsonApiItemPayLoad } from './themes.model';
import { IConfig } from '../../config/models/config.model';
import { ConfigService } from '../../config/config.service';
import { TokenStorage } from '../storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class V4ThemesService extends ThemesService {
  private themeSettingEndpoint: string;
  private responseCache: Map<string, ITheme> = new Map();
  private httpBypass: HttpClient;

  constructor(
    private handler: HttpBackend,
    private http: HttpClient,
    private configService: ConfigService,
    private tokenStorage: TokenStorage
  ) {
    super();
    this.httpBypass = new HttpClient(this.handler);
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.themeSettingEndpoint = `${config.apiHost}/v4/settings/microsite_settings`;
      });
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

    const appToken = (this.tokenStorage.getAppInfoProperty('appAccessToken') ||
                      this.tokenStorage.getAppInfoProperty('userAccessToken')) as string;
    const contentHeader: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${appToken}` });
    const response = this.httpBypass.get<ThemeJsonApiItemPayLoad<IThemeV4ApiProperties>>(
      this.themeSettingEndpoint,
      { headers: contentHeader }
    ).pipe(
      map((res) => V4ThemesService.VThemeToTheme(res.data)),
      shareReplay(1),
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
    const settingValues = setting.json_value;
    return {
      name: setting.key + setting.id, // more unique than using title from properties
      properties: {
        '--font': settingValues.font,
        '--title': settingValues.title,
        '--logo': settingValues.logo.file ? settingValues.logo.file : (settingValues.logo.value?.file || ''),
        '--landing_page_logo': settingValues?.landing_page_logo?.value?.file || '',
        '--accent': settingValues.accent_color,
        '--primary': settingValues.primary_color,
        '--button_text_color': settingValues.CTA_button_text_color,
        '--button_background_color': settingValues.CTA_button_bg_color,
        '--header_color': settingValues.header_color,
        '--background': settingValues.app_bg_color,
        '--login_background_colour': settingValues.login_page_bg_color,
        '--font_color': settingValues.font_color || '#231f20',
        '--surface_colour': '#ffffff',
        '--popup_background_colour': '#ffffff',
        '--login_page_bg_image': settingValues?.login_page_bg_image ? settingValues?.login_page_bg_image : ''
      }
    };
  }
}
