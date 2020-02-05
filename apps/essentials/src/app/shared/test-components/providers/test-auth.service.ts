import { Observable, of } from 'rxjs';
import { IJsonApiItemPayload, IWLoginAttributes } from '@perx/whistler';
import { IAMUser } from '@es-core/models/auth/IAMUser.interface';

export class TestAuthService {

  public get userId(): string {
    return '1';
  }

  public initAuth(): void {}

  public updateUser(): Observable<IAMUser> {
    return of({
      id: '1',
      type: 'users',
      links: 'http://api-dev1.uat.whistler.perxtech.io/users/1',
      urn: 'urn:perx:iam::777777777:user/Admin',
      created_at: '2019-12-10T12:42:37.374Z',
      update_at: '2019-12-10T12:42:37.374Z',
      username: 'Admin',
      api: true,
      console: true,
      time_zone: 'Asia/Singapore',
      properties: {},
      display_properties: {},
      jwt_payload_iss: '11111111',
      jwt_payload_sub: 'urn:perx:iam::777777777:user/Admin',
      attached_policies: { AdministratorAccess: 1 },
      relationships_groups_id: 1, email: 'admin@example.com'
    });
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
