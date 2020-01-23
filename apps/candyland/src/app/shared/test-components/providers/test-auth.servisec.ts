import { Observable, of } from 'rxjs';
import { IAMUserMock } from '@cl-shared/test-components/mock-data/iam-user-mock';
import { IJsonApiItemPayload, IWLoginAttributes } from '@perx/whistler';

export class TestAuthServisec {

  public get userId(): string {
    return '1';
  }

  public initAuth(): void {}

  public updateUser(): Observable<IAMUser> {
    return of(IAMUserMock);
  }

  public signIn(data: ILogin): Observable<IJsonApiItemPayload<IWLoginAttributes>> {
    return of({
      data: {
        id: '1',
        type: '1',
        attributes: {
          account_id: data.account_id,
          time_zone: '5555555',
          username: 'admin'
        }
    }});
  }

  public logout(): void {}

  public resetPassword(accountId: string, username: string): Observable<any> {
    return of({
      accountId,
      username
    });
  }

  public changePassword(password: string, token: string): Observable<any> {
    return of({
      password,
      token
    });
  }
}
