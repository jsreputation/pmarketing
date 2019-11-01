import { Injectable } from '@angular/core';
import { ThemesService } from './themes.service';
import { ITheme, PagesObject } from './themes.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class V4ThemesService extends ThemesService {
  private themeSettingEndpoint: string;

  constructor(private http: HttpClient, config: Config) {
    super();
    this.themeSettingEndpoint = config.baseHref + `assets/theme.json`;
  }

  public getThemeSetting(): Observable<ITheme> {
    return this.http.get(this.themeSettingEndpoint).pipe(
      map((res) => res as ITheme),
      tap((theme) => this.setActiveTheme(theme))
    );
  }

  public getAccountSettings(): Observable<PagesObject> {
    throw new Error(`Method not implemented.`);
  }
}
