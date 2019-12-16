import { Injectable } from '@angular/core';
import { ThemesService } from './themes.service';
import { ITheme } from './themes.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { map, tap, catchError } from 'rxjs/operators';
import { IConfig } from '../../config/models/config.model';
import { LIGHT } from './themes.model';

@Injectable({
  providedIn: 'root'
})
export class V4ThemesService extends ThemesService {
  private themeSettingEndpoint: string;

  constructor(private http: HttpClient, config: Config) {
    super();
    this.themeSettingEndpoint = config.baseHref + `assets/theme.json`;
  }

  public getThemeSetting(config?: IConfig<ITheme>): Observable<ITheme> {
    let url: string = this.themeSettingEndpoint;
    if (config && config.sourceType) {
      url = config.baseHref + `assets/${config.sourceType}-theme.json`;
    }
    return this.http.get(url).pipe(
      map((res) => res as ITheme),
      tap((theme) => this.setActiveTheme(theme)),
      catchError(() => of(LIGHT))
    );
  }
}
