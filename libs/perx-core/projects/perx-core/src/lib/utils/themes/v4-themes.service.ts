import { Injectable } from '@angular/core';
import { ThemesService } from './themes.service';
import { DARK, ITheme, LIGHT, PagesObject } from './themes.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class V4ThemesService implements ThemesService {
  private themeSettingEndpoint: string;
  private active: ITheme;
  private availableThemes: ITheme[] = [LIGHT, DARK];

  constructor(private http: HttpClient, config: Config ) {
    this.themeSettingEndpoint = config.baseHref + `assets/theme.json`;
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
    return this.http.get(this.themeSettingEndpoint).pipe(
      map((res) => res as ITheme),
      tap((theme) => this.setActiveTheme(theme))
    );
  }

  public getAccountSettings(): Observable<PagesObject> {
    throw new Error(`Method not implemented.`);
  }
}
