import { Observable, of } from 'rxjs';
import {
  IJsonApiItem, IJsonApiItemPayload, IJsonApiListPayload, IWAudiences, IWProfileAttributes
} from '@perx/whistler';
import { ManageListPopupComponentOutput } from '../../../audience/containers/manage-list-popup/manage-list-popup.component';

export class MockAudiencesUserService {
  public getMockData(id?: string): IAudiencesUserForm {
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

  public getAllUsers(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWProfileAttributes>> {
    console.log(params);
    return of(null);
  }

  public getAllPoolUser(poolId: string): Observable<IJsonApiItem<IWProfileAttributes>[]> {
    console.log(poolId);
    return of(null);
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudiencesUserForm>> {
    console.log(params);
    return of({
      data: [this.getMockData()],
      meta: {}
    });
  }

  public createUser(user: IAudiencesUserForm): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    console.log(user);
    return of(null);
  }

  public updateUser(id: string, user: IAudiencesUserForm): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    console.log(user, id);
    return of(null);
  }

  public updateUserPools(user: ManageListPopupComponentOutput): Observable<IJsonApiListPayload<IWProfileAttributes, IWAudiences>> {
    console.log(user);
    return of(null);
  }
}
