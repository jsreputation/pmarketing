import { Observable, of } from 'rxjs';
import { Role } from '@cl-helpers/role.enum';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { Groups } from '@cl-core/http-adapters/iam-groups';

export class MockSettingsService {
  public getRoles(): Observable<Role[]> {
    return of([  {
      id: 0,
      avatar: null,
      firstName: 'Beck',
      lastName: 'Burke',
      email: 'beckburke@netropic.com',
      gender: 'male',
      invitedDate: '2018-11-24 04:56:56',
      role: 'creator'
    }]);
  }

  public getRolesOptions(): Observable<Role[]> {
    return of([{
      title: 'ROLE_TYPES.ADMIN_TITLE',
      value: 'Administrators',
      id: 1,
      description: 'ROLE_TYPES.ADMIN_DESCRIPTION'
    }]);
  }

  public getAllCredential(data: any): any {
    return of(data);
  }

  public getAllGroups(): Observable<any> {
    return of();
  }
}
