import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IWIAMUserAttributes,
  IWTenantAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem,
  IJsonApiPatchData
} from '@perx/whistler';
import { IWCognitoEndpointAttributes } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) {
  }

  public getAllCredential(params: any): Observable<any> {
    return this.http.get(this.apiConfig.allCredentialPath, params);
  }

  public getAllIMAUsers(params: HttpParams): Observable<IJsonApiListPayload<IWIAMUserAttributes>> {
    return this.http.get<IJsonApiListPayload<IWIAMUserAttributes>>(this.apiConfig.IAMUsersPath, { params });
  }

  public getAllGroups(): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(this.apiConfig.IAMGroupsPath);
  }

  public patchSettings(data: IJsonApiPatchData<any>): Observable<any> {
    return this.http.patch(`${this.apiConfig.tenantsPath}`, { data });
  }

  public getTenants(): Observable<IJsonApiListPayload<IWTenantAttributes>> {
    return this.http.get<IJsonApiListPayload<IWTenantAttributes>>(this.apiConfig.tenantsPath);
  }

  public getCognitoEndpoint(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(`${this.apiConfig.cognitoEndpoints}/${id}`, { params });
  }

  public getCognitoEndpoints(params: HttpParams): Observable<IJsonApiListPayload<IWCognitoEndpointAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCognitoEndpointAttributes>>(this.apiConfig.cognitoEndpoints, { params });
  }

  public createCognitoEndpoint(data: IJsonApiPostItem<IWCognitoEndpointAttributes>):
    Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(this.apiConfig.cognitoEndpoints + '/', data);
  }

  public updateCognitoEndpoint(id: string, data: IJsonApiPatchItem<IWCognitoEndpointAttributes>):
    Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(this.apiConfig.cognitoEndpoints + '/' + id, data);
  }

  public deleteCognitoEndpoin(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.cognitoEndpoints + '/' + id);
  }
}
