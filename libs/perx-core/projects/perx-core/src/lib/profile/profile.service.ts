import { Observable } from 'rxjs';
import { IProfile, ICustomProperties, IMessageResponse } from './profile.model';

export abstract class ProfileService {
  public abstract whoAmI(): Observable<IProfile>;

  // @ts-ignore
  public abstract setCustomProperties(data: ICustomProperties): Observable<IMessageResponse>;

  public abstract getCustomProperties(): Observable<ICustomProperties>;
}
