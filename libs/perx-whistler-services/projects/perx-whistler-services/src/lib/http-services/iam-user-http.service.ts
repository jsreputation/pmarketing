import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IJsonApiItemPayload,
  IJsonApiPostData,
  IJsonApiListPayload,
  IWIAMUserAttributes, IJsonApiPatchData
} from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class IamUserHttpService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getAllIMAUsers(params: HttpParams): Observable<IJsonApiListPayload<IWIAMUserAttributes>> {
    return this.http.get<IJsonApiListPayload<IWIAMUserAttributes>>(this.apiConfig.IAMUsersPath, { params });
  }

  public getIMAUser(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWIAMUserAttributes>>(`${this.apiConfig.IAMUsersPath}/${id}`, { params });
  }

  public inviteNewUser(body: IJsonApiPostData<IWIAMUserAttributes>): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWIAMUserAttributes>>(this.apiConfig.IAMUsersPath, { data: body });
  }

  public patchUser(
    id: string,
    patchValue: IJsonApiPatchData<IWIAMUserAttributes>
  ): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWIAMUserAttributes>>(`${this.apiConfig.IAMUsersPath}/${id}`, { data: patchValue });
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.IAMUsersPath}/${id}`);
  }
}
