import { Injectable } from '@angular/core';
import Utils from '@es-helpers/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWIAMUserAttributes, IJsonApiItemPayload, IJsonApiPatchData, IJsonApiPostData } from '@perx/whistler';
import { IAMUser } from '../models/auth/IAMUser.interface';
import { IamUserHttpAdapter } from '../http-adapters/iam-user-http-adapter';
import { HttpParamsParser } from '@es-helpers/http-params-parser';
import { ITableService } from '../models/table-service-interface';
import { IamUserHttpService } from '../http-services/iam-user-http.service';

@Injectable({
  providedIn: 'root'
})
export class IamUserService implements ITableService {

  constructor(
    private iamUserHttpService: IamUserHttpService
  ) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAMUser>> {
    params.include = 'groups';
    const httpParams = HttpParamsParser.createHttpParams(params);
    return this.iamUserHttpService.getAllIMAUsers(httpParams)
      .pipe(
        map(res => IamUserHttpAdapter.transformToTableData(res))
      );
  }

  public getUsers(params: HttpParamsOptions = {}): Observable<IAMUser[]> {
    params.include = 'groups';
    const httpParams = HttpParamsParser.createHttpParams(params);
    return this.iamUserHttpService.getAllIMAUsers(httpParams)
      .pipe(
        map(res => IamUserHttpAdapter.transformToUsers(res))
      );
  }

  public getUser(id: string, params: HttpParamsOptions = {}): Observable<IAMUser> {
    params.include = 'groups';
    const httpParams = HttpParamsParser.createHttpParams(params);
    return this.iamUserHttpService.getIMAUser(id, httpParams)
      .pipe(
        map(res => IamUserHttpAdapter.transformToIAMUser(res.data))
      );
  }

  public inviteNewUser(newUser: IAMUser): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    const formattedNewUser: IJsonApiPostData<IWIAMUserAttributes> = IamUserHttpAdapter.transformInviteUser(newUser);
    return this.iamUserHttpService.inviteNewUser(formattedNewUser);
  }

  public patchUser(currentUser: IAMUser, updatedUser: IAMUser): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    const id = currentUser.id;
    const userChanges = Utils.nestedObjectAssign(currentUser, updatedUser);
    const formattedUserChanges: IJsonApiPatchData<IWIAMUserAttributes> = {
      ...IamUserHttpAdapter.transformInviteUser(userChanges),
      id
    };
    return this.iamUserHttpService.patchUser(id, formattedUserChanges);
  }

  public deleteUser(id: string): Observable<void> {
    return this.iamUserHttpService.deleteUser(id);
  }
}
