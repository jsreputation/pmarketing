import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import {
  IJsonApiItemPayload,
  IJsonApiPostData,
  IJsonApiListPayload,
  IWIAMUserAttributes, IJsonApiPatchData
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class IamUserHttpService {

  constructor(private http: HttpClient) {
  }

  public getAllIMAUsers(params: HttpParams): Observable<IJsonApiListPayload<IWIAMUserAttributes>> {
    return this.http.get<IJsonApiListPayload<IWIAMUserAttributes>>(ApiConfig.IAMUsersPath, {params});
  }

  public getIMAUser(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWIAMUserAttributes>>(ApiConfig.IAMUsersPath + '/' + id, {params});
  }

  public inviteNewUser(body: IJsonApiPostData<IWIAMUserAttributes>): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWIAMUserAttributes>>(ApiConfig.IAMUsersPath, {data: body});
  }

  public patchUser(
    id: string,
    patchValue: IJsonApiPatchData<IWIAMUserAttributes>
  ): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWIAMUserAttributes>>(`${ApiConfig.IAMUsersPath}/${id}`, {data: patchValue});
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.IAMUsersPath}/${id}`);
  }
}
