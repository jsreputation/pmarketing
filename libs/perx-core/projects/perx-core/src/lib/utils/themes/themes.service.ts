import { Observable, BehaviorSubject } from 'rxjs';
import { ITheme, LIGHT, DARK } from './themes.model';
import { IConfig } from '../../config/models/config.model';

export abstract class ThemesService {
  protected active: BehaviorSubject<ITheme> = new BehaviorSubject(LIGHT);
  protected availableThemes: ITheme[] = [LIGHT, DARK];

  public getAvailableThemes(): ITheme[] {
    return this.availableThemes;
  }

  public getActiveTheme(): Observable<ITheme> {
    return this.active;
  }

  public setActiveTheme(theme: ITheme): void {
    this.active.next(theme);

    Object.entries(theme.properties).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }

  public abstract getThemeSetting(config?: IConfig): Observable<ITheme>;
}
