import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWIAMUserAttributes, IWTenantAttributes } from '@perx/whistler';
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

  public inviteNewUser(body: IJsonApiPayload<IWIAMUserAttributes>): Observable<IJsonApiPayload<IWIAMUserAttributes>> {
    return this.http.post<IJsonApiPayload<IWIAMUserAttributes>>(ApiConfig.IAMUsersPath, { data: body });
  }

  public patchUser(id: string, patchValue: IJsonApiPayload<IWIAMUserAttributes>): Observable<IJsonApiPayload<IWIAMUserAttributes>> {
    return this.http.patch<IJsonApiPayload<IWIAMUserAttributes>>(`${ApiConfig.IAMUsersPath}/${id}`, { data: patchValue });
  }

  public deleteUser(id: string): Observable<IJsonApiPayload<IWIAMUserAttributes>> {
    return this.http.delete<IJsonApiPayload<IWIAMUserAttributes>>(`${ApiConfig.IAMUsersPath}/${id}`);
  }

  public getAllGroups(): Observable<any> {
    return this.http.get(ApiConfig.IAMGroupsPath);
  }

  public patchSettings(data: IJsonApiPayload<any>): Observable<any> {
    return this.http.patch(`${ApiConfig.tenantsPath}`, { data });
  }

  public getTenants(): Observable<IJsonApiListPayload<IWTenantAttributes>> {
    return this.http.get<IJsonApiListPayload<IWTenantAttributes>>(ApiConfig.tenantsPath);
  }

  public getRoleLabel(): Observable<{ [key: string]: RoleLabelConfig }> {
    return this.http.get<{ [key: string]: RoleLabelConfig }>('assets/actives/role-label/role-label.json');
  }

  public getCognitoEndpoint(id: string, params: HttpParams): Observable<IJsonApiPayload<IWCognitoEndpointAttributes>> {
    return this.http.get<IJsonApiPayload<IWCognitoEndpointAttributes>>(`${ApiConfig.cognitoEndpoints}/${id}`, {params});
  }

  public getCognitoEndpoints(params: HttpParams): Observable<IJsonApiListPayload<IWCognitoEndpointAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints, {params});
  }

  public createCognitoEndpoint(data: IJsonApiPayload<IWCognitoEndpointAttributes>): Observable<IJsonApiPayload<IWCognitoEndpointAttributes>> {
    return this.http.post<IJsonApiPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/', data);
  }

  public updateCognitoEndpoint(id: string, data: IJsonApiPayload<IWCognitoEndpointAttributes>): Observable<IJsonApiPayload<IWCognitoEndpointAttributes>> {
    return this.http.patch<IJsonApiPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/' + id, data);
  }

  public deleteCognitoEndpoin(id: string): Observable<IJsonApiPayload<IWCognitoEndpointAttributes>> {
    return this.http.delete<IJsonApiPayload<IWCognitoEndpointAttributes>>(ApiConfig.cognitoEndpoints + '/' + id);
  }
}
