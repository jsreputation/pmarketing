import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { HttpParams } from '@angular/common/http';
import { IWUser, IWPoolsApi } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AudiencesUserService implements ITableService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUser(id: string): Observable<IWUser> {
    const params: HttpParams = ClHttpParams.createHttpParams({ include: 'pools' });
    return this.http.getUser(id, params).pipe(map((res: any) => AudiencesHttpAdapter.transformUserWithPools(res)));
  }

  public getAllUsers(params: HttpParamsOptions): Observable<IJsonApiListPayload<Partial<IWUser>>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAllUsers(httpParams);
  }

  public getAllPoolUser(poolId: string): Observable<IJsonApiItem<Partial<IWUser>>[]> {
    const httpParams = ClHttpParams.createHttpParams({ include: 'users' });
    return this.http.getAudience(poolId, httpParams)
      .pipe(map(res => res.included));
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IWUser>> {
    params.include = 'pools';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAllUsers(httpParams)
      .pipe(map((res: IJsonApiListPayload<any>) => AudiencesHttpAdapter.transformUsersWithPools(res)));
  }

  public createUser(user: IAudiencesUserForm): Observable<IJsonApiPayload<Partial<IWUser>>> {
    const formattedUser = AudiencesHttpAdapter.transformFromUserForm(user);
    return this.http.createUser(formattedUser);
  }

  public updateUser(id: string, user: IAudiencesUserForm): Observable<IJsonApiPayload<Partial<IWUser>>> {
    const formattedUser = AudiencesHttpAdapter.transformFromUserForm(user);
    formattedUser['id'] = id;
    return this.http.updateUser(id, formattedUser);
  }

  public updateUserPools(user: IWUser): Observable<IJsonApiListPayload<IWPoolsApi>> {
    const formattedData = AudiencesHttpAdapter.transformUpdateUserPools(user);
    return this.http.updateUserPools(formattedData);
  }
}
