import { Observable, throwError } from 'rxjs';
import { IProfile, ICustomProperties } from './profile.model';

export abstract class ProfileService {
  public abstract whoAmI(): Observable<IProfile>;

  // @ts-ignore
  public resetPassword(password: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  // @ts-ignore
  public setCustomProperties(data: ICustomProperties): Observable<void> {
    return throwError('Not implemented yet');
  }

  public getCustomProperties(): Observable<ICustomProperties> {
    return throwError('Not implemented yet');
  }
}
