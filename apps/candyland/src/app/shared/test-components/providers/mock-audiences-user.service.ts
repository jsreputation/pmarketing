import { Observable, of } from 'rxjs';
import {
  IJsonApiItem, IJsonApiItemPayload, IJsonApiListPayload, IWAudiences, IWProfileAttributes
} from '@perxtech/whistler';
import { IAudiencesUserForm } from '@cl-core/models/audiences/user.interface';
import { ITableData } from '@cl-core/models/data-list.interface';
import { AudiencesUserService } from '@cl-core-services';

export class MockAudiencesUserService implements Partial<AudiencesUserService> {
  private getMockData(id?: string): IAudiencesUserForm {
    return {
      id: id ? id : 'string;',
      pi: ' string;',
      firstName: ' string;',
      lastName: ' string;',
      email: ' string;',
      phone: ' string;',
      gender: ' string;',
      birthday: new Date(),
      race: ' string;',
      country: ' string;',
      nationality: ' string;',
      city: ' string;',
      state: ' string;',
      audienceList: ['test'],
      file: ' string;',
    };
  }

  public getUser(id: string): Observable<IAudiencesUserForm> {
    return of(this.getMockData(id));
  }

  public getAllUsers(): Observable<IJsonApiListPayload<IWProfileAttributes>> {
    return of(null);
  }

  public getAllPoolUser(): Observable<IJsonApiItem<IWProfileAttributes>[]> {
    return of(null);
  }

  public getTableData(): Observable<ITableData<IAudiencesUserForm>> {
    return of({
      data: [this.getMockData()],
      meta: {
        page_count: 1,
        record_count: 1
      }
    });
  }

  public createUser(): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return of(null);
  }

  public updateUser(): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return of(null);
  }

  public updateUserPools(): Observable<IJsonApiListPayload<IWProfileAttributes, IWAudiences>> {
    return of(null);
  }
}
