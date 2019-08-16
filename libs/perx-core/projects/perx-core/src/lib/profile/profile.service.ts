import { Observable } from 'rxjs';
import { IProfile, ICustomProperties } from './profile.model';

export abstract class ProfileService {
  public abstract whoAmI(): Observable<IProfile>;

  // @ts-ignore
  public abstract setCustomProperties(data: ICustomProperties): Observable<void>;

  public abstract getCustomProperties(): Observable<ICustomProperties>;
}
