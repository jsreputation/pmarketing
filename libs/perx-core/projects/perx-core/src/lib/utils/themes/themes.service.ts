import { Observable } from 'rxjs';
import { ITheme, PagesObject } from './themes.model';

export abstract class ThemesService {

  public abstract getAvailableThemes(): ITheme[];

  public abstract getActiveTheme(): ITheme;

  public abstract setActiveTheme(theme: ITheme): void;

  public abstract getThemeSetting(): Observable<ITheme>;

  public abstract getAccountSettings(): Observable<PagesObject>;
}
