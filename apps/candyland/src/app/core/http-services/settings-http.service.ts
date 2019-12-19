import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWIAMUserAttributes, IWTenantAttributes, IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '@perx/whistler';
import { RoleLabelConfig } from '@cl-shared';
import { IWCognitoEndpointAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient) {
  }

  public getTimeZone(): Observable<ITimeZone[]> {
    return this.http.get<ITimeZone[]>('assets/actives/settings/time-zone.json');
  }

  public getCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>('assets/actives/settings/currency.json');
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

  public inviteNewUser(body: IJsonApiItem<IWIAMUserAttributes>): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWIAMUserAttributes>>(ApiConfig.IAMUsersPath, { data: body });
  }

  public patchUser(
    id: string, patchValue: Partial<IJsonApiItem<IWIAMUserAttributes>>
  ): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWIAMUserAttributes>>(`${ApiConfig.IAMUsersPath}/${id}`, { data: patchValue });
  }

  public deleteUser(id: string): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWIAMUserAttributes>>(`${ApiConfig.IAMUsersPath}/${id}`);
  }

  public getAllGroups(): Observable<any> {
    return this.http.get(ApiConfig.IAMGroupsPath);
  }

  public patchSettings(data: IJsonApiItemPayload<any>): Observable<any> {
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

  public createCognitoEndpoint(data: IJsonApiItemPayload<IWCognitoEndpointAttributes>):
    Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/', data);
  }

  public updateCognitoEndpoint(id: string, data: IJsonApiItemPayload<IWCognitoEndpointAttributes>):
    Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/' + id, data);
  }

  public deleteCognitoEndpoin(id: string): Observable<IJsonApiItemPayload<IWCognitoEndpointAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/' + id);
  }
}
