import { Injectable } from '@angular/core';
import { AudiencesHttpAdapter } from '@cl-core/http-adapters/audiences-http-adapter';
import { AudiencesHttpsService } from '@cl-core/http-services/audiences-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { ClHttpParams } from '@cl-helpers/http-params';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudiencesUserService implements ITableService {
  constructor(private http: AudiencesHttpsService) {
  }

  public getUser(id: string): Observable<IUser> {
    const params: HttpParams = ClHttpParams.createHttpParams({ include: 'pools' });
    return this.http.getUser(id, params).pipe(map((res: any) => AudiencesHttpAdapter.transformUserWithPools(res)));
  }

  public getAllUsers(params: HttpParamsOptions): any {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAllUsers(httpParams);
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IUser>> {
    params.include = 'pools';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.http.getAllUsers(httpParams)
      .pipe(map((res: IJsonApiListPayload<any>) => AudiencesHttpAdapter.transformUsersWithPools(res)));
  }

  public createUser(user: IAudiencesUserForm): Observable<IJsonApiPayload<IUserApi>> {
    const formattedUser = AudiencesHttpAdapter.transformFromUserForm(user);
    console.log(formattedUser);
    return this.http.createUser(formattedUser);
  }

  public updateUser(id: string, user: IAudiencesUserForm): Observable<IJsonApiPayload<IUserApi>> {
    const formattedUser = AudiencesHttpAdapter.transformFromUserForm(user);
    formattedUser['id'] = id;
    return this.http.updateUser(id, formattedUser);
  }

  public updateUserPools(user: IUser): Observable<IJsonApiListPayload<IPoolsApi>> {
    const formattedData = AudiencesHttpAdapter.transformUpdateUserPools(user);
    return this.http.updateUserPools(formattedData);
  }
}
