import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient) { }

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
    console.log('http params', params);
    return this.http.get(ApiConfig.getAllCredentialPath, params);
  }

  public getAllIMAUsers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.IAMUsersPath, {params});
  }

  public inviteNewUser(body): Observable<any> {
    return this.http.post(ApiConfig.IAMUsersPath, {data: body});
  }

  public patchUser(patchValue, id: string): Observable<any> {
    return this.http.patch(`${ApiConfig.IAMUsersPath}/${id}`, {data: patchValue});
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.IAMUsersPath}/${id}`);
  }

  public getAllGroups(): Observable<any> {
    return this.http.get(ApiConfig.IAMGroupsPath);
  }
}
