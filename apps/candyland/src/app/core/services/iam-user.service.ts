import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IJsonApiItemPayload, IJsonApiPatchData,
  IJsonApiPostData,
  IWIAMUserAttributes,
} from '@perx/whistler';
import { map } from 'rxjs/operators';
import { IamUserHttpAdapter } from '@cl-core/http-adapters/iam-user-http-adapter';
import { IamUserHttpService } from '@cl-core/http-services/iam-user-http.service';
import Utils from '@cl-helpers/utils';
import { ITableService } from '@cl-shared';
import { ClHttpParams } from '@cl-helpers/http-params';

@Injectable({
  providedIn: 'root'
})
export class IamUserService implements ITableService {
  constructor(private iamUserHttpService: IamUserHttpService) {}

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAMUser>> {
    params.include = 'groups';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.iamUserHttpService.getAllIMAUsers(httpParams)
      .pipe(
        map(res => IamUserHttpAdapter.transformToTableData(res))
      );
  }

  public getUser(id: string, params: HttpParamsOptions = {}): Observable<IAMUser> {
    params.include = 'groups';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.iamUserHttpService.getIMAUser(id, httpParams)
      .pipe(
        map(res => IamUserHttpAdapter.transformToIAMUser(res.data))
      );
  }

  public getUsers(params: HttpParamsOptions = {}): Observable<IAMUser[]> {
    params.include = 'groups';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.iamUserHttpService.getAllIMAUsers(httpParams)
      .pipe(
        map(res => IamUserHttpAdapter.transformToUsers(res))
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
