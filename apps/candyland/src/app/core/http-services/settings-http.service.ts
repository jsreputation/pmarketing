import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import {
  IWIAMUserAttributes,
  IWTenantAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem,
  IJsonApiPatchData
} from '@perx/whistler';
import { RoleLabelConfig } from '@cl-shared';
import { IWCognitoEndpointAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient) {
  }

  public getRoles(): Observable<any> {
    return this.http.get('assets/actives/settings/roles.json');
  }

  public getRolesOptions(): Observable<any> {
    return this.http.get<OptionConfig[]>('assets/actives/settings/roles-options.json');
  }

  public getAllCredential(params: any): Observable<any> {
    return this.http.get(ApiConfig.allCredentialPath, params);
  }

  public getAllIMAUsers(params: HttpParams): Observable<IJsonApiListPayload<IWIAMUserAttributes>> {
    return this.http.get<IJsonApiListPayload<IWIAMUserAttributes>>(ApiConfig.IAMUsersPath, { params });
  }

  public getAllGroups(params?: HttpParams ): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.IAMGroupsPath, { params });
  }

  public patchSettings(data: IJsonApiPatchData<any>): Observable<any> {
    return this.http.patch(`${ApiConfig.tenantsPath}`, { data });
  }

  public getTenants(): Observable<IJsonApiListPayload<IWTenantAttributes>> {
    return this.http.get<IJsonApiListPayload<IWTenantAttributes>>(ApiConfig.tenantsPath);
  }

  public getRoleLabel(): Observable<{ [key: string]: RoleLabelConfig }> {
    return this.http.get<{ [key: string]: RoleLabelConfig }>('assets/actives/role-label/role-label.json');
  }

  public getCognitoEndpoint(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(`${ApiConfig.cognitoEndpoints}/${id}`, { params });
  }

  public getCognitoEndpoints(params: HttpParams): Observable<IJsonApiListPayload<IWCognitoEndpointAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints, { params });
  }

  public createCognitoEndpoint(data: IJsonApiPostItem<IWCognitoEndpointAttributes>):
    Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/', data);
  }

  public updateCognitoEndpoint(id: string, data: IJsonApiPatchItem<IWCognitoEndpointAttributes>):
    Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/' + id, data);
  }

  public deleteCognitoEndpoin(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.cognitoEndpoints + '/' + id);
  }
}
