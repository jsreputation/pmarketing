import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { HttpParams } from '@angular/common/http';
import {
  IWProfileAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiItem,
  IJsonApiPatchData,
  IWAudiences
} from '@perx/whistler';
import { ManageListPopupComponentOutput } from 'src/app/audience/containers/manage-list-popup/manage-list-popup.component';
import { AudiencesHttpsService } from '@perx/whistler-services';

@Injectable({
  providedIn: 'root'
})
export class AudiencesUserService implements ITableService<IAudiencesUserForm> {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUser(id: string): Observable<IAudiencesUserForm> {
    const params: HttpParams = ClHttpParams.createHttpParams({ include: 'pools' });
    return this.http.getUser(id, params).pipe(map((res: any) => AudiencesHttpAdapter.transformUserWithPools(res)));
  }

  public getAllUsers(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWProfileAttributes>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAllUsers(httpParams);
  }

  public getAllPoolUser(poolId: string): Observable<IJsonApiItem<IWProfileAttributes>[]> {
    const httpParams = ClHttpParams.createHttpParams({ include: 'users' });
    return this.http.getAudience(poolId, httpParams)
      .pipe(map(res => res.included));
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudiencesUserForm>> {
    params.include = 'pools';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAllUsers(httpParams)
      .pipe(map((res: IJsonApiListPayload<any>) => AudiencesHttpAdapter.transformUsersWithPools(res)));
  }

  public createUser(user: IAudiencesUserForm): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    const formattedUser = AudiencesHttpAdapter.transformFromUserForm(user);
    if (formattedUser.attributes) {
      formattedUser.attributes.primary_identifier = `${formattedUser.attributes.first_name}identifier`;
    }
    return this.http.createUser(formattedUser);
  }

  public updateUser(id: string, user: IAudiencesUserForm): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    const formattedUser: IJsonApiPatchData<IWProfileAttributes> = {
      ...AudiencesHttpAdapter.transformFromUserForm(user),
      type: 'users',
      id
    };
    return this.http.updateUser(id, formattedUser);
  }

  public updateUserPools(user: ManageListPopupComponentOutput): Observable<IJsonApiListPayload<IWProfileAttributes, IWAudiences>> {
    const formattedData = AudiencesHttpAdapter.transformUpdateUserPools(user);
    return this.http.updateUserPools(formattedData);
  }
}
